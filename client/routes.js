import ChangePassword from "./components/ChangePassword.js";
import ForgotPassword from "./components/ForgotPassword.js";
import ResetPassword from "./components/ResetPassword.js";
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
    path: "/account/forgot-password",
    mainComponent: ForgotPassword
  },
  {
    path: "/account/reset-password/:token",
    mainComponent: ResetPassword
  },
  {
    path: "/account/change-password",
    mainComponent: ChangePassword
  }
];
