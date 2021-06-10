import React, { FC, ReactElement, ImgHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList: SingleFeature[] = [
  {
    title: "Unify your workflow",
    SVG: require("../../static/img/undraw_docusaurus_mountain.svg").default, // TODO:
    description: (
      <>
        Capact unifies the way how to manage applications (or middleware, or infrastructure, or anything in between), run day-two operations and execute arbitrary workflows. Learn once, use everywhere! 
      </>
    ),
  },
  {
    title: "Interchangeable Dependencies",
    SVG: require("../../static/img/undraw_docusaurus_tree.svg").default,  // TODO:
    description: (
      <>
        You don't need to worry about the dependencies. With generic concepts in mind, Capact will resolve the dependencies automatically, according to your preferences.
      </>
    ),
  },
  {
    title: "Collaborate",
    SVG: require("../../static/img/undraw_docusaurus_react.svg").default, // TODO:
    description: (
      <>
        Capact is open source and powered by the community. Let's work together to enable DRY at a global scale!
      </>
    ),
  },
];

interface SingleFeature {
  title: string;
  description: ReactElement;
  SVG: FC<ImgHTMLAttributes<SVGSVGElement>>;
}

export const Feature: FC<SingleFeature> = ({ SVG, title, description }) => {
  return (
    <div className={clsx("col col--4")}>
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

export const HomepageFeatures: FC = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
};
