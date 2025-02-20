// views/sessionModalFactory.ts
import { isValidYearFormat } from "../utils";
import { domRefs } from ".";

export const sessionModalMethods = (function () {
	// defaults
	domRefs.sessionModal!.style.display = "none";
	domRefs.modalSubmitBtn!.disabled = true;

	const displayModal = function () {
		if (!domRefs.selectElem) return;
		const selectedOption =
			domRefs.selectElem.options[domRefs.selectElem.selectedIndex];

		if (selectedOption?.value === "addSession") {
			domRefs.sessionModal!.style.display = "block";
			console.log("loading modal.....");
		} else {
			domRefs.sessionModal!.style.display = "none";
			console.log(selectedOption, " is not modal activator");
		}
	};

	const updateModalUI = function () {
		const isValid = isValidYearFormat(domRefs.sessionModalInput);

		if (!isValid) {
			domRefs.modalHelp?.classList.add("red", "fw-bold", "fs-5");
		} else {
			domRefs.modalHelp?.classList.remove("red", "fw-bold", "fs-5");
		}
		domRefs.modalSubmitBtn!.disabled = !isValid;
	};

	const closeModalBtn = () => {
		domRefs.sessionModal!.style.display = "none";
		console.log("modal closed");
	};
	return {
		displayModal,
		updateModalUI,
		closeModalBtn,
	};
})();
