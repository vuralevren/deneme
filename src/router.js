import {
  useLocation,
  Navigate,
  createBrowserRouter,
  useLoaderData,
} from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "./configs/altogic";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Register from "./pages/auth/register";
import AuthRedirect from "./pages/auth/auth-redirect";
import ForgotPassword from "./pages/auth/forgot-password";
import { useSelector } from "react-redux";
import Login from "./pages/auth/login";
import ForgotPasswordEmail from "./pages/auth/forgot-password-email";
import ResetPassword from "./pages/auth/reset-password";
import EmailVerification from "./pages/auth/email-verification";
import ResetPasswordSuccessfull from "./pages/auth/reset-password-successful";
import SelectCompany from "./pages/select-company";
import CreateNewCompany from "./pages/create-new-company";

export const MyRouter = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD_SUCCESSFUL: "/reset-password-successful",
  CREATE_COMPANY: "/create-company",
  forgotPasswordEmail: (email) => `/forgot-password-email/${email}`,
  resetPassword: (accessToken) => `/reset-password/${accessToken}`,
  emailVerification: (email) => `/email-verification/${email}`,
};

export default createBrowserRouter([
  {
    path: "/",
    loader: async () => auth.getUserFromDB(),
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/select-company",
    // loader: async () => auth.getUserFromDB(),
    element: (
      <RequireAuth>
        <SelectCompany />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: MyRouter.CREATE_COMPANY,
    // loader: async () => auth.getUserFromDB(),
    element: (
      <RequireAuth>
        <CreateNewCompany />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  // GUEST
  {
    path: MyRouter.LOGIN,
    element: (
      <GuestOnly>
        <Login />
      </GuestOnly>
    ),
  },
  {
    path: MyRouter.REGISTER,
    element: (
      <GuestOnly>
        <Register />
      </GuestOnly>
    ),
  },
  {
    path: MyRouter.FORGOT_PASSWORD,
    element: (
      <GuestOnly>
        <ForgotPassword />
      </GuestOnly>
    ),
  },
  {
    path: "/forgot-password-email/:email",
    element: (
      <GuestOnly>
        <ForgotPasswordEmail />
      </GuestOnly>
    ),
  },
  {
    path: "/reset-password/:access_token",
    element: (
      <GuestOnly>
        <ResetPassword />
      </GuestOnly>
    ),
  },
  {
    path: MyRouter.RESET_PASSWORD_SUCCESSFUL,
    element: (
      <GuestOnly>
        <ResetPasswordSuccessfull />
      </GuestOnly>
    ),
  },
  {
    path: "/email-verification/:email",
    element: (
      <GuestOnly>
        <EmailVerification />
      </GuestOnly>
    ),
  },
  {
    path: "/auth-redirect",
    element: <AuthRedirect />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function RequireAuth({ children }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to={MyRouter.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}

function GuestOnly({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to={MyRouter.HOME} />;
  }

  return children;
}
