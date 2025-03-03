// views/sessionModalFactory.ts
import { isValidYearFormat, addElemToDom as addToSelectOption } from "../utils";
import { domRefs } from ".";
import { sessionModel } from "../model";

export const sessionModalMethods = (function () {
	// defaults
	domRefs.sessionModal!.style.display = "none";
	domRefs.modalSubmitBtn!.disabled = true;
	sessionModel.loadSessions();

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
		const sessionName = domRefs.sessionModalInput?.value.trim();
		console.log("this is ssnam", sessionName);
		const isValid = isValidYearFormat(sessionName as string);
		const btn = domRefs.modalSubmitBtn;
		const modalHint = domRefs.modalHelp;

		if (!isValid) {
			modalHint?.classList.add("red", "fw-bold", "fs-5");
		} else {
			modalHint?.classList.remove("red", "fw-bold", "fs-5");
		}

		if (sessionModel?.isDuplicateSession(sessionName as any)) {
			modalHint!.textContent = "this session year already exist";
			modalHint?.classList.add("red", "fw-bold", "fs-5");
			btn!.disabled = true;
			return;
		}
		btn!.disabled = !isValid;
		// adds a new option tag to the select
	};

	const watchModal = function () {
		sessionModalMethods.displayModal();
		sessionModalMethods.updateModalUI();
	};
	const closeModalBtn = () => {
		domRefs.sessionModal!.style.display = "none";
		console.log("modal closed");
	};
	const hideModal = function () {
		domRefs.sessionModal!.style.display = "none";
	};
	const clearModalInputs = function () {
		domRefs.sessionModalInput!.value = "";
		domRefs.modalHelp?.classList.remove("red", "fw-bold", "fs-5");
		domRefs.modalSubmitBtn!.disabled = true;
	};
	const addNewOptionTag = function () {
		const textContent = domRefs.sessionModalInput?.value;
		const parentElem = domRefs.selectElem;
		const inputValue = domRefs.sessionModalInput?.value;

		if (sessionModel.addSession(inputValue as string)) {
			console.log("clicked the add btn");
			addToSelectOption({
				textContent,
				parentElem,
				typeOfElem: "option",
				elemAttributes: {
					value: inputValue,
				},
			});
		} else {
			console.log("session already exist");
		}

		clearModalInputs();
		hideModal();
	};

	return {
		displayModal,
		updateModalUI,
		watchModal,
		closeModalBtn,
		addNewOptionTag,
	};
})();
