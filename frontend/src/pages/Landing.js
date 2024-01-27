import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Echo</h1>
      <button onClick={() => loginWithRedirect()}>Enter</button>
    </div>
  );
};

export default Landing;
