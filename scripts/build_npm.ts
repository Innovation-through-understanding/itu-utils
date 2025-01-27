import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/index.ts"],
  typeCheck: "both",
  declaration: "inline",
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "tsmonads",
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
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
