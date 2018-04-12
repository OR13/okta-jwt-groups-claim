# How to get okta groups claim on JWTs

Its very simple, but the instructions are not.

#### Step 1. Create an OpenID Connect Client Application.

In my case, I created an application for testing this behavior in travis CI.

* My Application is a "Native" application in okta parlance.
* Under allows grants, I have checked everything (for testing purposes).
* Under Client Credentials, I use "Client Authentication".

This scheme is not appropriate for distributed apps, as the client secret will be leaked, and you will be sad.

This scheme is appropriate for web servers or other infrastructure which you control, where the client secret is private and safe, make sure not to leak this in your CI builds...

#### Step 2. Create some groups and users.

Use the okta admin ui to create some users and groups.

I recommend you name your groups smartly, like Acme-Admin, or Theranos-Admin, etc... This makes it clear that the group is yours and not a built in default, and it will also make it easy for you to use the Okta Groups filter to get the correct groups claim onto your ID token.

#### Step 3. Add groups scope to your Authorization Server

Logged in to okta, in the new developer console view.

API > Authorization Servers

Edit your default server, or the one you want.

Click scopes > add scope. Enter "groups".

#### Step 4. Add a groups claim to id_tokens

Click claims > add claim. Enter "groups".

To start, use Groups instead of expression, and avoid the regex.

Thanks to picking smart group names, I can see if this user is a member of the admin group by selecting "Starts with" and "Acme".

You can read more about advanced mode stuff here... 

https://developer.okta.com/reference/okta_expression_language/#group-functions

#### Step 5. Test getting an id_token with okta groups claim

To ensure that everything worked correctly, you can use the test.js script in this repo.

Make sure to update example.env to .env and add your own values before running the test:

```
npm i
npm run test
```

Here is an example id_token with groups:

```
{ sub: '00ue...',
  ver: 1,
  iss: 'https://PUBLIC_INFO.oktapreview.com/oauth2/default',
  aud: '0oa...',
  iat: 1523492708,
  exp: 1523496308,
  jti: 'ID.wv...',
  amr: [ 'pwd' ],
  idp: '00oe...',
  auth_time: 1523492708,
  at_hash: 'mM26M...',
  groups: [ 'Acme-Admin' ] }
```
