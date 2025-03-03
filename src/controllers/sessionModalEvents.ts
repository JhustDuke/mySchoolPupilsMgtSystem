import { sessionModalMethods } from "../view";
import { domRefs } from "../view";
export const sessionModalEvents = (function () {
	domRefs.selectElem!.addEventListener("click", sessionModalMethods.watchModal);

	domRefs.sessionModalInput!.addEventListener(
		"input",
		sessionModalMethods.updateModalUI
	);

	domRefs.closeModalBtn!.addEventListener(
		"click",
		sessionModalMethods.closeModalBtn
	);
	domRefs.modalSubmitBtn?.addEventListener(
		"click",
		sessionModalMethods.addNewOptionTag
	);
})();
