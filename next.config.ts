import type { NextConfig } from "next";
// Delegate to the canonical JS config to prevent divergence
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsConfig = require("./next.config.js");
export default jsConfig as NextConfig;
