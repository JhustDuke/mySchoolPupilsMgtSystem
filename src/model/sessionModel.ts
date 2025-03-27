import { isValidYearFormat } from "../utils";

export const sessionModel = function (
	databaseName: string = "amenDivineSessions"
) {
	const safeGetStorage = function (key: string) {
		try {
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error("Error reading localStorage:", error);
			return null;
		}
	};

	const safeSetStorage = function (key: string, value: object) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			console.error("Error writing to localStorage:", error);
			return false;
		}
	};

	const initSessions = function () {
		if (!safeGetStorage(databaseName)) {
			safeSetStorage(databaseName, {});
			console.log("amenDivineSessions inited");
			return;
		}
		console.log("db is already inited");
	};

	const loadSessionYears = function () {
		const sessionDb = safeGetStorage(databaseName);
		if (!sessionDb) {
			console.log("no session years available");
			return null;
		}
		const sessionYears = Object.keys(sessionDb);
		if (sessionYears.length === 0) {
			console.log("no session years available");
			return null;
		}
		return sessionYears;
	};

	const isDuplicate = function (sessionYear: string) {
		const sessionDb = safeGetStorage(databaseName);
		if (!sessionDb) {
			console.log(databaseName, "not found");
			return false;
		}
		if (!sessionDb[sessionYear]) {
			console.log("session does not exist");
			return false;
		}
		return true;
	};

	const addNewSessionYear = function (sessionYear: string) {
		const sessionDb = safeGetStorage(databaseName) || {};
		if (sessionDb[sessionYear]) {
			console.log("Session year already exists");
			return;
		}
		sessionDb[sessionYear] = {
			createdAt: new Date().toISOString(),
			meta: {},
		};
		if (safeSetStorage(databaseName, sessionDb)) {
			console.log("New session year added:", sessionYear);
		}
	};
	const getSessionYearData = function () {};

	initSessions();
	return { loadSessionYears, isDuplicate, addNewSessionYear };
};

// 	};

// 	/** Gets session data if it exists */
// 	const getSessionData = function (sessionYear: string): any {
// 		if (!isSessionYearExist(sessionYear)) {
// 			console.log(`Session year ${sessionYear} does not exist.`);
// 			return null;
// 		}
