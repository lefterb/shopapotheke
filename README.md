# shopapotheke
For this challenge I focused more on the build and code development processes.
The entire codebase is written in Typescript and enforces specific coding standards by linting code as you save.

I wanted to save time on styling and pure UI related code in order to gain speed and implement more complex features.
Due to this, I used Material UI React library. In addition to this UI library I've also added Styled Components in order to control the custom designs that I may need to apply to existing Material UI Components. I wanted to avoid relying too much on Material's styling techniquies and semantics as I find it too specific for future developments of a project if it ever decides to remove Material UI from it's codebase. Keeping the styling as separate as possible (with minor limitations) we can use any custom css in potential other future UI libraries.

Tests have been written for specific functionality due to lack of time. I've tested the most complex sections of the code for which is harder to establish a proper mocked environment. I do not have a 100% test coverage, I have a "proof-of-concept" kind of test coverage.
While testing the components, again due to lack of time, I've went with a basic testing of actual content for the 2 main components: Table.tsx and Row.tsx

The reason for adding a BE layer is to control all the API requests from a single source of truth and not spread the calls throughout the FE project.
This is helpful for connecting to different services or API endpoints in the future. Another reason is to avoid getting 404 errors when accessing the SPA with a different path, e.g. localhost:5000/something-different-here

What I left out but would have loved to add:
- server-side rendering of the app
- dockerizing the app and run it in a docker container
- configure git pre-commit hooks so it lints, run tests and formats the staged files
- reach 80% or more test coverage


## Tech
I have decided to use the following tech stack (libraries,build tools,language, etc.)
* react
* redux
* redux-saga
* express
* nodemon
* webpack
* typescript
* jest
* enzyme
* eslint
* prettier
* material-ui
* styled-components

## Features
- React single page application, client side rendered
- uses Sagas for async data fetching from a controlled back-end, writen in Express JS
- fetches repositories from GitHub based on a given date, default is 7 days from current date
- filters: fetches repositories based on a selected language, via a dropdown
- filters: paginates the results so the user can see all the repositories created within the given timeframe and language
- saves stared repositories to localStorage

## Installation
To install all dependencies simply run `npm install`

## Build
To run the project in development mode run `npm run server:dev` and then open the url: [http://localhost:5000](http://localhost:5000)

To run the project in production mode (build the code and make it deployable) run `npm run app:start` and then open the url [http://localhost:5000](http://localhost:5000)