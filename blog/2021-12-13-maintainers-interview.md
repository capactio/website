---
slug: maintainers-interview
title: Meet Capact maintainers and learn how to become one!
authors:
  - mszostok 
  - pkosiec

tags:
  - capact
  - open-source
  - go
  - kubernetes
  - cloud-native
  - dry
  - interview
  - maintainers
  - contributors
  - career
---

Did you know that it's already been 16 months since the Capact was born?

In the previous blog post, you learned which problems Capact aims to solve. This time, Capact maintainers took some time to answer questions you might have if you're considering contributing to the project.

What's it like to build cloud-native platform from scratch? What is it like to work in Capact? What are the biggest challenges? How to start with Go? Read on to get the answers!

<!--truncate-->

## Tell us why you are here. How did you begin your adventure in IT?

**Mateusz:** In the past, I worked on similar projects that aimed to unify our developer tooling. In my opinion, it is something that awaits us in the future. It’s definitely worth being a part of it.

My journey with IT actually started thanks to my brother. The first program that I wrote was on Commodore 64 when I was about 10 years old. Since then, I have been involved in technology. From the beginning, I felt love for backends, but tolerated frontend 😁 During my studies, I got interested in the cloud. As a result, I started an internship, where from Java I switched to Go. Now it’s been 5.5 years that I’ve been connected with the cloud-native world and I certainly don’t regret that.

**Paweł:** My adventure with computer science also started pretty early. When I got my first PC, I was 8 years old. Initially, I played games on it, but after a while, I was interested in doing more than that. When I was in primary school, I started to write some basic applications in Delphi and created my first HTML website. Obviously, the websites followed the trends at that time—they were loaded with GIFs and tons of text scrolling in different directions (remember the “MARQUEE” HTML tag?).

When I was 13, I began working as a freelancer in the web development area. Before getting a bachelor’s degree in computer science, I joined my first IT company as a UI developer. More than 4 years ago, I transformed from a front-end guy to a full-stack cloud developer, with JavaScript, Go, and Kubernetes. I was involved in building a project from the CNCF landscape, and over time I developed less and less front-end and more back-end stuff. In the meantime, I was a Scrum Master and was involved in promoting that previous project at conferences, meetups, and different events. Same as Mateusz, I joined Capact over a year ago to build an ambitious, cloud-native project from scratch.

## The main technologies used in Capact are Go and Kubernetes. Why such a choice in this case?

**Paweł:** Both Go and Kubernetes are becoming more and more popular.

In the cloud-computing world, choosing the proper set of technologies is very crucial to ensure the final application is scalable, performant, and resilient. Kubernetes helps us orchestrate the deployed microservices, and make sure they operate without any issue, on any cloud provider, or even bare metal.

Go, on the other hand, is a great fit for such projects—its simplicity enables us to write such back-end services efficiently. They are fast to compile and consume much fewer resources than alternatives written in Java or JavaScript/TypeScript.

**Mateusz:** It’s worth highlighting that the Go community already created a lot of powerful libraries. You don’t need to solve cloud-specific problems once again, and can focus on solving your domain/business problems instead.

As mentioned, Go is easy in terms of memory consumption, which is important in cloud environments. Of course, it doesn't come without a downside; the abstraction level in Go is quite low, but the upcoming Go 1.18 will be a significant release, e.g. support for generic.

## Can you give us more background on what Capact is?

**Paweł:** Capact is an open-source framework for running arbitrary workflows. Initially, we are focused on day-one and day-two workflows for deploying, and managing applications and cloud-native infrastructure.

The main difference between Capact and alternative tools is its interchangeability of dependencies. The workflow may consist of dynamic steps, which are described by the interface. Such steps can resolve different implementations, depending on the user's preferences. It is the same concept taken from programming languages.

