import { build, emptyDir } from "jsr:@deno/dnt@0.41.3";

await emptyDir("./npm");

await Deno.writeTextFile(
  "./npm/tsconfig.json",
  JSON.stringify(
    {
      compilerOptions: {
        rootDir: ".", // statt "./src"
        outDir: "./dist",
        baseUrl: ".",
        // weitere Optionen...
      },
    },
    null,
    2,
  ),
);

await build({
  entryPoints: ["./src/index.ts"],
  typeCheck: "both",
  declaration: "inline",
  outDir: "./npm",
  shims: {
    deno: true,
  },
  test: false,
  package: {
    name: "itu-utils",
    rootDir: ".",
    version: Deno.args[0],
    description: "Utility types and functions for our projects",
    license: "MIT",
    repository: {
      type: "git",
      url:
        "git+https://github.com/Innovation-through-understanding/itu-utils.git",
    },
    bugs: {
      url:
        "https://github.com/Innovation-through-understanding/itu-utils/issues",
    },
    files: ["esm", "script", "src", "src/utilityTypes"],
    exclude: ["src/tests"],
    dependencies: {
      "@types/luxon": "^3.4.0",
      "luxon": "^3.5.0",
      "tsmonads": "^4.1.1",
      "rambda": "9.4.2",
      "zod": "^3.24.1",
    },
    exports: {
      ".": {
        "import": "./esm/index.js",
        "require": "./script/index.js",
      },
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
