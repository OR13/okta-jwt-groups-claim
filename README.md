# How to get okta groups claim on JWTs

Its very simple, but the instructions are not.

#### Step 1. Create an OpenID Connect Client Application.

In my case, I created an application for testing this behavior in travis CI. 
My Application is a "Native" application in okta parlance.
Under allows grants, I have checked everything (for testing purposes).
Under Client Credentials, I use "Client Authentication". This scheme is not appropriate for distributed apps, as the client secret will likely be leaked, and you will be sad. This scheme is appropriate for web servers or other infrastructure which you control, where the client secret is private and safe.

#### Step 2. Create some groups and users.

Use the okta admin ui to create some users and groups.

I recommend you name your groups smartly, like Acme-Admin, or Theranos-Admin, etc... This makes it clear that the group is yours and not a built in default, and it will also make it easy for you to use the Okta Expression Language to get the correct claims onto your ID token.

#### Step 3. Add groups scope to your Authorization Server

Logged in to okta, in the new developer console view.

API > Authorization Servers 

Edit your default server, or the one you want.

Click scopes > add scope. Enter "groups".

#### Step 4. Add a groups claim to id_tokens

Click claims > add claim. Enter "groups".

DO NOT USE EXPRESSION. Use Groups instead.

I chose to filter to only groups related to my org. Thanks to picking smart group names about, I can see if this user is a member of the admin group by selecting "Starts with" and "Acme".

You can read more about advanced mode stuff here... but be careful, because often it won't work as expected.

https://developer.okta.com/reference/okta_expression_language/#group-functions


#### Step 5. Test getting an id_token with okta groups claim

To ensure that everything worked correctly, you can use the test.js script in this repo.

Make sure to update example.env to .env and add your own values before:

```
npm i
npm run test
```