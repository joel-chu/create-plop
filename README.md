# create-plop

> Quickly scarfold templates with [plop.js](https://plopjs.com/) integration

## Introduction

This is tool that generate template with [plop](https://plopjs.com) that actually built with plop :)

_Why you want to use it_ I been using plop for 5 years now, it's been my number one go-to tool
for quickly create generator for templates for different kind of teams. It's been battery test on
Angular.js / React (preact) / Vue 2~3 Projects. Here are a few reasons why I use it.

### 1. Hackability

Traditional CLI tool is like a blackbox, you really can't do anything with it; unless you take the source and hack it.
With `plopfile`, that's the source of your cli! And you (or your team) can add feature as needed.

### 2. Great for manage project

Guide line, documentation, even face-to-face lectures ... nobody cares or remember 5 minutes afterward; and they (your team member)
just gone back to dump shit all over the places. But with an official team cli tool. You have control over the file structure,
how things are organized, and new team member can jump right in just by running the tool couple times; they can hit-the-ground-start-running. Isn't that awesome?

### 3. Adding test is no longer an after thought

While you are generating template for your component, store etc, generate test template file at the same time; save time
and enforcing writing test (even just simple unit test). And the test file can be as throughout as you make it to be.

---

And that just a few of the benefit of using this system. I do believe you will find a cli tool that can be tailor to your need is a great asset to your project.

## Installation

```sh
$ npx create-plop@latest
```

Using the `@latest` will get you a fresh version (because we are upgrading it rapidly)

Just following the instruction.

We support Vue (v.3) with [Vuex](https://vuex.vuejs.org/) or [Pinia](https://pinia.vuejs.org/)
for start, and will add more framework in later release.

## Tech Requirement

The tool is mark as `type: module` and written in `ESM`.
It's develop on [Pop!_OS 22.04](https://pop.system76.com) and Node.js 16-lts,
using [pnpm](https://pnpm.io) to manage packages.

---

MIT

Joel Chu (c) 2022
