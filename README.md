Certainly! Here’s a README section that explains each script in your `package.json`:

---

## Scripts Overview

This project uses several npm scripts to manage development, building, and package installation processes. Below is a description of each script and its purpose.

### Scripts

#### `build`

```sh
npm run build
```

Runs the build process for the project.

-   **Description**: Executes the `scripts/build.js` file using Node.js.
-   **Purpose**: This script is used to build the project, typically for production.

#### `dev`

```sh
npm run dev
```

Runs the development environment.

-   **Description**: Uses `concurrently` to run two commands simultaneously:
    -   `node scripts/dev.js`: Starts the development server or any other development-specific scripts.
    -   `cd web && yarn build --watch`: Changes directory to `web` and runs `yarn build` in watch mode.
-   **Purpose**: This script is used to start the development environment, allowing for live reloading and other development conveniences.

#### `postinstall`

```sh
npm run postinstall
```

Runs after the `npm install` command.

-   **Description**: Changes directory to `web` and runs `yarn install` to install dependencies for the `web` project.
-   **Purpose**: This script ensures that the `web` project has its dependencies installed after the main project’s dependencies are installed.

#### `webI`

```sh
npm run webI <package_name>
```

Installs a specified package in the `web` directory.

-   **Description**: Changes directory to `web` and runs `yarn add` followed by the specified package name(s).
-   **Usage**:
    -   To install a single package: `npm run webI package_name`
    -   To install multiple packages: `npm run webI package_name1 package_name2`
-   **Purpose**: This script provides a convenient way to add new packages to the `web` project from the root directory.

### Example Usage

1. **Building the Project**

    To build the project, run:

    ```sh
    npm run build
    ```

2. **Starting the Development Environment**

    To start the development environment, run:

    ```sh
    npm run dev
    ```

3. **Post-Installation Dependencies**

    After installing the main project dependencies with:

    ```sh
    npm install
    ```

    The `postinstall` script will automatically run, installing the `web` project dependencies.

4. **Installing Packages in `web`**

    To install a package in the `web` directory, run:

    ```sh
    npm run webI <package_name>
    ```

    For example, to install `lodash`:

    ```sh
    npm run webI lodash
    ```

    To install multiple packages, list them separated by spaces:

    ```sh
    npm run webI lodash axios
    ```

---

Feel free to include this section in your README file to help others understand and use the scripts effectively.
