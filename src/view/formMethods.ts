import {
	addElemToDom,
	showErrMsg,
	validateNameField,
	validatePhoneField,
	validateSelectField, // make sure this is exported from ../utils
} from "../utils";
import { domRefs as domElements, domValues } from "./";
import { naijaService } from "../services";

export const formMethods = (function (domRefs = domElements) {
	const elementStates = {
		firstnameInput: false,
		middlenameInput: false,
		surnameInput: false,
		genderSelect: false,
		dobInput: false,
		religionSelect: false,
		bloodGroupSelect: false,
		fatherPhoneInput: false,
		motherPhoneInput: false,
		otherPhoneInput: false,
		lgaSelect: false,
		statesSelect: false,
	};

	const formUtils = function () {
		return {
			addStatesToDom() {
				const { stateSelect } = domRefs;
				if (!stateSelect) return;
				const states = naijaService.getStates();
				states.forEach(function (state: string) {
					addElemToDom({
						parentElem: stateSelect,
						typeOfElem: "option",
						textContent: state,
						elemAttributes: { value: state },
					});
				});
			},

			resetLga() {
				const { lgaSelect } = domRefs;
				if (!lgaSelect) return;

				lgaSelect.innerHTML = "";
				addElemToDom({
					parentElem: lgaSelect,
					typeOfElem: "option",
					textContent: "Choose LGA",
					elemAttributes: { value: "choose LGA", disabled: true },
				});
			},
		};
	};

	const loadFormDefaultState = function () {
		domRefs.formSubmitBtn!.disabled = true;
		formUtils().addStatesToDom();
	};

	const validateFirstname = function () {
		const { firstnameInput } = domRefs;
		validateNameField({
			inputElem: firstnameInput!,
			fieldKey: "firstnameInput",
			elementStates,
		});
	};

	const validateMiddlename = function () {
		const { middlenameInput } = domRefs;
		validateNameField({
			inputElem: middlenameInput!,
			fieldKey: "middlenameInput",
			elementStates,
		});
	};

	const validateSurname = function () {
		const { surnameInput } = domRefs;
		validateNameField({
			inputElem: surnameInput!,
			fieldKey: "surnameInput",
			elementStates,
		});
	};

	const validateFatherPhone = function () {
		const { fatherPhoneInput } = domRefs;
		validatePhoneField({
			inputElem: fatherPhoneInput,
			fieldKey: "fatherPhoneInput",
			elementStates,
		});
	};

	const validateMotherPhone = function () {
		const { motherPhoneInput } = domRefs;
		validatePhoneField({
			inputElem: motherPhoneInput,
			fieldKey: "motherPhoneInput",
			elementStates,
		});
	};

	const validateOtherPhone = function () {
		const { otherPhoneInput } = domRefs;
		validatePhoneField({
			inputElem: otherPhoneInput,
			fieldKey: "otherPhoneInput",
			elementStates,
		});
	};

	const validateGender = function () {
		validateSelectField({
			selectElem: domRefs.genderSelect!,
			fieldKey: "genderSelect",
			elementStates,
			invalidValue: domValues.chooseGender,
			errorMsg: "Gender is required",
		});
	};

	const validateDob = function () {
		const { dobInput } = domRefs;
		const dobValue = dobInput?.value.trim();
		const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dobValue || !dobRegex.test(dobValue)) {
			addElemToDom({
				parentElem: dobInput!.parentElement!,
				typeOfElem: "span",
				textContent: "Please enter a valid date (YYYY-MM-DD)",
				elemAttributes: { class: "text-danger mt-1" },
				pluginFunc: showErrMsg,
			});
			elementStates.dobInput = false;
		} else {
			elementStates.dobInput = true;
		}
	};

	const validateReligion = function () {
		validateSelectField({
			selectElem: domRefs.religionSelect!,
			fieldKey: "religionSelect",
			elementStates,
			invalidValue: domValues.chooseReligion,
			errorMsg: "Religion is required",
		});
	};

	const validateBloodGroup = function () {
		validateSelectField({
			selectElem: domRefs.bloodGroupSelect!,
			fieldKey: "bloodGroupSelect",
			elementStates,
			invalidValue: domValues.chooseBloodGroup,
			errorMsg: "Blood group is required",
		});
	};

	const validateNaijaState = function () {
		const { stateSelect } = domRefs;
		if (!stateSelect) return;

		if (
			!stateSelect.value.trim() ||
			stateSelect.value === domValues.chooseState
		) {
			addElemToDom({
				parentElem: stateSelect.parentElement!,
				typeOfElem: "span",
				textContent: "State is required",
				elemAttributes: { class: "text-danger mt-1" },
				pluginFunc: showErrMsg,
			});
			elementStates.statesSelect = false;
		} else {
			formUtils().resetLga();
			elementStates.statesSelect = true;
		}
	};

	const getLocalGovts = function () {
		const { stateSelect, lgaSelect } = domRefs;
		if (!stateSelect || !lgaSelect) return;

		const selectedState = stateSelect.value;
		if (!selectedState || selectedState === domValues.chooseState) {
			addElemToDom({
				parentElem: lgaSelect.parentElement!,
				typeOfElem: "span",
				textContent: "Please select a state first",
				pluginFunc: showErrMsg,
			});
			elementStates.lgaSelect = false;
		} else {
			lgaSelect.innerHTML = "";
			addElemToDom({
				parentElem: lgaSelect,
				typeOfElem: "option",
				textContent: "Choose LGA",
				elemAttributes: { value: "chooseLga", disabled: true },
			});

			const lgas = naijaService.getLgasByState(selectedState);
			lgas.forEach(function (lga: string) {
				addElemToDom({
					parentElem: lgaSelect,
					typeOfElem: "option",
					textContent: lga,
					elemAttributes: { value: lga },
				});
			});
			elementStates.lgaSelect = true;
		}
	};

	const checkFormValidity = function () {
		const { formSubmitBtn } = domRefs;
		const itContainsFalsy = Object.values(elementStates).includes(false);
		if (!itContainsFalsy) {
			formSubmitBtn!.disabled = false;
		} else {
			formSubmitBtn!.disabled = true;
		}
	};

	const globalValidator = function () {
		validateFirstname();
		validateMiddlename();
		validateSurname();
		validateDob();
		validateGender();
		validateBloodGroup();
		validateReligion();
		validateNaijaState();
		validateFatherPhone();
		validateMotherPhone();
		validateOtherPhone();

		checkFormValidity();
	};

	return {
		loadFormDefaultState,
		globalValidator,
		validateFirstname,
		validateMiddlename,
		validateSurname,
		validateDob,
		validateGender,
		validateBloodGroup,
		validateReligion,
		validateNaijaState,
		validateFatherPhone,
		validateMotherPhone,
		validateOtherPhone,
		getLocalGovts,
		elementStates,
		checkFormValidity,
	};
})();
