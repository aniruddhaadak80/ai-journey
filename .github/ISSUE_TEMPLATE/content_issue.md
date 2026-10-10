name: Content correction

description: A claim is wrong, outdated, unsourced, or a source link is dead
title: "[content] "
labels: ["content", "needs-triage"]
body:
  - type: markdown
    attributes:
      value: |
        This project makes factual claims about AI history, and every claim should
        trace to a source. If something is **inaccurate, outdated, unsourced, or
        misattributed**, this is the right place.

  - type: dropdown
    id: kind
    attributes:
      label: What type of issue is this?
      options:
        - Factual error — a statement is wrong
        - Missing citation — a claim has no linked source
        - Dead link — a source URL is broken
        - Outdated — accurate when written, stale now
        - Depth imbalance — simple/deeper/deepest aren't appropriately layered
    validations:
      required: true

  - type: input
    id: where
    attributes:
      label: Where in the dataset?
      description: Concept id, era id, chapter id, or source id.
      placeholder: concept `transformer`, source `gpt3-2020`
    validations:
      required: true

  - type: textarea
    id: current
    attributes:
      label: What it currently says
      description: Quote the passage.
      render: text
    validations:
      required: true

  - type: textarea
    id: correction
    attributes:
      label: What it should say
      description: The corrected passage, written in the same voice and at the same depth level.
      render: text
    validations:
      required: true

  - type: textarea
    id: source
    attributes:
      label: Supporting source
      description: A URL that supports the correction. A citation makes the fix fast to merge.
      render: text
    validations:
      required: true

  - type: checkboxes
    id: checks
    attributes:
      label: Pre-flight
      options:
        - label: I verified my source actually supports the correction
          required: true
        - label: I checked existing issues for a duplicate
          required: false
