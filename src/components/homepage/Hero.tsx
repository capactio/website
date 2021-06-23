import React, { FunctionComponent } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import styles from "./Hero.module.css";
import Link from "@docusaurus/Link";

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
      src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repository}&type=star&size=large`}
      width={160}
      height={30}
      title="GitHub Stars"
    />
  </span>
);

interface DocusaurusContext {
  siteConfig: {
    title: string;
    tagline: string;

    customFields: {
      github: GitHubFeaturedRepoDetails;
    };
  };
}

export const Hero: FunctionComponent = () => {
  const { siteConfig }: DocusaurusContext = useDocusaurusContext();

  const ghDetails = siteConfig.customFields.github;
  const gettingStartedUrl = "/docs/introduction";

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          A simple way to manage
          <br />
          applications and infrastructure
        </h1>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={gettingStartedUrl}
          >
            Get started
          </Link>
          <GithubStarButton {...ghDetails} />
        </div>
      </div>
    </header>
  );
};
