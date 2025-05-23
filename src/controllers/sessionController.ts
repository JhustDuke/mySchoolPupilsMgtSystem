import { sessionModalMethods } from "../view";
import { domRefs } from "../view";

export const sessionModalController = (function () {
	const modalSelectElem = domRefs.selectElem;
	const userInputs = domRefs.sessionModalInput;
	const modalSubmitBtn = domRefs.modalSubmitBtn;
	const closeModalIcon = domRefs.closeModalBtn;

	// load default state
	sessionModalMethods.DOMDefaultState();

	modalSelectElem!.addEventListener("click", sessionModalMethods.watchModal);

	// modal input field
	userInputs!.addEventListener("input", sessionModalMethods.updateModalUI);

	closeModalIcon!.addEventListener("click", sessionModalMethods.hideModal);
	modalSubmitBtn?.addEventListener("click", sessionModalMethods.addNewSession);
})();
