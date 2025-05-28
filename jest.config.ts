import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!swiper|ssr-window|dom7)"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/helpers/(.*)$": "<rootDir>/helpers/$1",
    "^@/context/(.*)$": "<rootDir>/context/$1",
    "^@/constants$": "<rootDir>/constants/index.tsx",
    "^@/utils/(.*)$": "<rootDir>/utils/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/api/(.*)$": "<rootDir>/api/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
  },
};

export default createJestConfig(config);
