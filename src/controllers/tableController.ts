import { tableMethods } from "../view";
import { domRefs } from "../view";

export const tableController = (function () {
	const selectElem = domRefs.selectElem;

	tableMethods.tableDefaultState();

	selectElem?.addEventListener("change", tableMethods.displayTable);
})();
