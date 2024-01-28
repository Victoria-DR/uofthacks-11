import { useAuth0 } from "@auth0/auth0-react";
import "../assets/styles/Landing.css";
import Logo from "../assets/images/logo.svg";
import Enter from "../assets/images/TablerArrowNarrowRight.svg";

const Landing = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="landing">
      <div className="landing-text">
        <img className="landing-logo" src={Logo} alt="echo logo" />
        <p className="landing-copy">Take a stroll down memory lane with Echo, your digital Rolodex of nostalgia. Echo transforms your memories into a 3D network.</p>
      </div>
      <div className="landing-radial-gradient">
        <img className="landing-button" onClick={() => loginWithRedirect()} src={Enter} alt="enter echo" />
      </div>
    </div>
  );
};

export default Landing;
