import React, { FC } from "react";

interface ButtonProps {
  children?: React.ReactNode; // make the component able to receive children elements,
  color?: string;
  width?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (() => Promise<void>) | (() => void);
}

const Button: FC<ButtonProps> = ({
  children,
  color,
  width = "full",
  className,
  disabled,
  onClick,
}) => {
  let classes =
    "rounded-3xl w-full bg-primary-600 px-4 py-4 text-sm font-medium text-white hover:bg-blue-800 focus:ring-0 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  if (disabled) {
    classes =
      "rounded-3xl w-full bg-primary-50 px-4 py-4 text-sm font-medium text-social-github focus:ring-0 focus:ring-blue-300";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className ? className : classes}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: "primary",
};
export default Button;
