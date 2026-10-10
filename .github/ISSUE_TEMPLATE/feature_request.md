name: Feature request

description: Suggest a new route, interaction, or capability
title: "[feat] "
labels: ["enhancement", "needs-triage"]
body:
  - type: textarea
    id: problem
    attributes:
      label: What problem does this solve?
      description: Describe the gap in the current experience, not just the feature you want.
      placeholder: "I can't tell which concepts belong to the same era without expanding every card."
    validations:
      required: true

  - type: textarea
    id: proposal
    attributes:
      label: Proposed solution
      render: text
    validations:
      required: true

  - type: dropdown
    id: area
    attributes:
      label: Which part of the app?
      options:
        - Timeline
        - Knowledge Graph
        - Course
        - Flowcharts
        - Source Library
        - Shared UI / design system
        - Content / dataset
        - Infrastructure
    validations:
      required: true

  - type: checkboxes
    id: checks
    attributes:
      label: Pre-flight
      options:
        - label: I checked existing issues and PRs for this
          required: false
        - label: This adds capability rather than duplicating an existing route
          required: false
