const { execSync } = require('child_process');

console.log("Running incremental unit tests prior to push");

const debug = process.argv.includes("--debug");

const dbg = (expr, log = "") => {
    if (!debug) {
        return expr;
    }
    console.debug(log, expr);
    return expr;
};

const getBranch = () => {
    const branches = execSync("git branch").toString().split("\n").map(s => s.trim());
    const branch = branches.find(b => b.startsWith("*"));
    return dbg(branch.slice(1).trim(), "getBranch()");
}

const getDiff = (branch) => {
    try {
        const result = execSync(`git diff --name-only remotes/origin/${branch}`, {stdio: [null]}).toString().split("\n").filter(s => s.includes(".ts")).join(" ");
        return dbg(result, "getDiff()");
    } catch {
        // Branch wasn't pushed yet
        const result = execSync(`git diff --name-only remotes/origin/master`).toString().split("\n").filter(s => s.includes(".ts")).join(" ");
        return dbg(result, "getDiff()");
    }
}

const findTests = (files) => {
    if (files.trim() === "") {
        dbg("No tests for changed files found", "findTests()");
        return "";
    }
    const result = execSync(`jest --listTests --findRelatedTests ${files}`, {cwd: "../"}).toString();
    return dbg(result.replace(/\n/g, " ").trim(), "findTests()");
}

const runTests = (testFiles) => {
    if (testFiles === "") {
        console.log("No tests found");
        process.exit(0);
    }
    try {
        const result = execSync(`jest --watchAll=false --passWithNoTests ${testFiles}`).toString();
        if (result.includes("No tests")) {
            console.log("No tests for changed files found");
        }
        dbg(result, "runTests()");
    } catch {
        process.exit(1);
    }
}

runTests(findTests(getDiff(getBranch())));
