import { sessionModalMethods as ssMethods } from "../view";
import { domRefs } from "../view";

const sessionModalMethods = ssMethods(domRefs);

export const sessionModalEvents = (function () {
	const modalSelectElem = domRefs.selectElem;
	const userInputs = domRefs.sessionModalInput;
	const modalSubmitBtn = domRefs.modalSubmitBtn;
	const closeModalIcon = domRefs.closeModalBtn;

	modalSelectElem!.addEventListener("click", sessionModalMethods.watchModal);

	userInputs!.addEventListener("input", sessionModalMethods.updateModalUI);

	closeModalIcon!.addEventListener("click", sessionModalMethods.hideModal);
	modalSubmitBtn?.addEventListener("click", sessionModalMethods.addNewSession);
})();
