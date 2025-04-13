import { addElemToDom, showErrMsg } from "./";

export const validateSelectField = function ({
	selectElem,
	fieldKey,
	elementStates,
	invalidValue,
	errorMsg,
}: {
	selectElem: HTMLSelectElement;
	fieldKey: keyof typeof elementStates;
	elementStates: Record<string, boolean>;
	invalidValue: string;
	errorMsg: string;
}) {
	const value = selectElem.value.trim();

	if (!value || value === invalidValue) {
		addElemToDom({
			parentElem: selectElem.parentElement!,
			typeOfElem: "span",
			textContent: errorMsg,
			elemAttributes: { class: "text-danger mt-1" },
			pluginFunc: showErrMsg,
		});
		elementStates[fieldKey] = false;
	} else {
		elementStates[fieldKey] = true;
	}
};
