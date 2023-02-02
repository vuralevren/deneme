import { Link } from "react-router-dom";
import { Ok } from "../../assets/icons";
import LoginIcon from "../../assets/login.png";
import { MyRouter } from "../../router";

export default function ResetPasswordSuccessfull() {
  return (
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 mb-6 ring-8 ring-indigo-50">
                <Ok className="w-7 h-7 text-indigo-600" />
              </span>
              <h1 className="text-slate-800 mb-3 text-3xl font-semibold">
                Password Reset
              </h1>
              <p className="text-slate-500 mb-11 text-base tracking-sm">
                Your password has been reset successfully.
              </p>
              <Link
                className="w-full flex items-center justify-center text-white py-2.5 px-7 text-sm font-medium tracking-sm border border-transparent rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                to={MyRouter.LOGIN}
              >
                Continue to login
              </Link>
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
