import { isValidYearFormat } from "../utils";

export const sessionModel = function () {
	const allSessions = new Set<string>();

	/** Loads all the sessions in the UI from the select tag options */
	const loadSessions = function (): boolean {
		const storedAmenSessions = localStorage.getItem("amenDivineSessions");
		if (!storedAmenSessions) {
			console.log("No sessions found in localStorage.");
			return false;
		}

		try {
			const amenDivineSessionsData = JSON.parse(storedAmenSessions);
			if (
				!amenDivineSessionsData ||
				typeof amenDivineSessionsData !== "object"
			) {
				console.log("Invalid session data format.");
				return false;
			}

			Object.keys(amenDivineSessionsData).forEach((sessionYear) => {
				if (amenDivineSessionsData[sessionYear]?.classes) {
					allSessions.add(sessionYear.toLowerCase());
				}
			});

			console.log("Sessions loaded successfully.");
			return true;
		} catch (error) {
			console.error("Error parsing session data:", error);
			return false;
		}
	};

	/** Checks if a session year already exists */
	const isSessionYearExist = function (sessionYear: string): boolean {
		if (!isValidYearFormat(sessionYear)) {
			console.log(`Invalid year format: ${sessionYear}`);
			return false;
		}

		const storedAmenSessions = localStorage.getItem("amenDivineSessions");
		if (!storedAmenSessions) {
			console.log(
				`No sessions found. Cannot check existence for ${sessionYear}`
			);
			return false;
		}

		try {
			const amenDivineSessionsData = JSON.parse(storedAmenSessions);
			if (typeof amenDivineSessionsData !== "object") {
				console.log("Invalid session data format.");
				return false;
			}

			const exists = sessionYear in amenDivineSessionsData;
			console.log(
				`Session year ${sessionYear} ${exists ? "exists" : "does not exist"}.`
			);
			return exists;
		} catch (error) {
			console.error("Error checking session existence:", error);
			return false;
		}
	};

	/** Gets session data if it exists */
	const getSessionData = function (sessionYear: string): any {
		if (!isSessionYearExist(sessionYear)) {
			console.log(`Session year ${sessionYear} does not exist.`);
			return null;
		}

		const storedAmenSessions = localStorage.getItem("amenDivineSessions");
		if (!storedAmenSessions) return null;

		try {
			const amenDivineSessionsData = JSON.parse(storedAmenSessions);
			console.log(`Retrieved session data for ${sessionYear}.`);
			return amenDivineSessionsData[sessionYear] || null;
		} catch (error) {
			console.error("Error retrieving session data:", error);
			return null;
		}
	};

	/** Adds a new session if it's not a duplicate */
	const addSession = function (sessionYear: string): boolean {
		if (!isValidYearFormat(sessionYear)) {
			console.log(`Invalid session year format: ${sessionYear}`);
			return false;
		}

		if (isSessionYearExist(sessionYear)) {
			console.log(`Session year ${sessionYear} already exists.`);
			return false;
		}

		const storedAmenSessions = localStorage.getItem("amenDivineSessions");
		let amenDivineSessionsData: Record<string, any> = storedAmenSessions
			? JSON.parse(storedAmenSessions)
			: {};

		if (typeof amenDivineSessionsData !== "object") {
			console.log("Invalid session storage format.");
			return false;
		}

		// Add new session structure
		amenDivineSessionsData[sessionYear] = { classes: {} };

		try {
			localStorage.setItem(
				"amenDivineSessions",
				JSON.stringify(amenDivineSessionsData)
			);
			console.log(`Successfully added session year: ${sessionYear}`);
			return true;
		} catch (error) {
			console.error("Error saving new session:", error);
			return false;
		}
	};

	return { loadSessions, isSessionYearExist, getSessionData, addSession };
};
