import React, { FunctionComponent } from "react";
import { FullWidthSection } from "../layout/FullWidthSection";
import styles from "./GetStarted.module.css";
import Link from "@docusaurus/Link";

export const GetStarted: FunctionComponent = () => {
  return (
    <FullWidthSection title="Get started">
      <div className="col col--6">
        <h3>Begin your journey with Capact</h3>
        <p>
          The easiest and fastest way to try out Capact is bootstrapping a Capact
          cluster on your local machine. Install Capact CLI and use dedicated commands to create and run the cluster. Have fun!
        </p>
        <p>If you want to learn more about Capact, get familiar with concepts and features, read our documentation.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/installation/local"
          >
            Install Capact
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/introduction"
          >
            Learn more
          </Link>
        </div>
      </div>
      <div className="col col--6">
        <div className={styles.terminalWrapper}>
          {/* TODO: Replace it with interactive terminal in https://github.com/capactio/capact/issues/328 */}
          <img src="/img/terminal.svg" />
        </div>
      </div>
    </FullWidthSection>
  );
};
