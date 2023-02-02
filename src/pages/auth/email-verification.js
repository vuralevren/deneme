import _ from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoginIcon from "../../assets/login.png";
import useQuery from "../../helpers/hooks/useQuery";
import { authActions } from "../../redux/auth/authSlice";
import { MyRouter } from "../../router";

export default function EmailVerification() {
  const { email } = useParams();
  const operation = useQuery("operation");

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const resendVerificationEmail = () => {
    setIsLoading(true);
    dispatch(
      authActions.resendVerificationEmailRequest({
        email,
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Email sent successfully.");
        },
        onFailure: (errorList) => {
          toast.error(_.get(errorList, "items[0].message"));
          setIsLoading(false);
        },
      })
    );
  };

  return (
    <div className="relative h-screen">
      <a
        href="https://www.altogic.com/"
        className="flex fixed bottom-3 right-3 sm:bottom-8 sm:right-8 z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./powered-by-altogic.svg" alt="" />
      </a>
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 mb-6 ring-8 ring-indigo-50">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-indigo-600"
                >
                  <path
                    d="M16.142 4.667H7.934c-1.96 0-2.94 0-3.689.381a3.5 3.5 0 0 0-1.53 1.53c-.381.748-.381 1.729-.381 3.689v7.466c0 1.96 0 2.94.381 3.69a3.5 3.5 0 0 0 1.53 1.529c.749.381 1.729.381 3.689.381h12.133c1.96 0 2.94 0 3.69-.381a3.499 3.499 0 0 0 1.529-1.53c.381-.748.381-1.728.381-3.689v-6.066m-23.333-3.5 9.526 6.668c.771.54 1.157.81 1.576.914.37.093.758.093 1.129 0 .42-.104.805-.374 1.577-.914l3.925-3.168"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.334 8.167a1 1 0 1 0 2 0h-2Zm2-7a1 1 0 1 0-2 0h2Zm-4.5 2.5a1 1 0 1 0 0 2v-2Zm7 2a1 1 0 1 0 0-2v2Zm-2.5 2.5v-7h-2v7h2Zm-4.5-2.5h7v-2h-7v2Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <h1 className="text-slate-800 mb-3 text-3xl font-semibold">
                Check your email
              </h1>
              <p className="text-slate-500 mb-6 text-base tracking-sm">
                We sent a verification link to <br />{" "}
                <span className="text-slate-700">{email}</span>
              </p>
              {operation !== "change" && (
                <p className="text-slate-500 mb-8 text-center text-sm tracking-sm">
                  Didn’t receive the email?{" "}
                  <button
                    onClick={resendVerificationEmail}
                    type="button"
                    className="font-medium text-indigo-700 tracking-sm hover:text-indigo-500"
                    disabled={isLoading}
                  >
                    Click to resend
                  </button>
                </p>
              )}
              <div className="text-center mt-8">
                <Link
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-sm text-slate-500"
                  to={operation !== "change" ? MyRouter.LOGIN : MyRouter.HOME}
                >
                  <svg
                    className="w-5 h-5 text-slate-500"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.3332 10H4.6665M4.6665 10L10.4998 15.8333M4.6665 10L10.4998 4.16667"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back to {operation !== "change" ? "login" : "home"}
                </Link>
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
