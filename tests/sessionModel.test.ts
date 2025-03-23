import { describe, beforeEach, it, expect } from "@jest/globals";
import { sessionModel as sessionModelMock } from "../src/model";

// LocalStorage Mock
const localStorageMock = (function () {
	let store: Record<string, string> = {};

	const getItem = function (key: string): string | null {
		return store[key] || null;
	};

	const setItem = function (key: string, value: string): void {
		store[key] = value;
	};

	const removeItem = function (key: string): void {
		delete store[key];
	};

	const clear = function (): void {
		store = {};
	};

	return { getItem, setItem, removeItem, clear };
})();

// Storage JSON Helper
const storageJSON = {
	get: function (key: string): any {
		const data = localStorageMock.getItem(key);
		return data ? JSON.parse(data) : null;
	},

	set: function (key: string, value: any): void {
		localStorageMock.setItem(key, JSON.stringify(value));
	},
};

// Tests
describe("sessionModel", function () {
	let sessionModel: ReturnType<typeof sessionModelMock>;

	beforeEach(function () {
		Object.defineProperty(global, "localStorage", {
			value: localStorageMock,
			writable: true,
		});

		localStorageMock.clear();
		sessionModel = sessionModelMock();
	});

	it("should add a session year", function () {
		expect(sessionModel.addSession("2024/2025")).toBe(true);
		expect(storageJSON.get("amenDivineSessions")).toEqual({
			"2024/2025": { classes: {} },
		});
	});

	it("should check if a session year exists", function () {
		storageJSON.set("amenDivineSessions", { "2024/2025": { classes: {} } });
		expect(sessionModel.isSessionYearExist("2024/2025")).toBe(true);
		expect(sessionModel.isSessionYearExist("2023/2024")).toBe(false);
	});

	it("should get session data", function () {
		storageJSON.set("amenDivineSessions", {
			"2024/2025": { classes: { class1: "value" } },
		});
		expect(sessionModel.getSessionData("2024/2025")).toEqual({
			classes: { class1: "value" },
		});
		expect(sessionModel.getSessionData("2023/2024")).toBe(null);
	});

	it("should load sessions", function () {
		storageJSON.set("amenDivineSessions", {
			"2024/2025": { classes: { class1: "value" } },
		});
		expect(sessionModel.loadSessions()).toBe(true);
	});
});
