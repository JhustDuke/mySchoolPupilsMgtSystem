import { addElemToDom, showErrMsg } from "./";
export const validatePhoneField = function ({
	inputElem,
	fieldKey,
	elementStates,
}: {
	inputElem: HTMLInputElement | any;
	fieldKey: keyof typeof elementStates;
	elementStates: Record<string, boolean>;
}) {
	const phoneRegex = /^\d{11}$/;
	const isValid = phoneRegex.test(inputElem.value.trim());

	if (!isValid) {
		addElemToDom({
			parentElem: inputElem.parentElement!,
			typeOfElem: "span",
			textContent: "Invalid phone number",
			elemAttributes: { class: "text-danger mt-1" },
			pluginFunc: showErrMsg,
		});
		elementStates[fieldKey] = false;
	} else {
		elementStates[fieldKey] = true;
	}
};
