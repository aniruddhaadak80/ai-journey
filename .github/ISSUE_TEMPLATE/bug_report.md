name: Bug report

description: Something is broken or renders incorrectly
title: "[bug] "
labels: ["bug", "needs-triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting a bug. If the problem is **missing or wrong content**
        (a bad claim, a dead source link, a concept that doesn't render), please use
        the content-issue template instead — it routes faster.

  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: What did you observe, and what did you expect instead?
      placeholder: The Knowledge Graph canvas renders blank on Firefox 128.
    validations:
      required: true

  - type: textarea
    id: reproduce
    attributes:
      label: Steps to reproduce
      value: |
        1.
        2.
        3.
    validations:
      required: true

  - type: input
    id: route
    attributes:
      label: Which route?
      placeholder: /graph
    validations:
      required: true

  - type: input
    id: browser
    attributes:
      label: Browser & OS
      placeholder: Firefox 128 on Ubuntu 24.04
    validations:
      required: true

  - type: textarea
    id: console
    attributes:
      label: Console errors
      description: Paste any browser console output.
      render: shell

  - type: checkboxes
    id: checks
    attributes:
      label: Pre-flight
      options:
        - label: I ran `bun run verify` locally and it passes
          required: false
        - label: I checked existing issues and this isn't a duplicate
          required: false
