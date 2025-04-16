import {
	isValidYearFormat,
	addElemToDom as addToSelectOption,
	domUtils as modalUtils,
	insertBeforeAddSession,
} from "../utils";
import { domRefs as domElements, domValues } from ".";
import { sessionModel as ssModel } from "../model";

export const sessionModalMethods = (function (
	domRefs = domElements,
	sessionModel = ssModel
) {
	const DOMDefaultState = function () {
		elementDefaultState();
		populateSelect();
	};
	const elementDefaultState = function () {
		const modalDiv = domRefs.sessionModal;
		const modalSubmitBtn = domRefs.modalSubmitBtn;
		const modalSelectElem = domRefs.selectElem;

		if (!modalDiv || !modalSelectElem || !modalSubmitBtn) return;

		//disabled elements
		modalUtils.toggleVisibility({ targetElem: modalDiv, shouldShow: false });
		modalSubmitBtn!.disabled = true;

		if (!sessionModel.loadSessionYears()) {
			addToSelectOption({
				parentElem: modalSelectElem,
				typeOfElem: "option",
				textContent: "no sessions registered click addSession to register",
				elemAttributes: {
					disabled: true,
					id: "noSession",
				},
				pluginFunc: insertBeforeAddSession,
			});
			return;
		}
	};
	const populateSelect = function () {
		const selectElem = domRefs.selectElem;
		if (!selectElem) {
			console.log("selectElem not found");
			return;
		}

		const data = sessionModel.loadSessionYears();
		if (!data || data.length === 0) {
			console.log("No session years available");
			return;
		}

		data.forEach((sessionYear) => {
			addToSelectOption({
				parentElem: selectElem,
				typeOfElem: "option",
				textContent: sessionYear,
				elemAttributes: { value: sessionYear },
				pluginFunc: insertBeforeAddSession,
			});
		});
	};

	const displayModal = function (): void {
		const modalSelectElem = domRefs.selectElem;
		const modalDiv = domRefs.sessionModal;
		if (!modalSelectElem || modalSelectElem.selectedIndex < 0) {
			console.log("error");
			return;
		}
		const selectedOption: HTMLOptionElement | null =
			modalSelectElem.options[modalSelectElem.selectedIndex] || null;

		if (!modalDiv) {
			console.log("modal div not found");
			return;
		}

		//there are no stored session in the db
		if (!sessionModel.loadSessionYears()) {
			modalUtils.toggleVisibility({ targetElem: modalDiv, shouldShow: true });
		}
		//the user selected the addSession value
		else if (selectedOption?.value === domValues.addSession) {
			modalUtils.toggleVisibility({ targetElem: modalDiv, shouldShow: true });
		} else {
			console.log("cannot find", selectedOption);
		}
	};

	const updateModalUI = function (): void {
		const modalSubmitBtn = domRefs.modalSubmitBtn;
		const userInputs = domRefs.sessionModalInput?.value.trim();
		const userInputIsValid = isValidYearFormat(userInputs as string);
		const modalHelp = domRefs.modalHelp;

		if (!modalHelp) return;

		if (userInputIsValid) {
			modalSubmitBtn!.disabled = false;
			modalUtils.toggleVisibility({ targetElem: modalHelp });
		} else {
			modalSubmitBtn!.disabled = true;

			// Only update hintText if it's empty or different
			const newHint = "input must be in the format YYYY/YYYY";
			if (modalHelp.textContent?.trim() !== newHint) {
				modalUtils.inputHintHelper({
					hintText: newHint,
					classListStyling: "+text-capitalize",
					targetElem: modalHelp,
				});
			}
		}
	};

	const watchModal = function (): void {
		displayModal();
		updateModalUI();
	};
	const addNewSession = function (): void {
		const sessionValue: string | undefined = domRefs.sessionModalInput?.value;
		const parentElem: HTMLSelectElement | null = domRefs.selectElem;
		const modalHelp = domRefs.modalHelp;

		if (!parentElem || !sessionValue) {
			console.log("parentElem or sessionValue is null");
			return;
		}

		if (sessionModel.isDuplicate(sessionValue)) {
			console.log(`Session ${sessionValue} already exists!`);
			modalUtils.inputHintHelper({
				hintText: "This session year already exists",
				targetElem: modalHelp,
			});
			return;
		}

		sessionModel.addNewSessionYear(sessionValue);
		console.log(`Session year ${sessionValue} added successfully!`);

		// Add session to the select dropdown
		addToSelectOption({
			textContent: sessionValue,
			parentElem,
			typeOfElem: "option",
			elemAttributes: { value: sessionValue },
			pluginFunc: insertBeforeAddSession,
		});

		removeNoSessionOption();
		clearModalInputs();
		hideModal();
	};
	const hideModal = function (): void {
		const modalDiv = domRefs.sessionModal;
		if (!modalDiv) {
			console.log("modalDiv not found");
			return;
		}
		modalUtils.toggleVisibility({
			targetElem: modalDiv,
			shouldShow: false,
		});
		console.log("modal closed");
	};
	const clearModalInputs = function (): void {
		const userInputs = domRefs.sessionModalInput;
		const helpText = domRefs.modalHelp;
		const modalSubmitBtn = domRefs.modalSubmitBtn;
		if (!userInputs || !helpText || !modalSubmitBtn) {
			console.log("either userInputs,helpText, modalSubmitBtn mising");
			return;
		}

		modalUtils.clearInputs({
			targetElem: domRefs.sessionModalInput,
			hintElem: domRefs.modalHelp,
			submitBtn: domRefs.modalSubmitBtn,
		});
	};
	const removeNoSessionOption = function () {
		// Remove the default noSession option
		const selectElem = domRefs.selectElem;
		const noSessionOption = selectElem?.querySelector("#noSession");

		noSessionOption ? noSessionOption.remove() : null;
	};

	return {
		DOMDefaultState,
		populateSelect,
		hideModal,
		displayModal,
		updateModalUI,
		watchModal,
		addNewSession,
	};
})();
