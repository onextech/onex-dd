# Vercel

### Pre-requisites:
- [ ]  [**Vercel CLI**](https://vercel.com/docs/cli): `npm install -g vercel`

### Vercel Setup


1. In bash, [login via the Vercel CLI](https://vercel.com/docs/cli#commands/login)
2. Follow the prompts to log in to your Vercel account
1. Go to the relevant package that you’re working on e.g. `cd packages/web` to be in the package root.
2. In the package root, run `vercel link`:
    ```
    Set up “~/my-project/packages/web”? [Y/n] y
    Which scope should contain your project? [choose your team]
    Link to existing project? [y/N] y
    What’s the name of your existing project? my-project-web
    ```
3.  To get the `.env`, run `vercel env pull`

### Starting the server

1.  `yarn dev`
2. To run another package, open a new shell and repeat the **Vercel Setup**
