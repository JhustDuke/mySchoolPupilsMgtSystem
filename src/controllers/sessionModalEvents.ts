import { sessionModalMethods } from "../view";
import { domRefs } from "../view";
export const sessionModalEvents = (function () {
	domRefs.selectElem!.addEventListener(
		"click",
		sessionModalMethods.displayModal
	);
	domRefs.sessionModalInput!.addEventListener(
		"input",
		sessionModalMethods.updateModalUI
	);
	domRefs.closeModalBtn!.addEventListener(
		"click",
		sessionModalMethods.closeModalBtn
	);
})();
