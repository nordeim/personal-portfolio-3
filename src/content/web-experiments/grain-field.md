---
title: Grain Field
slug: grain-field
category: Web Experiments
accent: '#16a3b8'
status: archive
description: A generative canvas of moving grain. The page is the texture. The texture is the page.
medium: WebGL sketch
---

A small study in CSS noise as a primary surface. No imagery, no narrative.
Just a field of moving grain, breathing with the cursor.

## How it works

- A `canvas` element renders a 200×200 SVG noise texture
- The texture is mapped to the entire viewport
- A low-frequency sinusoid modulates the noise displacement
- The cursor introduces a small, slow ripple
