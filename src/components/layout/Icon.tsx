import clsx from "clsx";
import React, { FunctionComponent } from "react";

export interface IconProps {
  children: string;
  className?: string;
}

// This component renders Google Material icons. Browse them on https://fonts.google.com/icons
export const Icon: FunctionComponent<IconProps> = ({ children, className }) => {
  return <i className={clsx("material-icons", className)}>{children}</i>;
};
