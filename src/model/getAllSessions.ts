import { domRefs } from "../view";

export const sessionModel = (function () {
	const allSessions = new Set<string>();

	const loadSessions = function () {
		const selectTagOptions = domRefs.selectElem!.options;
		for (let i = 0; i < selectTagOptions.length; i++) {
			const optionValue = selectTagOptions[i].value.toLowerCase();
			if (optionValue !== "choose session") {
				allSessions.add(optionValue);
			}
		}
		console.log("sessionModel.loadSessions init");
	};

	const isDuplicateSession = function (sessionName: string): boolean {
		console.log("sessionModel.isDuplicate session ran");
		if (!sessionName) return false;
		return allSessions.has(sessionName!.toLowerCase());
	};

	const addSession = function (sessionName: string): boolean {
		if (!isDuplicateSession(sessionName)) {
			allSessions.add(sessionName.toLowerCase());
			console.log("sessionModel.addSession init");
			return true;
		}
		return false;
	};

	return { loadSessions, isDuplicateSession, addSession };
})();

/**
 * WHAT DO I WANT
 * i want all the sessions to be unique
 * so when the user times in the same session twice it gets an error
 * i need a set to store all the sessions firstly
 * the sessions would be gotten form the options value
 * and if any option value has the name choose session it skips and moves to the next
 * then every value it has it adds it to a set
 * the function needs to get all inputs onloadwhat
 */
