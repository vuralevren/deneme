import CompanyButton from "../components/company-button";

const companies = [
  {
    _id: "1",
    name: "evren",
    logoUrl: "/",
    role: "Owner",
  },
];

export default function SelectCompany() {
  return (
    <div>
      {companies.length > 0 && (
        <div className="my-10 md:my-0">
          <div className="flex flex-col items-center justify-center gap-8 lg:gap-20 md:h-screen">
            <h1 className="text-slate-900 text-xl md:text-3xl font-semibold tracking-md">
              Select your Company
            </h1>
            <div className="max-w-sm sm:max-w-lg lg:max-w-xl">
              <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 md:gap-16 lg:gap-24">
                {companies.map((company) => (
                  <CompanyButton key={company._id} company={company} />
                ))}
                <CompanyButton label="Create company" isCreateCompany />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
