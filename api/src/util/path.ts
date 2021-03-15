import path from "path";

const mainModule = require.main!;

export const rootDir = path.dirname(mainModule.filename);
