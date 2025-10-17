import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src", "./test"],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",  // let ts-jest handle TypeScript + ESM
  },
  moduleFileExtensions: ["ts", "js", "tsx", "jsx", "json", "node"],
};

export default config;
