# Setup

### Pre-requisites:

- [x] A Supabase Account
- [x] A Supabase project

### 1. Supabase Project Connection
1. [Create a new Supabase project](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#create-a-project)
3. [Get your Supabase API keys](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#get-the-api-keys) to add the following env vars to your `.env` file:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 2. Database Migration
Connect to your Supabase database to seed your database.

1. Get your Supabase database connection string from the supabase console at this route: `https://app.supabase.com/project/<PROJECT_ID>/settings/database`
2. In your `.env` file, add the following env var:
```
DATABASE_URL=postgresql://<DB_USER>>:<DB_PASSWORD>@db.<PROJECT_ID>.supabase.co:5432/postgres
```
4. Run migrations `yarn prisma migrate dev` from `packages/db`
5. Run `init.sql` to connect triggers and other sql that are unsupported by Prisma

### 3. Initialize Admin User
Create a Supabase auth user to seed your first auth and db user.

1. Go to `https://app.supabase.com/project/<PROJECT_ID>>/auth/users` to invite your first user. This will be the auth user.
2. Accept the email invite and note the `User UID` key in the above link.
3. Connect into your database and create a new row in the `user` table with the `auth_id` as the `User UID`. This will be the database user.

### 4. Set Admin User Password
Receive reset password emails for your user.

Supabase restricts sending of authentication-related links to white-listed URLs only. Follow the instructions to set this up for your account.

1. In `https://app.supabase.com/project/<PROJECT_ID>/auth/url-configuration`, add your URLs to the **Site URL** and **Redirect URLs** section.
2. Run the app on localhost, go to the reset password page to trigger the reset password email and follow the steps to create your own password.
3. Login to your app.



