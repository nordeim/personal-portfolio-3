---
title: Typeset Engine
slug: typeset-engine
category: Code
accent: '#2457ff'
status: active
description: A small, opinionated library for setting type on the web with the care of print. Brutalist primitives, editorial defaults.
link: https://github.com/nicholas-yun/typeset-engine
linkLabel: View source
medium: TypeScript library · MIT licensed
---

A side project that grew out of frustration with the gap between "engineered
typography" in print and the messy reality of web type.

## The premise

Most type libraries optimize for flexibility. Typeset Engine optimizes for
restraint. It ships with three sizes, two weights, and a strong opinion about
line height.

## What it includes

- A 28px grid-aligned type scale
- Editorial defaults (Cormorant Garamond for display)
- A `Measure` component that enforces readable line length
- A `Rhythm` utility that snaps to the baseline grid