**Mateusz:** As you can see, the idea for the Capact project is pretty bold: Create a platform that is a glue that you can use to chain e.g. Terraform, Helm, and Slack API. At the same time, ensure [the DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) at the global scale, so that you can reuse as many existing building blocks as you can. This idea is explained very well in our [Introductory blog post](https://capact.io/blog/introducing-capact) :)

The best part of this project is that it's not a competitor to any other project. It gives an option to use tools that you like and trust in a unified and easy way.

## What are the biggest challenges associated with it?

**Mateusz:** As I said, we try to make Capact as easy as possible.

Here is the thing: it's challenging to make it easy for the end-user, as gluing different tools together requires a lot of flexibility from our platform. It's not possible to gather all use-cases and implement them at once. We need to deliver that iteratively.

Currently, we're in the process of locating the areas that will be worked on first.

Personally, I like that this project is complicated and makes you rack your brain. We want to solve problems that are not trivial. We also try to strike a balance between the productization and the open-source side.

**Paweł:** Apart from balancing between two scopes, open-source and commercial, these two are also separate challenges. We are about to start building an open-source community around Capact, which will definitely be a challenge to gain adoption—not only from hobbyists but also big tech companies.

There's also a commercial offering planned, which is based on Capact. And that's happening right now, so we need to ensure that the Capact user experience is seamless for every user profile (BTW they are described on [our website](https://capact.io/community/user-profiles)) and that it works well in a production environment.


## What kind of benefits related to career development can a contributor gain in this project?

**Paweł:** Capact consists of many technologies, and you can learn a lot. Even if you know some of them, while working on Capact, you will have an opportunity to dive deeply into some stuff you have never tried. Apart from Go and Kubernetes, we use GraphQL, TypeScript, Terraform, and plenty of projects and tools around Kubernetes, such as Argo workflows, and MinIO.

You will help design upcoming Capact features—starting from user experience, ending up on architectural challenges. There's also a lot to learn when it comes to soft skills—while building an open-source community, you will practice collaborating with external contributors, improve giving talks on meetups and conferences, etc.

Once you have made several valuable contributions, you will have an opportunity to become [Capact Maintainer](https://capact.io/community/governance#maintainers).

## What type of maintainers are you looking for?

**Mateusz:** We're looking for open-minded people who want to be responsible for multiple parts of the platform that we develop. We have a small team, and we deliver features end-to-end. At this stage, we don't want to split into domain experts; all of us are responsible for the whole product. Don't worry, we will help you in onboarding to our technology stack.

On a daily basis, you will implement new functionality, write automated tests, build CI/CD pipelines, and provide documentation for it.

**Paweł:** You will also have an opportunity to design architecture, create a proof of concepts, teach and evangelize the open-source community, and be involved in project roadmap planning.

We're looking for solid all-rounders, who are not afraid of new technologies and learn quickly. That's why we think about a true DevOps profile—solid programming skills and love for operations. We require Kubernetes experience, and some experience with Go—it doesn't have to be production-grade experience, but it would be good if you know the basic conventions. Any open-source contributions would be nice to have!


## Do you have any advice for beginners in Go? How to broaden one's knowledge in this direction and what possibilities does this language offer?

**Paweł:** Go is great for writing lightweight backend applications and CLI tools. If you want to build modern cloud-native, apps, learn Go, as it is the right tool for the job.

I would recommend starting with some Go interactive tutorials. After learning new syntax (which is really easy), figure out an idea for a new hobby project. Maybe you're missing some tool you would like to use? It doesn't matter whether it is an HTTP service, CLI tool, or something else—start working on that! Open-sourcing, can give you an additional boost to work on it, and improve over time. Promote it on Reddit and other sites, and you'll see that people use it, and love it!

You can also contribute to some existing open-source projects written in Go. On GitHub, look for issues with the “good first issue” label, discuss it with project maintainers, and start coding! If you're interested in the Capact project, perhaps you can even contribute to our repositories? We also have “good first issues” :-)

**Mateusz:** Personally, I can tell that for me the most efficient way to learn any language is by doing reviews and submitting PRs that will be reviewed by more experienced developers. This way, you learn how to solve real problems. It doesn't need to be directly within your current company. Same as Paweł, I'm a huge open-source enthusiast, so I also encourage you to contribute to various open-source projects, or start your own!

Additionally, I like to “spy” on other projects from the CNCF landscape and check their design. I also follow people connected with Go, e.g. [@dmitshur](https://github.com/dmitshur), [@ibuildthecloud](https://github.com/ibuildthecloud), [@mattn](https://github.com/mattn), [@rsc](https://github.com/rsc), [@alexellis](https://github.com/alexellis), [@bep](https://github.com/bep), [@peterbourgon](https://twitter.com/peterbourgon), and others, to learn how they solve a given problem, and to get familiar with different approaches.

In our community, there are a lot of materials. It's good to start with the [golang/wiki](https://github.com/golang/go/wiki/), the [50 Shades of Go: Traps, Gotchas, and Common Mistakes for New Golang Devs](http://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang), and the [Uber Style Guide](https://github.com/uber-go/guide). The [Ardan Labs](https://www.ardanlabs.com/blog/) is also a good knowledge source.

Others:
1. Read and follow:[ https://golang.org/doc/effective_go.html](https://golang.org/doc/effective_go.html)
2. Try:[ https://gobyexample.com/](https://gobyexample.com/)
3. Subscribe:[ https://golangweekly.com/](https://golangweekly.com/)

## Get involved!

Giving feedback, requesting a feature, reporting a bug—all of these are a great way to contribute. Just join our [**Slack**](/community/slack) and talk to us!

Are you participating in the [24 Pull Requests](https://24pullrequests.com/) event? We've got your back. Check out issues with the [`good first issue`](https://github.com/capactio/capact/labels/good%20first%20issue) label and get our full support from the beginning to the merge of your pull request :)

Do you want to work with us on a daily basis? Contact us at [contact@capact.io](mailto:contact@capact.io)!
