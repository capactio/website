---
sidebar_position: 7
---

# User profiles

This document aggregates user profiles and personas, which help us design, develop and document new Capact features by evaluating them against those who will be using them.

## Profiles

This section describes general roles of users, which we focus on, while developing and documenting new features. A real person may have multiple roles assigned.

The list is ordered to highlight the priority of focus for the user experience for different roles.

1. **Action Operator**

    Action Operator operates Capact Actions and manages TypeInstances related to the Actions. Action Operator executes arbitrary Actions. For example, Actions which install applications and provision infrastructure Mattermost, provisioning Kubernetes cluster, or creating new PostgreSQL user.

1. **System Administrator**

    System Administrator operates Capact installation, that is, performs any day-one and day-two operations around installed Capact. Also, System Administrator manages global configuration for all Action Operators, such as [Global Policy](/docs/feature/policies/global-policy) or Capact Hub source.

1. **Content Developer**

    Content Developer develops new content, that is, Capact manifests and applications run in containers as a part of Implementations. One of the examples of such applications are [Runners](/docs/architecture/runner). Content Developer also integrates the developed content into existing Hub manifests.

1. **Capact Developer**

    Capact Developer is a person who develops the Capact itself. This group includes not only the project maintainers, but also any contributor which improves Capact with a bug fix, feature implementation or documentation update.

## Personas

This section describes fictional characters that represent typical users based on the [user profiles](#profiles).
Images have been downloaded from [thispersondoesnotexist.com](https://thispersondoesnotexist.com/).

### James

![James](./assets/james.jpg)

James is a 29 years old dev-ops engineer, which works at Schuppe LLC. Few year ago he completed bachelor's in Compute Science. At work he builds CI/CD pipelines and environments for different teams inside the company. From time to time he also helps with deployment and configuration of organization-wide productivity applications. 

James is an open source enthusiast and cloud-native technologies passionate. He don't like to implement something that's already out there in the open source community.

Recently he discovered Capact and started to use it for everyday tasks. He tries to reuse as many existing Capact content as he can, but if he sees a missing gap, he develops the manifests and contributes them to Capact.

#### Roles
- Action Operator
- System Administrator
- Content Developer

#### Personality
- Ambivert (half-introvert, half-extrovert)
- Cloud-native geek
- Eager to learn new things

#### Goals

- Get stuff done as fast as possible
- Automating as many things as possible
- Using libraries and projects from open-source community

#### Frustrations

- Writing boilerplate code
- Implementing stuff that's already out there in open-source community
- Missing or incomplete documentation for projects he uses
- Overcomplicated solutions


