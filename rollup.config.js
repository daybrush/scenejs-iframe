
import builder from "@daybrush/builder";

export default builder([
    {
        name: "Iframe",
        input: "src/index.umd.ts",
        output: "./dist/iframe.js",
    },
    {
        name: "Iframe",
        input: "src/index.umd.ts",
        output: "./dist/iframe.min.js",
        uglify: true,

    },
    {
        name: "Iframe",
        input: "src/index.umd.ts",
        output: "./dist/iframe.pkgd.js",
        resolve: true,
    },
    {
        name: "Iframe",
        input: "src/index.umd.ts",
        output: "./dist/iframe.pkgd.min.js",
        resolve: true,
        uglify: true,
    },
    {
        input: "src/index.ts",
        output: "./dist/iframe.esm.js",
        exports: "named",
        format: "es",
    },
    {
        input: "src/index.ts",
        output: "./dist/iframe.cjs.js",
        exports: "named",
        format: "cjs",
    },
]);
