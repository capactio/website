import React, { FunctionComponent, ReactNode } from "react";
import { FullWidthSection } from "../layout/FullWidthSection";
import { Icon } from "../layout/Icon";
import styles from "./WhatIs.module.css";

const whatIsData = {
  title: <>Capact = Capabilities actualized</>,
  body: (
    <>
      <p>
        Capact (pronounced: "cape-act", /ˈkeɪp.ækt/) is essentially an
        extensible, community-powered framework for Getting Things Done. What
        things, you may ask? Anything really, though initially we are focused on
        day-one and day-two workflows for deploying and managing applications
        and cloud-native infrastructure. Where it goes from there is up to the
        community's imagination.
      </p>
      <p>
        Learning new tools and technologies takes time, and executing your newly
        learned skills in a production-ready fashion takes even longer. Capact
        allows its users and contributors to use open standard (and
        community-maintained) abstractions and rely on the expertise of the
        implementation developers to make things work.
      </p>
    </>
  ),
  highlights: [
    {
      iconName: "auto_awesome_mosaic",
      body: (
        <>
          Mix and match your tooling or API of choice. For example, chain Terraform, Helm and Slack API.
        </>
      ),
    },
    {
      iconName: "checklist",
      body: (
        <>
         Capact is powered by GraphQL API. Use it through the included nifty CLI or any way you like. 
        </>
      ),
    },
    {
      iconName: "groups",
      body: (
        <>
          Capact is a totally free-to-use, open source project, powered by the
          community. Let's work together to
        enable{" "}
        <a
          href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself"
          target="_blank"
        >
          DRY
        </a>{" "}at a global scale!
        </>
      ),
    },
  ],
};

interface HighlightProps {
  iconName: string;
  body: ReactNode;
}

const Highlight: FunctionComponent<HighlightProps> = ({ iconName, body }) => (
  <li>
    <div className={styles.highlight}>
      <div className={styles.highlightIconWrapper}>
        <Icon className={styles.highlightIcon}>{iconName}</Icon>
      </div>
      <p className={styles.highlightDesc}>{body}</p>
    </div>
  </li>
);

export const WhatIs: FunctionComponent = () => {
  const { title, body, highlights } = whatIsData;
  return (
    <FullWidthSection title="What is Capact?">
      <div className="col col--12">
        <h3>{title}</h3>
      </div>
      <div className="col col--6">{body}</div>
      <div className="col col--6">
        <ul className={styles.highlights}>
          {highlights.map((item) => (
            <Highlight {...item} />
          ))}
        </ul>
      </div>
    </FullWidthSection>
  );
};
