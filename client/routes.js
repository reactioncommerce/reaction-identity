import ForgotPassword from "./components/ForgotPassword.js";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";

export default [
  {
    path: "/account/login",
    mainComponent: SignIn
  },
  {
    path: "/account/enroll",
    mainComponent: SignUp
  },
  {
    path: "/account/reset-password",
    mainComponent: ForgotPassword
  }
];
