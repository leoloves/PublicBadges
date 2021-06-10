# PUBLIC BADGES

## Rationale

Public Badges are an evidence-based certification system for value driven
internet product and organization. As part of the
[PublicSpaces](https://publicspaces.net) initiative, our aim is to (re)establish
trust relations, between citizens, organizations, and governments.

By combining [Open Badges](https://openbadges.org/) with automated unit tests,
we make the ethical values of organizations, products, projects, and protocols
visbile as well as measurable.

The goal of the Public Badges is not to come up with an one size fits all value
system for the internet. Instead, it is a tool to facilitate discussion about
the choice of values within a pluralist landscape.

Public Badges are currently available to members of the PublicSpaces coalition.
If you work for a public institution, and you are interested in joining, please
email us at <info@publicspaces.net>.


## Zero Badge

At the moment, there is only one badge available: the so-called Zero Badge. The Zero Badge serves as a public outing of support to the ideals enshrined in the PublicSpaces manifesto. The badge will be an image that partners can put on their website that shows their support for the manifesto. Behind the scenes, an automated technical validation will take place so that a badge cannot be displayed on a website unauthorised. 

Currently organisations carrying the badge are [VPRO](https://www.vpro.nl), [Waag](https://waag.org) and [Eye Filmmuseum](https://www.eyefilm.nl/en). 
We hope to add the Zero Badge to the websites of multiple PublicSpaces partners in 2021. 

The Zero Badge is only open to current members of the [PublicSpaces
Coalition](https://publicspaces.net/the-coalition/), but we aim to broaden our
scope and reach. Follow this link to [become a partner of the PublicSpaces coalition.](https://publicspaces.net/join-us/) 

The current state and envisioned roadmap of the project can be found
[HERE](./state_of_the_project.md)

PublicSpaces members have to get in touch with [PublicSpaces program manager](https://github.com/leoloves) in order to apply for the app. 
The program manager will go through the following steps:

### 1. Apply for the PublicSpaces Registry

In order to do so, you can either make a curl request to the
[api](https://2cnf4k566a.execute-api.eu-west-1.amazonaws.com/dev/graphql) or
select the 'Register Organization' tab in the
[graphql-playground](https://2cnf4k566a.execute-api.eu-west-1.amazonaws.com/dev/playground)
and enter your input params in the box in the bottom left corner:

```json

{
  "input":  {
    "name": "CoolPublicOrg",
    "domainName": "https://example.org",
    "contact": {
      "name": "Jane Dodo",
      "email": "jane@example.org"
    },
    "contact": {
      "name": "Jane Dodo",
      "email": "jane@example.org"
    }
  }
}

```

### 2. Apply for the Zero Badge

In order to do so, you can either make a curl request to the
[api](https://2cnf4k566a.execute-api.eu-west-1.amazonaws.com/dev/graphql) or
select the 'Apply For Badge' tab in the
[graphql-playground](https://2cnf4k566a.execute-api.eu-west-1.amazonaws.com/dev/playground)
and enter your input params in the box in the bottom left corner:

```json

{
  "input":  {
    "valueCaseId": "88c7a930-3181-11ea-9858-b312ce22102d",
    "domainName": "https://example.org"
  }
}

```

### 3. Put The Frontend Component on your Website
Describe steps on how to put the Frontend Component on your website. 

## Contributors

This project is in a very early stage. Currently, we are not actively looking for
contributors, but that does not mean you are not welcome to reach out to us. It
may take us a bit to be ready to onboard you, but at least we can start a
conversation and get to know each other.

Since this project, involves much more than code alone, don't hesitate to get involved
if you don't know how to program at all. If all goes well, we'll need people with various
skill sets to make this project a success: writers, political theorists,
lawyers, designers, coders or just anyone who is passionate about the future of the ethical
internet and the ways we are going to govern it.

If that's you, don't hesitate to contact us at <info@publicspaces.net>. You are welcome!


## Maintainers

[Jan Hein Hoogstad](https://github.com/yeehaa123): Concept development, system architecture,
and backend development

[Alain Otjens](https://github.com/alain0): UI/UX design and frontend development

[Leonieke Verhoog](https://github.com/leoloves): program manager at PublicSpaces and community manager for the PublicSpaces badge.

## Contributing

In order to work on this project, you need to have the following tools
installed:

- Terraform (https://www.terraform.io/downloads.html)

- NodeJS (https://nodejs.org/en/)

After you made sure that you meet these requirements, run this command:

```bash
npm install && npm run prepare
```

## TODO

- [x] Create Github Organization
- [x] Install Doc Tool
- [x] Update Documentation
