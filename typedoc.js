/*! Copyright (c) 2020 Siemens AG. Licensed under the MIT License. */

// Typedoc options (execute "npx typedoc --help")

module.exports = {

    // Can be used to prevent TypeDoc from cleaning the output directory specified with --out.
    cleanOutputDir: false,

    // Prevent externally resolved TypeScript files from being documented.
    excludeExternals: false,

    // Prevent private members from being included in the generated documentation.
    excludePrivate: true,

    // Ignores protected variables and methods
    excludeProtected: false,

    // Specifies the location to look for included documents.
    // Use [[include:FILENAME]] in comments.
    includes: "./",

    // Add the package version to the project name
    includeVersion: true,

    readme: "none",

    // Specifies the location the documentation should be written to.
    out: "docs/api/",

    // Specifies the entry points to be documented by TypeDoc. TypeDoc will
    // examine the exports of these files and create documentation according
    // to the exports.
    entryPoints: [`src/index.ts`],

};
