import welcomeImage from "../images/welcomeImage.svg";

function WelcomeMessage() {
  return (
    <div
      style={{
        background: "#5f6ac4",
        padding: "20px 30px 30px",
        flex: 1,
        margin: 10,
        borderRadius: 8,
        color: "white",
        maxWidth: "450px",
      }}
    >
      <h3 style={{ marginBottom: 20, fontWeight: 600, fontSize: 22 }}>Welcome! 🙂</h3>
      <p>
        We're pleased that you've chosen to explore online therapy services for support
        and guidance in enhancing your mental health and overall well-being. Our platform
        is committed to offering a secure and confidential environment where you can
        freely express your thoughts, emotions, and experiences.
      </p>
      <br />
      <p>Lest embark on a journey towards healing and growth.</p>
      <img src={welcomeImage} style={{ width: 400, margin: "auto" }} alt="" />
    </div>
  );
}

export default WelcomeMessage;
