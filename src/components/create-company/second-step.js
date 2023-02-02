import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Input from "../../components/input";
import Logo from "../../components/logo";
// import { MyRouter } from "../../routes";

export default function SecondStep({
  pressSubmit,
  clearSubmitPage,
  onSubmitSuccess,
}) {
  const schema = new yup.ObjectSchema({
    name2: yup
      .string()
      .required("Name2 is required ")
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

  const [cookies, setCookie] = useCookies(["name"]);
  const creatingCompany = useSelector((state) => state.company.creatingCompany);
  const dispatch = useDispatch();

  useEffect(() => {
    if (creatingCompany?.name2) {
      setValue("name2", creatingCompany.name2);
    }
  }, []);

  useEffect(() => {
    if (pressSubmit) {
      handleSubmit(onSubmit)();
      clearSubmitPage();
    }
  }, [pressSubmit]);

  const onSubmit = ({ name2 }) => {
    // dispatch(companyActions.setCreatingCompany({ ...creatingCompany, name2 }));
    setCookie("subdomain", "subdomain", { path: "altogic.com" });
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
              <h1 className="text-3xl font-semibold text-slate-800">
                SecondStep
              </h1>
              <p className="text-slate-600 mt-3 text-base tracking-sm">
                HR App.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Input
                    id="name2"
                    name="name2"
                    label="Name2 *"
                    register={register("name2")}
                    error={errors.name2}
                    placeholder="Enter your name2"
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
