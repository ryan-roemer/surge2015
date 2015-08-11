[![Travis Status][trav_img]][trav_site]

Wrangling Large Scale Frontend Web Applications
===============================================

Presentation for my [Surge 2015](http://surge.omniti.com/2015?ryan-roemer) talk.

## Abstract

Web applications are massively shifting to the frontend, thanks to exciting new
JavaScript / CSS technologies, expanding browser capabilities (visualizations,
real-time apps, etc.) and faster perceived user experiences. However, client web
applications can be a nightmare to maintain at scale, even for seasoned software
architects and operations engineers. Deployment and production infrastructures
are complex and rapidly changing. And, frontend JavaScript / CSS code ships to
browsers worldwide, where errors and issues are notoriously difficult to
systematically detect and diagnose.

In this talk, we will tackle the wild west of the frontend with pragmatic steps
and seasoned advice from helping organizations from startups to Fortune 500
companies create some of the largest frontend web applications on the Internet.

Some of the topics we will cover include:

* Managing and building very large (500K+ line) frontend application / test code bases.
* Surviving production traffic and errors on the frontend and handling spikes
  like Black Friday / Cyber Monday for one of the highest traffic e-commerce
  websites in existence.
* How, where, and why your frontend application is likely to fail.
* Monitoring, logging, and debugging frontend web applications out in the wild.
* Automating checks, tests, and code introspection to protect your code in production.
* Creating an effective, fast, and engineer-friendly development-test-deployment frontend pipeline.


[trav_img]: https://api.travis-ci.org/ryan-roemer/surge2015.svg
[trav_site]: https://travis-ci.org/ryan-roemer/surge2015
