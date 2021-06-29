import clsx from "clsx";
import React, { FunctionComponent, ReactNode } from "react";
import styles from "./FullWidthSection.module.css";

export interface SectionProps {
  title: string;
  additionalClassName?: string;
  children: ReactNode;
}

export const FullWidthSection: FunctionComponent<SectionProps> = ({
  title,
  additionalClassName,
  children,
}) => {
  return (
    <section className={clsx(styles.section, additionalClassName)}>
      <div className="container">
        <div className="row">
          <h1 className={styles.header}>{title}</h1>
        </div>
        <div className="row">{children}</div>
      </div>
    </section>
  );
};
