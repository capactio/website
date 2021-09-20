---
slug: introducing-capact
title: Introducing Capact, your new way to manage applications and infrastructure
authors:
  - pkosiec
tags:
  - capact
  - introduction
  - kubernetes
  - release
  - get-started
  - release-sneak-peek
---

Managing the lifecycle of infrastructure, applications, and processes in modern IT is problematic. There are a variety of tools and best practices, which are ever-changing. It's a struggle to stay up-to-date with these practices, and not everyone is an expert at everything. Technical debt is inevitable.

We are ultimately all alone. We are siloed within the context of team, department, or company, locked-in in a particular ecosystem of tooling. To deliver end-to-end capabilities, we build them from scratch in a vacuum. We consume API calls, transform data, build and manage infrastructure and applications. Don't we spend too much time solving the same problems as others have?

Sharing expertise is something that already happens—we have plenty of libraries and frameworks out there. But what if we went a step further and have a way to create, use and share building blocks that are **language-agnostic abstracted capabilities**?

For example, if you're not a cloud expert, all you need to know is that you want a managed PostgreSQL database on AWS. Let the subject-matter experts take care of it, and simply focus on your business logic. Likewise, if you need any Kubernetes cluster—by saying "I want any Kubernetes cluster" and letting the magic happen, you could cover both local development and production scenarios…

What if I told you… **now this is all possible**?

<!--truncate-->

Introducing Capact, crowdsourced expertise. Learn once, use everywhere.

## What is Capact?

Capact is a new way to manage applications and infrastructure and run arbitrary workflows. 

![Here we go again GIF](./assets/here-we-go-again-again.gif) <center><small>source: <a href="https://tenor.com/view/here-wego-again-again-ohboy-sigh-captain-america-gif-15496881" target="_blank">tenor.com</a></small></center>

Yes, we get it. You already know plenty of different tools for that. But Capact is different. How is it different?

Capact comes with a truly unique feature—**interchangeability of dependencies**. If you know the concept of interfaces from a variety of programming languages, you get the idea. Think about Capact as a way of executing workflows with steps, which are described with interfaces. An implementation for a given interface is resolved dynamically at runtime, according to your preferences. Also, these dynamic workflow steps are building blocks, which can be reused by others (or even nested within other workflows).

Initially, we focused on day-one and day-two operations for managing applications and infrastructure. However, Capact is built with universal concepts in mind, so you can run any arbitrary workflow you want. For example, you can do data processing, machine learning workloads, system configuration, cluster benchmarking, auditing, running serverless workloads—the possibilities are virtually endless.

The best thing is that Capact is **fully open-source** under the Apache 2.0 license. How cool is that? 😎

## Capact concept in one minute

The whole concept sounds confusing? Let's see that in action.

Let's take [Mattermost](https://mattermost.com/) installation as an example. Mattermost is an open-source alternative for Slack.

Mattermost is a Go server application, which uses a PostgreSQL database. If we want to install Mattermost, this how the workflow would look like:

![Mattermost installation 1](./assets/capact-example1.svg)

We need a PostgreSQL database first to run a Mattermost server. It's pretty simple.

Now, what if we make the PostgreSQL database installation abstract? Think about that as an empty slot, where you can put a puzzle with a specific shape.

![Mattermost installation 2](./assets/capact-example2.svg)

Assuming there are many puzzles pieces out there, you see that only a few of them fit in the slot:

![Mattermost installation 3](./assets/capact-example3.svg)

In the case of PostgreSQL installation, four puzzle pieces fit:

![Mattermost installation 4](./assets/capact-example4.svg)

1. Install PostgreSQL Helm chart on a Kubernetes cluster
1. Provision GCP CloudSQL for PostgreSQL database
1. Provision AWS RDS for PostgreSQL database
1. Reuse existing PostgreSQL database

By default, for a workflow run, Capact picks the first puzzle piece that fits. However, by applying [Policy](/docs/feature/policies/overview), you are in complete control of which puzzle piece will be chosen. Moreover, you can select a different one for a specific scenario, such as local setup, CI/CD, stage, and production cluster.

