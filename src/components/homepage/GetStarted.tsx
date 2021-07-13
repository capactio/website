import React, { FunctionComponent } from "react";
import { FullWidthSection } from "../layout/FullWidthSection";
import { GetStartedTerminal } from "./GetStartedTerminal";
import styles from "./GetStarted.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";

const getStartedData = {
  title: <>Begin your journey with Capact</>,
  body: (
    <>
      <p>
        It's easy to try out Capact on your local machine. Install the CLI,
        bootstrap a cluster and use Capact to deploy something, like Mattermost.
        Have fun!
      </p>
      <p>
        If you want to learn more about Capact, get familiar with concepts and
        features, read our documentation.
      </p>
    </>
  ),
  buttons: [
    {
      text: "Install Capact",
      url: "/docs/installation/local",
      additionalClassName: "button--primary",
    },
    {
      text: "Learn more",
      url: "/docs/introduction",
      additionalClassName: "button--outline",
    },
  ],
};

export const GetStarted: FunctionComponent = () => {
  const { title, body, buttons } = getStartedData;
  return (
    <FullWidthSection title="Get started">
      <div className="col col--6">
        <h3>{title}</h3>
        <>{body}</>
        <div className={styles.buttons}>
          {buttons.map((btn) => (
            <Link
              key={btn.url}
              className={clsx("button button--lg", btn.additionalClassName)}
              to={btn.url}
            >
              {btn.text}
            </Link>
          ))}
        </div>
      </div>
      <div className="col col--6">
        <div className={styles.terminalWrapper}><GetStartedTerminal /></div>
      </div>
    </FullWidthSection>
  );
};
