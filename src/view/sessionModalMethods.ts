import {
	isValidYearFormat,
	addElemToDom as addToSelectOption,
	domUtils as modalUtils,
} from "../utils";
import { domRefs as domElements } from ".";
import { sessionModel as ssModel } from "../model";

interface SessionValidationResult {
	sessionName: string | undefined;
	isValid: boolean;
	isDuplicate: boolean;
}

/** The new options should be added before the addSession option so that it is inserted before */

/**
 * Creates session modal methods with injected dependencies.
 */
export const sessionModalMethods = function (
	domRefs: typeof domElements,
	sessionModel = ssModel()
) {
	const loadDefaults = function (): void {
		if (!domRefs.sessionModal || !domRefs.modalSubmitBtn || !domRefs.selectElem)
			return;
		domRefs.sessionModal.style.display = "none";
		domRefs.modalSubmitBtn.disabled = true;
		sessionModel.loadSessions(domRefs.selectElem);
	};

	const displayModal = function (): void {
		if (!domRefs.selectElem || domRefs.selectElem.selectedIndex < 0) return;
		const selectedOption: HTMLOptionElement | null =
			domRefs.selectElem.options[domRefs.selectElem.selectedIndex] || null;

		if (!domRefs.sessionModal) return;
		domRefs.sessionModal.style.display =
			selectedOption?.value === "addSession" ? "block" : "none";
	};

	const validateSessionName = function (): SessionValidationResult {
		const sessionName: string | undefined =
			domRefs.sessionModalInput?.value.trim();
		return {
			sessionName,
			isValid: sessionName ? isValidYearFormat(sessionName) : false,
			isDuplicate: sessionName
				? sessionModel.isDuplicateSession(sessionName)
				: false,
		};
	};

	const updateModalHint = function (
		isValid: boolean,
		isDuplicate: boolean
	): boolean {
		const modalHint: HTMLElement | null = domRefs.modalHelp;
		if (!modalHint) return false;

		modalHint.classList.add("red", "fw-bold", "fs-5");

		if (isDuplicate) {
			modalHint.textContent = "This session year already exists";
			return false;
		}

		if (!isValid) return false;

		modalHint.classList.remove("red", "fw-bold", "fs-5");
		return true;
	};

	const updateModalUI = function (): void {
		const { isValid, isDuplicate } = validateSessionName();
		if (domRefs.modalSubmitBtn) {
			domRefs.modalSubmitBtn.disabled = !updateModalHint(isValid, isDuplicate);
		}
	};

	const watchModal = function (): void {
		displayModal();
		updateModalUI();
	};

	const hideModal = function (): void {
		if (!domRefs.sessionModal) return;
		modalUtils.toggleVisibility({
			targetElem: domRefs.sessionModal,
			shouldShow: false,
		});
		console.log("modal closed");
	};

	const clearModalInputs = function (): void {
		if (
			!domRefs.sessionModalInput ||
			!domRefs.modalHelp ||
			!domRefs.modalSubmitBtn
		)
			return;
		modalUtils.clearInputs({
			targetElem: domRefs.sessionModalInput,
			hintElem: domRefs.modalHelp,
			submitBtn: domRefs.modalSubmitBtn,
		});
	};

	const addNewOptionTag = function (): void {
		const inputValue: string | undefined = domRefs.sessionModalInput?.value;
		const parentElem: HTMLSelectElement | null = domRefs.selectElem;

		if (!parentElem || !inputValue) return;

		if (sessionModel.addSession(inputValue)) {
			addToSelectOption({
				textContent: inputValue,
				parentElem,
				typeOfElem: "option",
				elemAttributes: { value: inputValue },
			});
			clearModalInputs();
			hideModal();
		} else {
			console.log("Session already exists");
		}
	};

	loadDefaults();

	return {
		displayModal,
		updateModalUI,
		watchModal,
		hideModal, // Consolidated hideModal and closeModalBtn
		addNewOptionTag,
	};
};
