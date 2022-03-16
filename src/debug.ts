/**
 * Add debug output to a data expressionde
 * @param data expression
 * @param message debug message
 * @returns expression
 */
export const debug = <T>(data: T, message?: string): T => {
    console.debug(message ?? "", data);
    return data;
};
