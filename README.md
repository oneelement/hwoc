## Notes on the task

I have added additional parts to the site to add some flavour and context but these parts are not fully functional i.e. mobile nav, destination pagination etc.

Some design decisions were taken with a view to this being built out as a complete site.  There are some instances where code is only used once but were put in a hook (useVote) for potential re-use and better readability.  I have also added Zustand as a state management solution (as I thought this fit the use case the best) but again it is only used once, however in a fully fledged application it would have more uses.

Some functionality is missing from the pages that were not in the requirements, i.e. removing folders, editing, changing your vote etc. These are features that would be added to a fully fledged project but were ommitted here due to time contraints.

I have mocked a logged in user so all folder/favourite DB records are linked to a user.  The user would be authenticated via cookie at a middleware level for all incoming api routes so have tried to keep the user logic roughly where it would take place in this scenario.  In reality there would not be a call to the DB for user as this would come from the decoded cookie token. 

I have also added a destinations page to allow the favourites to be amended.

## To run locally

Clone repo then install packages

```bash
npm i
```

Copy over .env.example to a new .env file (not very secure, but this is just a test after all :-))

Then run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To run tests

I have added tests for the hooks to give a flavour for testing, with the useVote containing the most logic that requires testing.  This could obviously be expanded to more files and key components in a real project.  I would also add a series of playwright/cypress end to end tests to have the biggest testing impact on a project like this.

```bash
npm run test
```

## Or alternatively view on Vercel

You can view this test at this link [https://holiwise-nu.vercel.app/](https://holiwise-nu.vercel.app/) on vercel.

