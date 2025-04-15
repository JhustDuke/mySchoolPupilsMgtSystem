// formUtils.ts
import { addElemToDom } from ".";
import { naijaService } from "../services";

export const populateStates = function (selectElem: HTMLSelectElement) {
	const states = naijaService.getStates();
	states.forEach(function (state) {
		addElemToDom({
			parentElem: selectElem,
			typeOfElem: "option",
			textContent: state,
			elemAttributes: { value: state },
		});
	});
};

export const resetLgaSelect = function (selectElem: HTMLSelectElement) {
	selectElem.innerHTML = "";
	addElemToDom({
		parentElem: selectElem,
		typeOfElem: "option",
		textContent: "Choose LGA",
		elemAttributes: { value: "choose LGA", disabled: true },
	});
};
