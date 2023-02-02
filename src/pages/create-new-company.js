import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wizard from "../components/wizard";
import { companyActions } from "../redux/company/companySlice";

export default function CreateNewCompany() {
  const creatingPageIndex = useSelector(
    (state) => state.company.creatingPageIndex
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(companyActions.setCreatingPageIndex(1));
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="md:h-[92px] bg-slate-50 px-4 py-8 mb-8 md:mb-0">
        <div className="flex items-center justify-between max-w-screen-lg mx-auto">
          <h1 className="text-slate-700 text-xl font-semibold">
            Create New Company
          </h1>
          <p className="text-slate-700 text-base tracking-sm">
            Step {creatingPageIndex + 1}/4
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:h-[calc(100%-92px)] max-w-3xl mx-auto px-4 md:p-0">
        <Wizard />
      </div>
    </div>
  );
}
