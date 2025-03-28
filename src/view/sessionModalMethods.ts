import {
	isValidYearFormat,
	addElemToDom as addToSelectOption,
	domUtils as modalUtils,
	insertBeforeAddSession,
} from "../utils";
import { domRefs as domElements } from ".";
import { sessionModel as ssModel } from "../model";

export const sessionModalMethods = function (
	domRefs = domElements,
	sessionModel = ssModel()
) {
	const loadDefaults = function () {
		const modalDiv = domRefs.sessionModal;
		const modalSubmitBtn = domRefs.modalSubmitBtn;
		const modalSelectElem = domRefs.selectElem;
		if (!modalDiv || !modalSelectElem || !modalSubmitBtn) return;
		modalUtils.toggleVisibility({ targetElem: modalDiv, shouldShow: false });
		modalSubmitBtn!.disabled = true;
		if (!sessionModel.loadSessionYears()) {
			addToSelectOption({
				parentElem: modalSelectElem,
				typeOfElem: "option",
				textContent: "no sessions registered click addSession to register",
				elemAttributes: {
					disabled: true,
				},
				pluginFunc: insertBeforeAddSession,
			});
			return;
		} else {
			populateSelect();
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

		if (selectedOption?.value === "addSession") {
			modalUtils.toggleVisibility({ targetElem: modalDiv, shouldShow: true });
		}
	};

	const updateModalUI = function (): void {
		const modalSubmitBtn = domRefs.modalSubmitBtn;
		const userInputs = domRefs.sessionModalInput?.value.trim();
		const userInputIsValid = isValidYearFormat(userInputs as string);
		const modalHelp = domRefs.modalHelp;
		if (userInputIsValid) {
			modalSubmitBtn!.disabled = false;
			modalUtils.toggleVisibility({ targetElem: modalHelp });
		} else {
			modalSubmitBtn!.disabled = true;
			modalUtils.inputHintHelper({
				hintText: "input must be in the format YYYY/YYYY",
				classListStyling: "+text-capitalize",
				targetElem: modalHelp,
			});
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
	const displayTable = function () {
		/**this will need the select elem
		 * will listen for events on anything that does have the name choose session or addSession
		 * displays a table
		 *
		 */
	};

	return {
		loadDefaults,
		populateSelect,
		hideModal,
		displayModal,
		updateModalUI,
		watchModal,
		addNewSession,
	};
};
/**
 * when the option year is clicked
 * it displays a table
 * this table is gotten from the db
 * a
 */
