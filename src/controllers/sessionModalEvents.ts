import { sessionModalMethods as ssMethods } from "../view";
import { domRefs } from "../view";

const sessionModalMethods = ssMethods(domRefs);

export const sessionModalEvents = (function () {
	domRefs.selectElem!.addEventListener("click", sessionModalMethods.watchModal);

	domRefs.sessionModalInput!.addEventListener(
		"input",
		sessionModalMethods.updateModalUI
	);

	domRefs.closeModalBtn!.addEventListener(
		"click",
		sessionModalMethods.hideModal
	);
	domRefs.modalSubmitBtn?.addEventListener(
		"click",
		sessionModalMethods.addNewOptionTag
	);
})();
