import { addElemToDom, showErrMsg } from ".";

export const validateAddressField = function ({
	inputElem,
	fieldKey,
	elementStates,
	errMsg = "Address must be at least 10 characters long",
}: {
	inputElem: HTMLInputElement | HTMLTextAreaElement;
	fieldKey: keyof typeof elementStates;
	elementStates: Record<string, boolean>;
	errMsg?: string;
}) {
	const input = inputElem.value.trim();
	const isValid = input.length >= 10;

	if (!isValid) {
		addElemToDom({
			parentElem: inputElem.parentElement!,
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
