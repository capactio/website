import React, { FunctionComponent } from "react";
import clsx from "clsx";
import styles from "./Hero.module.css";
import Link from "@docusaurus/Link";

const heroData = {
  title: (
    <>
      A&nbsp;simple way to manage
      <br />
      applications and infrastructure
    </>
  ),
  subtitle: (
    <>
      Deploy and manage capabilities in a&nbsp;collaborative manner.
      <br />
      Learn once, use everywhere.
    </>
  ),
  illustrationSrc: "/img/logo.svg", // TODO: Replace with target illustration
  buttons: [
    {
      label: "GitHub",
      additionalClassName: "github-icon",
      url: "https://github.com/capactio/capact",
    },
    {
      label: "Slack",
      additionalClassName: "slack-icon",
      url: "/slack",
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
    className={clsx(styles.iconButton, additionalClassName)}
    aria-label={label}
    to={url}
  ></Link>
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
