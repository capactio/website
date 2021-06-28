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
        execute arbitrary (or ad-hoc) workflows.
      </>
    ),
  },
  {
    title: "Interchange dependencies",
    iconName: "published_with_changes",
    description: (
      <>
        In Capact, all dependencies are abstracted away and resolved dynamically
        according to your preferences. Want to use managed solutions from your
        cloud provider? Or maybe you are an on-prem aficionado? Capact's got you
        covered!
      </>
    ),
  },
  {
    title: "Collaborate",
    iconName: "group_work",
    description: (
      <>
        Capact is an ecosystem. Codify and contribute your subject matter
        expertise. Do not reinvent the wheel. Publish once, use anywhere. Let's get stuff done together!
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
