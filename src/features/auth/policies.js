// Enter here the user flows and custom policies for your B2C application
// To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
// To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_signup_and_signin",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://eboots.b2clogin.com/eboots.onmicrosoft.com/B2C_1_signup_and_signin",
    },
  },
};
