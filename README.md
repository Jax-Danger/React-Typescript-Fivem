Certainly! Here's the entire `README.md` content formatted in markdown, including all sections and steps:

# MainPower-Plate

## Installation

To install and set up the project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd MainPower-Plate

    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

    This will install both the main project dependencies and the dependencies for the `web` package located in the `web/` directory.

## Project Structure

The project consists of the following main parts:

-   **Root (`./`):** Contains the main project configuration (`package.json`), scripts for building (`scripts/build.js`), and development (`scripts/dev.js`).

-   **Web (`./web`):** Contains a frontend web application configured with Vite for development and production builds. This directory also includes its own `package.json` specifying frontend dependencies and build scripts.

## Usage

### Development

Install all dependencys of the project

```bash
npm i
```

To start development mode for both the backend and frontend:

```bash
npm run dev
```

This command starts backend development with `node ./dev.js` and watches frontend changes with `vite` in the `web/` directory.

#### This will refresh ui and resources on save and work as a build!

### Ui Web

Opens ui via web to edit easier!

```bash
npm run web
```

### Building

To build the project for production:

```bash
npm run build
```

This command builds TypeScript files (`tsc`) and then uses `vite` to bundle the frontend application for production.
