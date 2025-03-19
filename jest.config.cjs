/** @type {import('jest').Config} */

const config = {
	cache: true,
	onlyChanged: true,
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",

	testMatch: ["<rootDir>/tests/**/*.test.ts"],
	collectCoverage: false,
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
};

module.exports = config;
