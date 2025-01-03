# Video Watch Player

This project is a simple video watch player built with Next.js, TailwindCSS, Shadcn UI, tRPC and React Player. It allows users to view a list of videos and interact with them, including watching and liking the videos.

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
[Typescript Docs](https://www.typescriptlang.org/)
- **react-player**: A React component for playing a variety of URLs.
[react-player Docs](https://github.com/CookPete/react-player/)

## How it Works

### Video Player 
The React Player component in this project is configured to play `.mp4` video files.

For supporting other video formats, please refer to the [React Player documentation](https://github.com/CookPete/react-player/) for configuration details.

### Datas
The video data, including video details such as title, description, and URL, is stored in a **JSON file** located at `data/videos.json`. The structure of each video entry looks like this:
[
  {
    "id": "",
    "slug": "",
    "thumbnail": "",
    "title": "",
    "description": ".",
    "url": "",
    "watchCount": 0,
    "likeCount": 0,
    "likedBy": []
  }
]

**Please note**: The video data, including the `likedBy` list and session tokens, is used for testing purposes. While the data persists across sessions due to the use of **fs-extra** for file system operations, it is still fake and not meant for production environments.

- The session management system is only a mockup for the purpose of a test and should not be considered a production-ready solution.
- For production applications, it is highly recommended to use a **proper database** (such as PostgreSQL, MongoDB, etc.) for storing video data and user sessions, and implement secure session management using solutions like **next-auth**.
- User IDs and session tokens should never be stored in plaintext or in the frontend in real applications.


### Handling Video Views
The view count is updated when a user watches more than **50%** of the video. This logic is implemented in the custom hook `useVideoPlayer.ts` using the `handleProgress` function.

### Like System and Session Management

The like system is managed using a **session token** that persists for **10 years**. Each user can like or unlike a video, and the liked status is stored in the `likedBy` array within the JSON file.

- **Session Handling**: The token is stored and managed in a dedicated session file (`actions/session.ts`).
- **Context with TRPC**: It is also possible to manage the session using the **TRPC context** to handle server-side data fetching and improve the overall integration with your application's backend.
- **Recommendation**: While this implementation uses a long-lasting token for simplicity, it is highly recommended to utilize a database and a proper session management system, such as **next-auth**, to ensure better scalability and security.

This approach simplifies session handling for the current scope of the application while leaving room for more robust solutions in the future.


### Caching with React Query

The app uses **React Query** for caching API responses related to **view counts** and **like counts**, improving performance by reducing unnecessary requests and enhancing the user experience. Caching is implemented through the `useVideoViews` and `useVideoLike` hooks, ensuring smoother interactions and avoiding delays caused by frequent API calls. While `invalidateQueries` is used to refresh data when view or like counts change, it can increase server load and lead to over-fetching if not carefully managed. Despite this, it's chosen to provide real-time updates and an optimal user experience without page reloads.

### File System Operations with fs-extra
To read and update the video data, the app uses fs-extra, a module that simplifies working with the file system. This module is used to read the videos.json file and write updates back to it whenever a user's like or view count is updated.

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
