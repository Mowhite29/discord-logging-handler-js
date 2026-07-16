# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-10-30

### Added

- Development mode. Using the string 'dev' in place of the webhook at initialisation will prevent the Discord log from firing.
- Updated README with usage, examples and instructions for Discord webhook configuration.
- Badge updates to reflect npm downloads, version and license.

## [1.2.1] - 2025-10-31

### Added

- Typescript type declarations included (`index.d.ts`) for better integration in TS projects.

### Fixed

- Minor typo fixes in README.

## [1.2.2] - 2025-10-31

### Added

- Typescript type declarations now support legacy syntax too.

## [1.2.3] - 2025-10-31

### Fixed

- Handling of options when Typescript object style is used.

## [1.2.4] - 2025-10-31

### Added

- Handling of non-standard errors such as strings, variables and objects.

## [1.2.5] - 2026-06-04

### Added

- Update to Axios dependancy version.

## [1.3.0] - 2026-06-08

### Added

- Added option for logs to console in dev mode.
- Added specific methods for each log level.

## [2.0.0] - 2026-07-16

### Breaking changes

- Migrated package to TypeScript.
- Added native ESM and CommonJS support.
- Updated CommonJS import style:

    Before:

    ```javascript
    const DiscordLog = require("discord-logging-handler");
    ```

    After:

    ```javascript
    const { DiscordLog } = require("discord-logging-handler");
    ```

- Added generated TypeScript declarations.
- Logger initialisation now requires object style entry of minimum log level:

    ```javascript
    const logger = new DiscordLog('WEBHOOKURL', { level: 'LEVEL' });
    ```

- Calls of log now require a logging level when `error` is used:

    ```javascript
    logInstance.log('Message', 'LEVEL', error)
    ```

    Remains optional when no `error` is set and still defaults to '`INFO'`.

    ```javascript
    logInstance.log('Message')
    ```

### Fixes

- ERR_REQUIRE_ESM compatibility issues.

## [2.0.1] - 2026-07-16

### Fixes

- Error typing.

## [2.0.2] - 2026-07-16

### Fixes

- Restored fire-and-forget logging behaviour for public logging methods.
- Improved compatibility with ESLint's `no-floating-promises` rule.
- No code changes required for existing users using `logger.info()`, `logger.error()`, etc.
