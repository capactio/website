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
