import { domRefs as domElements } from "./";

export const formMethods = (function (domRefs = domElements) {
	console.log("formMethods ran");

	// Validate names (first, middle, last)
	const validateNames = function (input: HTMLInputElement): boolean {
		const nameRegex = /^[A-Za-z\s-]+$/; // Allows letters, spaces, and hyphens
		return nameRegex.test(input.value.trim());
	};

	// Initialize form state
	const loadFormDefaultState = function () {
		domRefs.formSubmitBtn!.disabled = true;
	};

	return {
		loadFormDefaultState,
		validateNames,
	};
})();
