import React, { FunctionComponent, ReactElement } from "react";
import styles from "./KeyFeatures.module.css";
import { FullWidthSection } from "../layout/FullWidthSection";
import { Icon } from "../layout/Icon";

const FeatureList: FeatureData[] = [
  {
    title: "Unify your workflow",
    iconName: "account_tree",
    description: (
      <>
        Capact unifies the way how to manage applications (or middleware, or
        infrastructure, or anything in between), run day-two operations and
        execute arbitrary workflows. Learn once, use everywhere.
      </>
    ),
  },
  {
    title: "Interchange dependencies",
    iconName: "published_with_changes",
    description: (
      <>
        In Capact, all dependencies are abstracted away and resolved dynamically
        according to your preferences. Preferring managed solutions from
        a&nbsp;specific cloud provider? Are you on-premise solutions fan? Either
        way, Capact got you covered!
      </>
    ),
  },
  {
    title: "Collaborate",
    iconName: "group_work",
    description: (
      <>
        Capact is an ecosystem for people to contribute where they have the
        biggest strengths. Do not reinvent the wheel. Let's work together to
        enable{" "}
        <a
          href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself"
          target="_blank"
        >
          DRY principle
        </a>{" "}
        at a global scale!
      </>
    ),
  },
];

interface FeatureData {
  title: string;
  description: ReactElement;
  iconName: string;
}

export const KeyFeature: FunctionComponent<FeatureData> = ({
  iconName,
  title,
  description,
}) => {
  return (
    <div className="col col--4">
      <div className="text--center">
        <div className={styles.featureIconWrapper}>
          <Icon className={styles.featureIcon}>{iconName}</Icon>
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const KeyFeatures: FunctionComponent = () => {
  return (
    <FullWidthSection title="Key Features">
      {FeatureList.map((props) => (
        <KeyFeature key={props.title} {...props} />
      ))}
    </FullWidthSection>
  );
};
