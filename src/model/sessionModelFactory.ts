import { domRefs } from "../view";

export const sessionModel = function () {
	const allSessions = new Set<string>();

	/** Loads all the sessions in the UI from the select tag options */
	const loadSessions = function (
		selectElem: HTMLSelectElement = domRefs.selectElem!
	) {
		if (!selectElem) return false;

		const selectTagOptions = selectElem.options;
		for (let i = 0; i < selectTagOptions.length; i++) {
			const optionValue = selectTagOptions[i].value.toLowerCase();
			if (optionValue !== "choose session") {
				allSessions.add(optionValue);
			}
		}
		return true;
	};

	/** Checks if a session already exists */
	const isDuplicateSession = function (sessionName: string): boolean {
		if (!sessionName) return false;
		//if a session already exist in the set
		if (allSessions.has(sessionName.toLowerCase())) {
			return true;
		}
		return false;
	};

	/** Adds a new session if it's not a duplicate */
	const addSession = function (sessionName: string): boolean {
		if (isDuplicateSession(sessionName) === false) {
			allSessions.add(sessionName.toLowerCase());

			return true;
		}
		return false;
	};

	return { loadSessions, isDuplicateSession, addSession };
};
