import { showErrMsg, addElemToDom } from "./";
export const validateNameField = function ({
	inputElem,
	fieldKey,
	elementStates,
	errMsg = "Input must be text with/out hyphen",
}: {
	inputElem: HTMLInputElement | HTMLTextAreaElement;
	fieldKey: keyof typeof elementStates;
	elementStates: Record<string, boolean>;
	errMsg?: string;
}) {
	const nameRegex = /^[A-Za-z\s-]+$/;
	const input = inputElem.value;
	const isValid = nameRegex.test(input.trim());

	if (!isValid) {
		addElemToDom({
			parentElem: inputElem.parentElement,
			typeOfElem: "span",
			textContent: errMsg,
			elemAttributes: { class: "text-danger fw-small" },
			pluginFunc: showErrMsg,
		});
		elementStates[fieldKey] = false;
	} else {
		elementStates[fieldKey] = true;
	}
};
