
import builder from "@daybrush/builder";

export default builder([
    {
        name: "IframeItem",
        input: "src/index.umd.ts",
        output: "./dist/iframe.js",
        external: {
            "scenejs": "Scene",
        },
        resolve: true,
    },
    {
        name: "IframeItem",
        input: "src/index.umd.ts",
        output: "./dist/iframe.min.js",
        external: {
            "scenejs": "Scene",
        },
        resolve: true,
        uglify: true,
    },
    {
        input: "src/index.ts",
        output: "./dist/iframe.esm.js",
        exports: "named",
        format: "es",
        external: {
            "scenejs": "Scene",
            "@daybrush/utils": "utils",
        },
    },
    {
        input: "src/index.ts",
        output: "./dist/iframe.cjs.js",
        exports: "named",
        format: "cjs",
        external: {
            "scenejs": "Scene",
            "@daybrush/utils": "utils",
        },
    },
]);
