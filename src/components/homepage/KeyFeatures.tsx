import React, {
  FunctionComponent,
  ReactElement,
  ImgHTMLAttributes,
} from "react";
import styles from "./KeyFeatures.module.css";
import { FullWidthSection } from "../layout/FullWidthSection";

const FeatureList: SingleFeature[] = [
  {
    title: "Unify your workflow",
    SVG: require("../../../static/img/placeholder.svg").default, // TODO:
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
    SVG: require("../../../static/img/placeholder.svg").default, // TODO:
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
    SVG: require("../../../static/img/placeholder.svg").default, // TODO:
    description: (
      <>
        Capact is open source and powered by the community. Let's work together
        to enable DRY at a global scale!
      </>
    ),
  },
];

interface SingleFeature {
  title: string;
  description: ReactElement;
  SVG: FunctionComponent<ImgHTMLAttributes<SVGSVGElement>>;
}

export const Feature: FunctionComponent<SingleFeature> = ({
  SVG,
  title,
  description,
}) => {
  return (
    <div className="col col--4">
      <div className="text--center">
        <SVG className={styles.featureSvg} alt={title} />
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
        <Feature key={props.title} {...props} />
      ))}
    </FullWidthSection>
  );
};
