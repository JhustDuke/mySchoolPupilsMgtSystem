import {
	addElemToDom as addToSelectOption,
	domUtils as modalUtils,
} from "../utils";
import { domRefs as domElements, domValues } from ".";
import { sessionModel as ssModel } from "../model";

export const tableMethods = (function (
	domRefs = domElements
	//sessionModel = ssModel()
) {
	const tableDefaultState = function () {
		const mainTable = domRefs.mainTable;
		if (!mainTable) {
			console.log("mainTable not found");
			return;
		} //disable table
		modalUtils.toggleVisibility({ targetElem: mainTable });
	};
	const displayTable = function () {
		/**this will need the select elem
		 * will listen for events on anything that does have the name choose session or addSession
		 * displays a table
		 *
		 */

		const selectElem = domRefs.selectElem;
		const mainTable = domRefs.mainTable;
		if (!selectElem) {
			console.log("selectElem not found");
			return;
		}

		const selectedOption = selectElem.options[selectElem.selectedIndex];
		if (!selectedOption) {
			console.log("selectedOption not found");
			return;
		}

		if (
			selectedOption.value === domValues.chooseSession ||
			selectedOption.value === domValues.addSession
		) {
			mainTable!.style.display = "block";
			return;
		} else {
			mainTable!.style.display = "block";
		}
	};
	return {
		tableDefaultState,
		displayTable,
	};
})();
/**
 * when the option year is clicked
 * it displays a table
 * this table is gotten from the db
 * a
 */
