# Angular Performance Patterns

> This is an educational fork of [mgechev/performance-patterns](https://github.com/mgechev/performance-patterns).  
> The goal is to explore how the original performance ideas translate to the latest Angular features.

## Why this fork exists

The original project is an excellent collection of performance-oriented patterns for Angular apps:

- Change detection strategies
- Immutability
- Component design
- Rendering patterns
- Memory and runtime cost analysis

But it targets older Angular versions and pre-signals mental models.

This fork updates the code and explanations so they make sense in **Angular 20** and with the **current Angular APIs** (Signals, standalone components, runOutsideAngular ergonomics, etc.).

This is not just an upgrade — it's a study project. I'm rewriting / re-running the experiments to understand what still matters, what changed, and what new patterns are worth using today.

## Goals

### 1. Upgrade to Angular 20

- Update all examples, configs, and dependencies to Angular 20.
- Use standalone APIs instead of `NgModule`-heavy setups where possible.
- Use the latest recommended build setup.

### 2. Re-implement patterns using the Signals API

- Replace `@Input()` + `OnPush` where possible with `input()` / signals-driven data flow.
- Replace `RxJS`-only state flows with `signal`, `computed`, and `effect` where it makes sense.
- Show how signals affect:
  - Change detection cost
  - Template update frequency
  - Memory / GC pressure

## Notes about the original project

The original work by [@mgechev](https://github.com/mgechev) is excellent and very high-quality.
All credit for the initial structure, problem statements, and many of the ideas belongs there.

This fork is not an official update. It's a personal study, with:

- Updated code
- New examples
- Commentary from the point of view of Angular 20

### TL;DR

- Original repo: Angular performance patterns (pre-signals world)
- This fork: Re-testing those ideas in Angular 20, using Signals and the newest Angular APIs
- Goal: understand modern "fast Angular", not just copy old recipes
