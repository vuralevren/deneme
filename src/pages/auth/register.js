import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoginIcon from "../../assets/login.png";
import Button from "../../components/button";
import Input from "../../components/input";
import Logo from "../../components/logo";
import useQuery from "../../helpers/hooks/useQuery";
import { authActions } from "../../redux/auth/authSlice";
import { MyRouter } from "../../router";
// import { MyRouter } from "../../routes";

export default function Register() {
  const schema = new yup.ObjectSchema({
    name: yup
      .string()
      .required("Name is required ")
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(40, "Name must be at most 40 characters"),
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

  useEffect(() => {
    if (emailQuery) setValue("email", emailQuery);
  }, [emailQuery]);

  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch(
      authActions.registerRequest({
        userReq: data,
        emailQuery,
        pixelIdQuery,
        onSuccess: (pixelSlug) => {
          // if (pixelSlug) {
          //   navigate(MyRouter.pixel(pixelSlug));
          // } else {
          //   navigate(MyRouter.HOME);
          // }
          navigate(MyRouter.emailVerification(data.email));
          setIsLoading(false);
        },
        onFailure: (errorList) => {
          _.forEach(errorList.items, (err) => {
            switch (err?.details?.field) {
              case "name":
                setError("name", {
                  type: "manuel",
                  message: err?.message,
                });
                break;
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
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="absolute top-8 left-8 w-[123px] h-[42px] mb-20 md:mb-44">
            <Logo primary />
          </div>
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800">Sign Up</h1>
              <p className="text-slate-600 mt-3 text-base tracking-sm">
                HR App.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Input
                    id="name"
                    name="name"
                    label="Name *"
                    register={register("name")}
                    error={errors.name}
                    placeholder="Enter your name"
                  />

                  <Input
                    id="email"
                    name="email"
                    label="Email *"
                    placeholder="Enter your email"
                    register={register("email")}
                    error={errors.email}
                    type="text"
                    // disabled={!!invitation?.email && isInvited}
                  />

                  <div className="space-y-1">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      label="Password *"
                      register={register("password")}
                      error={errors.password}
                    />
                    <span className="inline-block text-slate-500 mt-2 text-sm tracking-sm">
                      Must be at least 8 characters.
                    </span>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      loading={isLoading}
                      text="Get started"
                      variant="indigo"
                      fullWidth
                    />
                  </div>
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
                <p className="text-center text-sm text-slate-500 mt-8">
                  Don’t have an account?{" "}
                  <Link
                    className="font-medium text-indigo-700 tracking-sm hover:text-indigo-500"
                    to={MyRouter.LOGIN}
                  >
                    Login
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
  );
}
