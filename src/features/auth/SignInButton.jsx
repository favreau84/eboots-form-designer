import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { signIn, signOut } from "./authSlice";
import { selectCurrentEmail } from "./authSlice";
//import authService from "./services/auth-service";

const SignInButton = () => {
  const currentEmail = useSelector(selectCurrentEmail);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(currentEmail ? signOut() : signIn());
  };

  const buttonText = currentEmail ? "Sign out" : "Sign in";

  return (
    <Button onClick={onClickHandler}>
      <span>{buttonText}</span>
    </Button>
  );
};

export default SignInButton;
