import React from "react";
import { SignUpScreen } from "@/screens/auth";
import { Wrapper } from "@/components";

const SignUp: React.FC = () => {
  return (
    <Wrapper isFullscreen>
      <SignUpScreen />
    </Wrapper>
  );
};

export default SignUp;
