# TypeScript List Application 📋

## About this project

I created this project to learn more about vanilla TypeScript. The code closely follows
[Dave Gray's](https://github.com/gitdagray) great course called
[TypeScript Project from Scratch](https://youtu.be/61v23Ce5SXA?si=_E8w379ge7it0jLx).

## Requirements

| Name       | Version |
|------------|---------|
| Node.js    | 20.8.0  |
| npm        | 10.2.0  |
| TypeScript | 5.3.3   |

## Generating TypeScript project

For generating a vanilla TypeScript project a tool called Vite can be used. It does the
scaffolding automatically using via the following terminal command:

```shell
npm create vite@latest
```

## Using Prettier on the project

### What is Prettier?

Prettier is an opinionated code formatter tool. It's pretty handy when it comes to
collaboration between developers.

### How to use Prettier with WebStorm on Mac

* Install Prettier with npm
* Webstorm Settings → Languages & Frameworks → JavaScript →
    1. Enable Prettier
    2. Enable _On 'Reformat Code' action_
    3. Enable _On save_

### Debugging Prettier with WebStorm on Mac

If, for some reason, Prettier doesn't work automatically on save, open the project in the Terminal and
try debugging Prettier with `prettier . --write`.

In my case, enabling the On save feature didn't work at all,
so I had to do this additional step:

Webstorm Settings → Tools → Actions on save → Tick _Reformat Code_

This should fix the problem of Prettier not running on save.
