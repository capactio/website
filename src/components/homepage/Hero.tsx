import React, { FunctionComponent } from "react";
import clsx from "clsx";
import styles from "./Hero.module.css";
import Link from "@docusaurus/Link";

const heroData = {
  title: (
    <>
      A simple way to manage
      <br />
      applications and infrastructure
    </>
  ),
  subtitle: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a mi a augue
      pulvinar ultrices quis quis lacus.
    </>
  ),
  illustrationSrc: "/img/logo.svg", // TODO: Replace with actual illustration
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
  <div className={clsx("col col--6", styles.illustrationWrapper, className)}>
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
            className="mobile-display"
          />
          <div className="col col--6">
            <h1 className="hero__title">{title}</h1>
            <p className="hero__subtitle">{subtitle}</p>

            <div className={styles.buttons}>
              {buttons.map((props) => (
                <IconButton key={props.label} {...props} />
              ))}
            </div>
          </div>
          <IllustrationColumn src={illustrationSrc} className="mobile-hide" />
        </div>
      </div>
    </header>
  );
};
