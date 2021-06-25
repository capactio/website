import React, {
  FunctionComponent,
  ReactElement,
} from "react";
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
        execute arbitrary workflows. Learn once, use everywhere!
      </>
    ),
  },
  {
    title: "Interchangeable Dependencies",
    iconName: "published_with_changes",
    description: (
      <>
        You don't need to worry about the dependencies. With generic concepts in
        mind, Capact will resolve the dependencies automatically, according to
        your preferences.
      </>
    ),
  },
  {
    title: "Collaborate",
    iconName: "group_work",
    description: (
      <>
        Capact is open source and powered by the community. Let's work together
        to enable DRY at a global scale!
      </>
    ),
  },
];

interface FeatureData {
  title: string;
  description: ReactElement;
  iconName: string,
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
