# Video Watch Player

This project is a simple video watch player built with Next.js, TailwindCSS, Shadcn UI, and tRPC. It allows users to view a list of videos and interact with them, including watching and liking the videos.

## Technologies Used

- **Next.js 15**: A React framework for building static and server-rendered applications.
  [Next.js Docs](https://nextjs.org/docs)
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
  [Tailwind Docs](https://tailwindcss.com/)
- **Shadcn UI**: A utility-first CSS framework for modern UI interfaces.
  [Shadcn Docs](https://ui.shadcn.com/)
- **tRPC**: A framework for building end-to-end typesafe APIs.
  [tRPC Docs](https://trpc.io/)
- **Typescript**: A superset of JavaScript that adds static typing.


## Setup Instructions
To get started with the Video Watch Player app, follow the instructions below.

## Prerequisites
Node.js (v16 or higher)
npm or yarn (package manager)

## Clone the Repository
First, clone the repository to your local machine:

git clone https://github.com/EloiGry/video-player.git
cd video-player

## Install Dependencies 
Run the following command to install the required dependencies:

npm install
or if you're using yarn:

yarn install

## Run the Application locally
To start the development server, use the following command:

npm run dev

or if you're using yarn:

yarn dev
This will start the app at http://localhost:3000. Open this URL in your browser to see the app in action.


## Test the API calls

To test the tRPC API calls, you can use **tRPC Playground**.
To simplify testing tRPC methods, you can use **tRPC Playground**, which provides a graphical interface for testing your tRPC API calls.

    1. First, install `trpc-playground`:
        npm install trpc-playground

    2. Follow the [tRPC Playground documentation](https://github.com/trpc/trpc-playground) to set up and use the playground. It allows you to interactively test your tRPC API by providing a UI for making API calls and viewing responses.

## Run the Application in Production Mode 
To run the application in production mode, build it first and then start it:

npm run build
npm start

or with yarn:

yarn build
yarn start
