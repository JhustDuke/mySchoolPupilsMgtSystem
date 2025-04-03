import { addElemToDom, domUtils } from "../utils";
import { domRefs as domElements } from "./";
import naijaStates from "naija-state-local-government";

export const formMethods = (function (domRefs = domElements) {
	const loadFormDefaultState = function () {
		domRefs.formSubmitBtn!.disabled = true;
	};

	// Validate names (first, middle, last)
	const checkNameInput = function (input: HTMLInputElement) {
		const nameRegex = /^[A-Za-z\s-]+$/; // Allows letters, spaces, and hyphens
		const isValid = nameRegex.test(input.value.trim());

		if (!isValid) {
			addElemToDom({
				parentElem: input.parentElement, // Attach to input's parent
				typeOfElem: "span",
				textContent: "Input must be text with/out hyphen",
				elemAttributes: { class: "text-danger fw-small" },
				pluginFunc: showNameErrMsg,
			});
		}
	};

	// Delegate event for form validation
	const nameInputIsValid = function (e: Event) {
		const { firstnameInput, surnameInput, middlenameInput } = domRefs; // Destructure values from domRefs
		const elem = e.target as HTMLInputElement;
		if (!elem) return;

		if (
			elem === firstnameInput ||
			elem === surnameInput ||
			elem === middlenameInput
		) {
			checkNameInput(elem);
		}
	};

	return {
		loadFormDefaultState,
		nameInputIsValid,
	};
})();

function showNameErrMsg(
	parentElem: HTMLElement | undefined,
	newElem: HTMLElement | undefined
) {
	if (!parentElem || !newElem) return;

	// Ensure the error message appears properly
	parentElem.style.position = "relative";
	newElem.style.position = "absolute";
	newElem.style.top = "0";
	newElem.style.left = "50%";

	newElem.style.padding = "5px";

	// Remove after 5 seconds if not corrected
	setTimeout(() => {
		if (parentElem.contains(newElem)) {
			newElem.remove();
		}
	}, 3000);
}