What's great is that Mattermost installation itself is also a larger puzzle piece, which others can use! Maybe as a part of productivity stack installation, which could consist of Mattermost, [GitLab](https://about.gitlab.com/) and [Jitsi Meet](https://jitsi.org/jitsi-meet/)? 🤔

![Mattermost installation 5](./assets/capact-example5.svg)

And that's Capact. You can build your own workflows with existing puzzles, which are available inside Capact Hub. You can also create your own puzzles. Share them with the community and enable [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) at a global scale, together!

## How does Capact differ from other tools?

Capact doesn't compete with tools you might already be familiar with, but it integrates them instead. Whether you are a [Helm](https://helm.sh) or [Terraform](https://terraform.io) user, you can still use your favorite tools. Mix and match your tooling or API of choice. For example, chain Terraform, Helm, and Slack API.

If you are familiar with [Kubevela](https://kubevela.io/), [Crossplane](https://crossplane.io/), and [Open Application Model](https://oam.dev/), you can see many similarities between the solution and Capact. Here are the main differences:
- Capact has unique built-in feature—interchangeable dependencies, which reduces the amount of duplicated code.
- Capact is a process / workflow-based solution, which gives you more flexibility. Unlike Kubevela and Crossplane, Capact is not limited to just infrastructure and application deployment. You can use it for virtually everything.

To read a detailed comparison between Capact and other tools, see our [FAQ](/docs/faq#how-does-capact-compare-to).

## Get started with Capact

Interested in trying out Capact? Awesome! The easiest way to do so is by installing it locally and trying out one of our examples to understand Capact basic concepts.

1. [Install Capact CLI](/docs/cli/getting-started),
1. [Install Capact locally with Capact CLI](/docs/installation/local),
1. [Run different scenarios of Mattermost installation example](/docs/example/mattermost-installation).  

Here are other things to do: 

⭐ **Star our GitHub repository**: If you like the idea, show your interest in the project and [give us a GitHub star](https://github.com/capactio/capact)! You can also subscribe for new Capact releases. Thank you for your support!

👉 **Follow us:** Interesting in Capact updates? Follow us on [Twitter](https://twitter.com/capactio)! Also, check out our [LinkedIn](https://www.linkedin.com/company/72586376) page and [YouTube](https://www.youtube.com/channel/UCajXtDttqVuZ_Bl7M3_qA8w) channel.

📖 **Read our documentation:** If you want to get familiar with other installation options, examples, content development, or contribution guides, check out the [Capact documentation](/docs).

🤔 **Get support:** If you need any help, or you have a question for us, join our [Slack channel](/slack) on the CNCF workspace and post a message—we'll do our best to get you sorted!

Currently, Capact is at an experimental stage. We open-sourced Capact as early as possible to get early feedback and build Capact together with the community.

## Wait, there's more!

In a series of future blog posts, we will highlight Capact features and cover various topics for all!

Also, as of September 20th 2021, **a brand-new release**, Capact 0.5.0, **is here**. We were working really hard to bring many UX improvements, both for Capact users and content developers. The list includes:
- Complete Action input validation and more advanced, concurrent Capact manifests validation with optional server-side checks,
- Experimental content development tools for Helm and Terraform-based (AWS and GCP) manifest generation,
- Policy syntax and behavior changes for improving consistency and usability,
- Verbose output for Capact CLI,
- Dependency updates, including migration to Argo 3,
- Air-gapped Capact installation,
- [k3d](https://k3d.io) support,
- and much, much, more!

To see the full list of features, read the [release notes](https://github.com/capactio/capact/releases/tag/v0.5.0).
 
Are you ready to start start playing around with Capact?

![Are you ready GIF](./assets/are-you-ready.gif) <center><small>source: <a href="https://tenor.com/view/are-you-ready-gif-5011220" target="_blank">tenor.com</a></small></center>

*This post was updated on 20.09.2021 to highlight that the Capact 0.5.0 release is publicly available.*
