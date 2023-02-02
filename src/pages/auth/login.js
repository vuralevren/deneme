import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Logo from "../../components/logo";
import Button from "../../components/button";
import Input from "../../components/input";
import { authActions } from "../../redux/auth/authSlice";
import useQuery from "../../helpers/hooks/useQuery";
import LoginIcon from "../../assets/login.png";
import { MyRouter } from "../../router";
import { useCookies } from "react-cookie";

export default function Login() {
  const schema = new yup.ObjectSchema({
    email: yup
      .string()
      .email("Email must be valid.")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Password is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const emailQuery = useQuery("email");
  const pixelIdQuery = useQuery("pixelId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    console.log(process.env.REACT_APP_PUBLIC_DOMAIN);
    setCookie("subdomain2", "subdomain2", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      domain: "deneme-rho-silk.vercel.app",
    });
    setCookie("deneme", "deneme");
  }, []);

  const onSubmit = ({ email, password }) => {
    setIsLoading(true);
    dispatch(
      authActions.signInRequest({
        email,
        password,
        emailQuery,
        pixelIdQuery,
        onSuccess: (pixelSlug) => {
          // if (pixelSlug) {
          //   navigate(MyRouter.pixel(pixelSlug));
          // } else {
          //   navigate("/");
          // }
          setIsLoading(false);
        },
        onFailure: (errorList) => {
          _.forEach(errorList.items, (err) => {
            switch (err?.details?.field) {
              case "email":
                setError("email", {
                  type: "manuel",
                  message: err?.message,
                });
                break;
              case "password":
                setError("password", {
                  type: "manuel",
                  message: err?.message,
                });
                break;

              default:
                setError("email", {
                  type: "manuel",
                  message: err?.message,
                });
                break;
            }
          });
          setIsLoading(false);
        },
      })
    );
  };

  return (
    <div>
      <div className="relative h-screen">
        <div className="grid xl:grid-cols-2 h-full">
          <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-lg lg:w-[360px]">
              <div className="flex flex-col items-center">
                <Logo primary />
                <h2 className="text-3xl font-semibold text-slate-800">
                  Welcome Back!
                </h2>
                <p className="text-slate-600 mt-3 text-base tracking-sm">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Input
                      label="Email"
                      type="text"
                      id="email"
                      name="email"
                      error={errors.email}
                      register={register("email")}
                      placeholder="johndoe@example.com"
                    />

                    <Input
                      label="Password"
                      type="password"
                      id="password"
                      name="password"
                      error={errors.password}
                      register={register("password")}
                      placeholder="Enter your password"
                    />

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link
                          className="text-indigo-700 text-sm font-medium tracking-sm hover:text-indigo-500"
                          to={MyRouter.FORGOT_PASSWORD}
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      loading={isLoading}
                      text="Sign in"
                      variant="indigo"
                      fullWidth
                    />
                    <div className="mt-6 relative">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-500">
                          Or continue with
                        </span>
                      </div>
                    </div>
                  </form>
                  <p className="text-center mt-8 text-sm text-slate-500">
                    Don’t have an account?{" "}
                    <Link
                      className="text-indigo-700 text-sm font-medium tracking-sm hover:text-indigo-500"
                      to={MyRouter.REGISTER}
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:block relative">
            <img
              className="absolute inset-0 h-full w-full object-cover rounded-l-[40px]"
              src={LoginIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
