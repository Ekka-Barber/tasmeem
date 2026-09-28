---
id: en-devtool
language: en
budget: 10
---
Design the landing page for **shift**, an open-source command-line tool for zero-downtime Postgres schema migrations.

Facts (use them as given; add no others):
- Written in Go, MIT licence, single binary for macOS, Linux and Windows.
- Core idea: each migration runs as expand → backfill → contract, so old and new app versions work during a deploy.
- Commands: `shift plan`, `shift apply`, `shift status`, `shift rollback`.
- Install: `brew install shift-db/tap/shift` or `go install github.com/shift-db/shift@latest`.
- Works with Postgres 13 and newer. No hosted service, no telemetry.
- Audience: backend engineers who have been paged at 3 a.m. by a locked table.

Deliver one production-ready `index.html` with inline CSS, responsive for phone and desktop. Put any images in `assets/`.
