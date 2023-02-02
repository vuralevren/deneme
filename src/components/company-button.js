import { Plus } from "../assets/icons";
import { Link } from "react-router-dom";
import CompanyAvatar from "./company-avatar";
import { MyRouter } from "../router";

export default function CompanyButton({ icon, company, label, ...props }) {
  return (
    <Link
      className="group inline-flex flex-col items-center justify-center w-[88px] transform transition ease-linear duration-150"
      // to={company ? generateUrl('dashboard', company.subdomain) : '/create-new-company'}
      to={MyRouter.CREATE_COMPANY}
      {...props}
    >
      {label ? (
        <div className="inline-flex items-center justify-center w-[88px] h-[88px] mb-4 rounded-full overflow-hidden border-2 border-slate-100 transition ease-linear duration-150 group-hover:border-indigo-700">
          <Plus className="w-6 h-6 text-slate-900" />
        </div>
      ) : (
        <div className="inline-flex items-center justify-center w-[88px] h-[88px] mb-4 rounded-lg overflow-hidden transition ease-linear duration-150 group-hover:border-indigo-700">
          <CompanyAvatar
            logoUrl={company?.logoUrl}
            name={company?.name}
            className="text-2xl"
            size="w-[88px] h-[88px]"
          />
        </div>
      )}
      <p className="flex flex-col items-center justify-center gap-1">
        <span className="company-name text-slate-700 text-base font-semibold tracking-sm text-center">
          {company?.name || label}
        </span>
        <span className="text-slate-700 text-sm tracking-sm">
          {company?.role}
        </span>
      </p>
    </Link>
  );
}
