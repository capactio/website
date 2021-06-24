import React, { FunctionComponent } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { KeyFeatures } from "../components/homepage/KeyFeatures";
import { Hero } from "../components/homepage/Hero";
import { WhatIs } from "../components/homepage/WhatIs";
import { GetStarted } from "../components/homepage/GetStarted";

interface DocusaurusContext {
  siteConfig: {
    title: string;
    tagline: string;
  };
}

const Homepage: FunctionComponent = () => {
  const { siteConfig }: DocusaurusContext = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}
    >
      <Hero />
      <main>
        <WhatIs />
        <KeyFeatures />
        <GetStarted />
      </main>
    </Layout>
  );
};

export default Homepage;
