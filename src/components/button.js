import cn from "classnames";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Button({
  text,
  icon,
  variant,
  size,
  type,
  height,
  fullWidth,
  mobileFullWidth,
  disabled,
  loading,
  ...props
}) {
  const override = css`
    display: block;
    margin-inline: 1rem;
  `;
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={cn(
        `text-${size}`,
        `inline-flex items-center justify-center gap-2 tracking-sm border rounded-md transition ease-linear duration-200 focus:outline-none`,
        size === "sm" ? "px-2 py-1" : "px-4 py-2",
        height ? `h-${height}` : "",
        fullWidth ? "w-full" : "",
        mobileFullWidth ? "w-full md:w-auto" : "",
        loading ? "opacity-50 cursor-not-allowed" : null,
        disabled ? "opacity-50 cursor-not-allowed" : "",
        variant === "icon" ? "border-0 px-0 py-0" : "",
        variant === "blank"
          ? "py-2.5 px-4 bg-white dark:bg-aa-600 purple:bg-pt-900 text-gray-700 dark:text-aa-100 purple:text-pt-100 border-gray-300 hover:bg-gray-100"
          : "",
        variant === "blankRed"
          ? "py-2.5 px-4 bg-white dark:bg-aa-900 purple:bg-pt-900 text-red-700 dark:text-aa-200 purple:text-pt-200 border-red-300 dark:border-aa-500 purple:border-pt-500 hover:bg-red-100"
          : "",
        variant === "red"
          ? "py-2.5 px-4 bg-red-600 dark:bg-red-800 purple:bg-red-800 text-white dark:text-aa-100 purple:text-pt-100 border-transparent hover:bg-red-700"
          : "",
        variant === "indigo"
          ? "py-2.5 px-4 bg-indigo-700 dark:bg-aa-700 purple:bg-pt-700 text-white dark:text-aa-100 purple:text-pt-100 border-transparent dark:border-aa-600 purple:border-pt-800 hover:bg-indigo-600 dark:hover:bg-aa-500 purple:hover:bg-pt-600"
          : "",
        variant === "text"
          ? "bg-transparent text-gray-700 dark:text-aa-100 purple:text-pt-100 border-transparent hover:bg-gray-100 dark:hover:bg-aa-400 purple:hover:bg-pt-400"
          : ""
      )}
      {...props}
      disabled={loading || disabled}
    >
      {icon || null}
      {loading ? (
        <ClipLoader
          color={variant === "text" ? "#3B82F6" : "#fff"}
          loading={loading}
          size={20}
          css={override}
        />
      ) : (
        <span className="whitespace-nowrap">{text}</span>
      )}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf([
    "blank",
    "blankRed",
    "red",
    "indigo",
    "icon",
    "text",
  ]),
  size: PropTypes.oneOf(["sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  height: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  text: "",
  icon: null,
  variant: "blank",
  size: "base",
  type: "button",
  height: "11",
  fullWidth: false,
  disabled: false,
};
