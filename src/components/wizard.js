import { ChevronLeft, ChevronRight } from "../assets/icons";
import cn from "classnames";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./button";
import FirstStep from "./create-company/first-step";
import SecondStep from "./create-company/second-step";
import { companyActions } from "../redux/company/companySlice";

export default function Wizard() {
  const [pageSubmit, setPageSubmit] = useState([false, false, false, false]);
  const clearSubmitPage = () => setPageSubmit([false, false, false, false]);

  const dispatch = useDispatch();
  const creatingPageIndex = useSelector(
    (state) => state.company.creatingPageIndex
  );

  const submitCompany = () => {};

  const submit = () => {
    const submits = _.cloneDeep(pageSubmit);
    submits[creatingPageIndex] = true;
    setPageSubmit(submits);
  };

  const nextPage = () => {
    dispatch(companyActions.setCreatingPageIndex(creatingPageIndex + 1));
  };

  const prevPage = () => {
    dispatch(companyActions.setCreatingPageIndex(creatingPageIndex - 1));
  };
  const handleCancel = () => {
    // if (companies.length > 0) {
    //   Router.push("/select-company");
    // } else {
    //   Router.back();
    // }
  };

  return (
    <div className="w-full bg-slate-100 px-4 py-10 md:p-[72px] rounded-2xl">
      <div>
        {/* {activePageIndex <= 3 ? <currentPage /> : <lastPage />} */}
        {creatingPageIndex === 1 && (
          <FirstStep
            onSubmitSuccess={nextPage}
            pressSubmit={pageSubmit[creatingPageIndex]}
            clearSubmitPage={clearSubmitPage}
          />
        )}
        {creatingPageIndex === 2 && (
          <SecondStep
            onSubmitSuccess={nextPage}
            pressSubmit={pageSubmit[creatingPageIndex]}
            clearSubmitPage={clearSubmitPage}
          />
        )}
        {creatingPageIndex >= 0 ? (
          <Button
            type="button"
            // loading={loading}
            className={cn(
              `flex items-center justify-center w-full bg-indigo-700 text-white px-4 py-3 my-6 text-base font-medium tracking-sm border border-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2`
            )}
            onClick={submit}
            text={creatingPageIndex >= 2 ? `Submit` : `Continue`}
          />
        ) : null}
      </div>
      <div
        className={cn(
          `flex items-center w-full`,
          creatingPageIndex > 0 ? "justify-between" : "justify-center"
        )}
      >
        {/* {activePageIndex === 0 && companies?.length ? ( */}
        {/* {creatingPageIndex === 0 ? (
          <button
            type="button"
            className="inline-flex items-center text-slate-500"
            onClick={handleCancel}
          >
            <ChevronLeft className="w-6 h-6" />
            Cancel
          </button>
        ) : null} */}
        {creatingPageIndex > 1 ? (
          <button
            type="button"
            className="inline-flex items-center text-slate-500"
            onClick={prevPage}
            // disabled={_.isNil(companyWillBeCreated)}
          >
            <ChevronLeft className="w-6 h-6" />
            Back
          </button>
        ) : null}
        {/* {creatingPageIndex > 0 && creatingPageIndex < 3 ? (
          <button
            type="button"
            className="inline-flex items-center text-slate-500"
            onClick={submitCompany}
          >
            Skip now
            <ChevronRight className="w-6 h-6" />
          </button>
        ) : null} */}
      </div>
    </div>
  );
}
