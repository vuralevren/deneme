import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoginIcon from "../../assets/login.png";
import Button from "../../components/button";
import Input from "../../components/input";
import Logo from "../../components/logo";
import useQuery from "../../helpers/hooks/useQuery";
import { authActions } from "../../redux/auth/authSlice";
import { companyActions } from "../../redux/company/companySlice";
import { MyRouter } from "../../router";
// import { MyRouter } from "../../routes";

export default function FirstStep({
  onSubmitSuccess,
  pressSubmit,
  clearSubmitPage,
}) {
  const schema = new yup.ObjectSchema({
    name: yup
      .string()
      .required("Name is required ")
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(40, "Name must be at most 40 characters"),
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

  const creatingCompany = useSelector((state) => state.company.creatingCompany);
  const dispatch = useDispatch();

  useEffect(() => {
    if (creatingCompany?.name) {
      setValue("name", creatingCompany.name);
    }
  }, []);

  useEffect(() => {
    if (pressSubmit) {
      handleSubmit(onSubmit)();
      clearSubmitPage();
    }
  }, [pressSubmit]);

  const onSubmit = ({ name }) => {
    dispatch(companyActions.setCreatingCompany({ ...creatingCompany, name }));
    onSubmitSuccess();
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
                    label="Domain Name *"
                    register={register("name")}
                    error={errors.name}
                    placeholder="Enter your name"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
