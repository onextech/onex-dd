# Server Migration

### Platform Infrastructure Migration

The documents provided in the handover bundle contains the necessary materials for you to host your code in a new server environment.

:::note
💡 For Amplify stacks, you may find information on hosting your production server using AWS Amplify Migration as mentioned in the official AWS docs.
:::

### Web Server Migration

We use Amazon Web Services directly for the majority of our cloud infrastructure with the exception of our web servers. For web servers, we use Vercel instead of EC2. Vercel is a web hosting provider that streamlines your application deployment. Vercel uses AWS as its underlying infrastructure.

To initiate your web server migration. Kindly register a Vercel account at [Vercel.com](http://Vercel.com) and request for a project transfer from One X Group Support. Upon authorisation of transfer, you will receive your application project in your Vercel account with zero downtime.

## Data migration

You can find your database dump in your handover package. After you’ve setup your database tables in your new cloud infrastructure, use the database dumps to import your data into your new database.

## Server Migration Checklist

The following is a list of resources that you may need to consider during your migration process

- [ ]  Vercel
- [ ]  Email Provider (e.g. Amazon SES)
- [ ]  User Identity Pool (e.g. AWS Cognito)
