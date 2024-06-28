# FORMATION

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

1. Javascript 
  ```
  tp-00-basics 
  tp-00-promise
  tp-01-todolist-comments ([TP] TodoList items)
  ```
2. Node.js
  ```
  tp-02-nodejs-fs (FileSystem)
  tp-03-nodejs-srv (Server)
  tp-04-nodejs-childprocess
  tp-05-nodejs-fastify ([TP] Fastify, SQLite, Cookies & Session)
  ```
3. Typescript
  ```
  tp-06-typescript (Basics)
  ```
4. Vite 
  ```
  tp-07-vite-vanilla-js (Basics)
  tp-08-vite-react-dummy (Setup React with Vite)
  ```
5. React ([1/3] : Basics)
  ```
  tp-09-react (Basics)
  tp-10-react-fruits ([TP] Dynamique rendering / searchBar, range)
  tp-11-react-hook (useState useRef useEffect)
  tp-12-react-hook-custom (Custom hook)
  tp-13-react-memo-callback (useCallback)
  tp-14-react-portal (createPortal)
  tp-15-react-errors (ErrorBoundary)
  ```
6. React ([2/3] TP Blog / WebSite)
  ```
  tp-16-react-blog
  ```
7. Ruby (Basics)
  ```
  tp-17-ruby-basics
  ```

## Todo

- React ([3/3] Advance)
- Bootstrap / CSS

## Table of Contents

- [Installation](#installation)
- [License](#license)

## Installation

Navigate to the target tp-{number}-{subject} folder and execute the necessary NPM commands based on the project type, follow these steps:

1. Open your terminal or command prompt.
2. Change the directory to the target TP folder using the `cd` command. For example, if the TP folder is named "tp-target", you would run:
    ```
    cd tp-target
    ```

3. Once you are inside the TP folder, check the project type. If it is a JavaScript project, run the following command to install the required dependencies:
    ```
    npm install
    ```

    If it is a TypeScript project, run the following command instead:
    ```
    npm install --save-dev typescript
    ```

    If it is a Vite/React project, run the following command instead:
    ```
    npm init vite@latest
    npm install
    ```

4. After the dependencies are installed, you can proceed with running the project. Use the appropriate NPM command based on the project type:
    - For JavaScript projects:
      ```
      npm start
      ```

    - For TypeScript projects:
      ```
      npm run start:ts
      ```
    - For Vite/React projects:
      ```
      npm run dev
      ```

Remember to replace "tp-target" with the actual name of the TP folder and adjust the commands based on your specific project setup.

## License

This project is licensed under the [MIT License](LICENSE).
