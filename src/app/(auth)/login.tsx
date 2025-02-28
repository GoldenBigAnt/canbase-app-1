import React from "react";
import { LoginScreen } from "@/screens/auth";
import { Wrapper } from "@/components";

const Login: React.FC = () => {
  return (
    <Wrapper 
    // isFullscreen
    >
      <LoginScreen />
    </Wrapper>
  );
};

export default Login;
