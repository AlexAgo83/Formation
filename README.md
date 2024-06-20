# FORMATION

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

- Javascript Basics
- Javascript Promise
- [TP] TodoList
- Node.js Basics
- Node.js FileSystem
- Node.js Server / ChildProcess
- Node.js Fastify
- [TP] TodoList avec Bdd (Persistance) et Fastify (static / cookies / session)
- Typescript Basics
- Vite 'Build tool'
- React Basics
- [TP] Panier de fruit / Rendering dynamique SearchBar / InStock / Price - range
- React Hook
- React Memo & useCallback
- React Portal
- React ErrorBoundary

TODO:
- Bootstrap / CSS

## Table of Contents

- [Installation](#installation)
- [License](#license)

## Installation

Navigate to the target TP folder and execute the necessary NPM commands based on the project type, follow these steps:

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
