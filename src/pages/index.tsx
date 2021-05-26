import React, { FunctionComponent } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { HomepageFeatures } from "../components/HomepageFeatures";

interface DocusaurusContext {
  siteConfig: {
    title: string;
    tagline: string;

    customFields: {
      github: GitHubFeaturedRepoDetails;
    };
  };
}

const HomepageHeader = () => {
  const { siteConfig }: DocusaurusContext = useDocusaurusContext();

  const ghDetails = siteConfig.customFields.github;

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get started
          </Link>
          <GithubStarButton {...ghDetails} />
        </div>
      </div>
    </header>
  );
};

interface GitHubFeaturedRepoDetails {
  user: string;
  repository: string;
}

const GithubStarButton: FunctionComponent<GitHubFeaturedRepoDetails> = ({
  user,
  repository,
}) => (
  <span className={styles.githubButtonWrapper}>
    <iframe
      className={styles.githubButton}
      src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repository}&type=star&count=true&size=large`}
      width={160}
      height={30}
      title="GitHub Stars"
    />
  </span>
);

export default function Home() {
  const { siteConfig }: DocusaurusContext = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
};
