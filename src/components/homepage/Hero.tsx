import React, { FunctionComponent } from "react";
import clsx from "clsx";
import styles from "./Hero.module.css";
import Link from "@docusaurus/Link";

const heroData = {
  title: (
    <>
      A&nbsp;unified way to manage
      <br />
      applications and infrastructure
    </>
  ),
  subtitle: (
    <>
      Vendor-agnostic. Crowdsourced expertise. <br /> Learn once, use
      everywhere.
    </>
  ),
  illustrationSrc: "/img/logo.svg", // TODO: Replace with target illustration
  buttons: [
    {
      label: "Get started",
      additionalClassName: "button--primary",
      url: "/docs/installation/local",
    },
    {
      label: "GitHub",
      additionalClassName: "button--outline",
      url: "https://github.com/capactio/capact",
    },
  ],
};

const IllustrationColumn: FunctionComponent<{
  src: string;
  className?: string;
}> = ({ src, className }) => (
  <div className={clsx(styles.illustrationWrapper, className)}>
    <img src={src} className={styles.illustration} />
  </div>
);

interface IconButtonProps {
  label: string;
  url: string;
  additionalClassName?: string;
}

const IconButton: FunctionComponent<IconButtonProps> = ({
  label,
  url,
  additionalClassName,
}) => (
  <Link
    className={clsx("button button--lg", styles.buttonDark, additionalClassName)}
    aria-label={label}
    to={url}
  >{label}</Link>
);

export const Hero: FunctionComponent = () => {
  const { title, subtitle, illustrationSrc, buttons } = heroData;

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <IllustrationColumn
            src={illustrationSrc}
            className="col col--5 mobile-display"
          />
          <div className="col col--7">
            <h1 className="hero__title">{title}</h1>
            <p className="hero__subtitle">{subtitle}</p>

            <div className={styles.buttons}>
              {buttons.map((props) => (
                <IconButton key={props.label} {...props} />
              ))}
            </div>
          </div>
          <IllustrationColumn
            src={illustrationSrc}
            className="col col--5 mobile-hide"
          />
        </div>
      </div>
    </header>
  );
};
