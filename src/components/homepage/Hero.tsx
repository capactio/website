import React, { FunctionComponent } from "react";
import clsx from "clsx";
import styles from "./Hero.module.css";
import Link from "@docusaurus/Link";

interface IconButtonProps {
  label: string;
  url: string;
  additionalClassName?: string;
}

const IconButton: FunctionComponent<IconButtonProps> = ({
  label,
  url,
  additionalClassName,
}) => <Link className={clsx(styles.iconButton, additionalClassName)} aria-label={label} to={url}></Link>;

export const Hero: FunctionComponent = () => {
  // TODO: Move data to custom fields
  // const { siteConfig }: DocusaurusContext = useDocusaurusContext();

  const buttons = [
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
  ];

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <h1 className="hero__title">
              A simple way to manage
              <br />
              applications and infrastructure
            </h1>
            <p className="hero__subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a mi
              a augue pulvinar ultrices quis quis lacus.
            </p>

            <div className={styles.buttons}>
              {buttons.map((props) => (
                <IconButton key={props.label} {...props} />
              ))}
            </div>
          </div>
          <div className={clsx("col col--6", styles.illustrationWrapper)}>
            {/* // TODO: Replace with actual illustration */}
            <img src="/img/logo.svg" className={styles.illustration} />
          </div>
        </div>
      </div>
    </header>
  );
};
