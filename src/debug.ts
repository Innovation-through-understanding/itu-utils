// deno-lint-ignore-file no-process-globals

const getProcessEnv = () => {
    try {
        // @ts-ignore - process könnte undefined sein
        return typeof process !== "undefined" ? process.env : undefined;
    } catch {
        return undefined;
    }
};

const getDenoEnv = () => {
    try {
        // @ts-ignore - Deno könnte undefined sein
        return typeof Deno !== "undefined" ? Deno.env : undefined;
    } catch {
        return undefined;
    }
};

const getImportMetaEnv = () => {
    try {
        // @ts-ignore - import.meta könnte undefined sein
        return typeof import.meta !== "undefined" ? import.meta.env : undefined;
    } catch {
        return undefined;
    }
};

const processEnv = getProcessEnv();
const denoEnv = getDenoEnv();
const importMetaEnv = getImportMetaEnv();

function isDevelopmentOrTesting(): boolean {
    if (processEnv) {
        if (
            processEnv.JEST_WORKER_ID !== undefined ||
            processEnv.NODE_TEST_CONTEXT !== undefined ||
            processEnv.NODE_ENV === "test" ||
            processEnv.VITEST !== undefined ||
            processEnv.MOCHA === "true" ||
            processEnv.AVA_PATH !== undefined
        ) {
            return true;
        }
    }

    if (denoEnv) {
        if (denoEnv.get("DENO_TESTING") === "true") {
            return true;
        }
        const denoEnvironment = denoEnv.get("DENO_ENV");
        if (
            denoEnvironment === "development" || denoEnvironment === "dev" ||
            !denoEnvironment
        ) {
            return true;
        }
    }

    if (importMetaEnv) {
        console.log("VITE");
        if (importMetaEnv.TEST === true) {
            return true;
        }
        if (importMetaEnv.DEV === true) {
            return true;
        }
    }

    if (processEnv) {
        if (
            processEnv.NODE_ENV === "development" ||
            processEnv.NODE_ENV === "dev"
        ) {
            return true;
        }
    }

    return false;
}

/**
 * Add debug output to a data expression
 * @param data expression
 * @param message debug message
 * @returns expression
 */
export const debug = <T>(data: T, message?: string): T => {
    if (isDevelopmentOrTesting()) console.debug(message ?? "", data);
    return data;
};
