import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthContainer from "./views/auth/User/AuthContainer";
import ProtectedRoute from "./views/auth/ProtectedRoutes/ProtectedRoute";
import MyPreferences from "./views/main/User/MyPreferences";
import UserInfo from "./views/main/User/UserInfo";
import Profile from "./views/main/User/Profile";
// import Preferences from "./views/main/User/MyPreferences";
import TherapistProfilePage from "./views/main/Therapist/pages/TherapistProfilePage";
import MyDashboard from "./views/main/User/MyDashboard";
import MySessions from "./views/main/User/MySessions";
import MyTherapists from "./views/main/User/MyTherapists";
import MySettings from "./views/main/User/MySettings";
import Login from "./views/auth/User/SignIn";
import SignUp from "./views/auth/User/SignUp";
import ForgotPassword from "./views/auth/User/ForgotPassword";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { useStoreUser } from "./Zustand";

function App() {
  const { userInfo, setUserInfo, userLogin, setUserLogin } = useStoreUser();
  console.log("userInfo :>> ", userInfo);
  console.log("userLogin :>> ", userLogin);
  const colRef = collection(db, "users");
  // get collection data
  getDocs(colRef)
    .then((snapshot) => {
      let users: any = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log(users);
    })
    .catch((err) => {
      console.log(err.message);
    });

  // Fetch current user data
  async function fetchData(uid: string | any) {
    const docRef = doc(db, "users", uid);
    const usersData = await getDoc(docRef);

    usersData.exists() ? setUserInfo(usersData.data()) : console.log("No such document!");
  }

  // set logged in user and fethced user data
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        setUserLogin(user);
        fetchData(user.uid);
      } else {
        // User is signed out
        setUserLogin(null);
        fetchData(null);
      }
    });
  }, []);
  return (
    <Routes>
      <Route path="/auth" element={<AuthContainer />}>
        <Route path="login" element={<Login />} />
        {/* <Route path="login-phone" element={<LoginWithPhone />} /> */}
        <Route path="register" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<ProtectedRoute user={userLogin} />}>
        <Route path="/user-preferences" element={<MyPreferences />} />
        <Route path="user-info" element={<UserInfo />} />
        <Route path="/" element={<Profile />}>
          <Route index element={<MyDashboard />} />
          <Route path="preferences" element={<MyPreferences />} />
          <Route path="sessions" element={<MySessions />} />
          <Route path="therapist-list" element={<MyTherapists />} />
          <Route path="therapist/:id" element={<TherapistProfilePage />} />
          <Route path="settings" element={<MySettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
