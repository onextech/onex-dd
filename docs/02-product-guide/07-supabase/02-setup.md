# Setup

### Pre-requisites:

- [ ] Register for a Supabase Account
- [ ] Create a new Supabase project

### Installation
1. [Create a new Supabase project](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#create-a-project)
2. [Get your Supabase API keys](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#get-the-api-keys)
3. Update your `.env` with the url and anon key to connect to your Supabase project
```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```
:::caution
Ensure to set the environment variables to avoid the following error when running your console.
> **Error**: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are required!
:::

4. Run migrations `yarn prisma migrate dev` from `packages/db`
5. Run `init.sql` to connect triggers and other sql that are unsupported by Prisma
6. Create a Supabase auth user to setup your first user
7. Accept the email invite and check that the matching db user has been created
8. Run the app on localhost. Reset your password to login to create your own password.
9. Login to your app.



