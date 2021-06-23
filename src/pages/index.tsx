import React, { FunctionComponent } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Features } from "../components/homepage/Features";
import { Hero } from "../components/homepage/Hero";

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
        <Features />
      </main>
    </Layout>
  );
};

export default Homepage;
