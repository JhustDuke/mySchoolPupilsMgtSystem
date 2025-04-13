import { formMethods } from "../view";
import { domRefs } from "../view";

export const formController = (function () {
	const {
		firstnameInput,
		middlenameInput,
		surnameInput,
		fatherPhoneInput,
		motherPhoneInput,
		otherPhoneInput,
		lgaSelect,
		stateSelect,
		dobInput,
		genderSelect,
		religionSelect,
		bloodGroupSelect,
		studentForm,
		formSubmitBtn,
	} = domRefs;

	formMethods.loadFormDefaultState();

	lgaSelect?.addEventListener("focusin", formMethods.getLocalGovts);

	//inputs
	firstnameInput?.addEventListener("input", formMethods.validateFirstname);
	middlenameInput?.addEventListener("input", formMethods.validateMiddlename);
	surnameInput?.addEventListener("input", formMethods.validateSurname);

	//phonenumber
	fatherPhoneInput?.addEventListener("input", formMethods.validateFatherPhone);

	motherPhoneInput?.addEventListener("input", formMethods.validateMotherPhone);

	otherPhoneInput?.addEventListener("input", formMethods.validateOtherPhone);

	//selects
	dobInput?.addEventListener("change", formMethods.validateDob);

	stateSelect?.addEventListener("change", formMethods.validateNaijaState);

	genderSelect?.addEventListener("change", formMethods.validateGender);

	religionSelect?.addEventListener("change", formMethods.validateReligion);

	bloodGroupSelect?.addEventListener("change", formMethods.validateBloodGroup);

	///button toggler
	studentForm?.addEventListener("load", function () {
		formMethods.checkFormValidity();
		console.log(formMethods.elementStates);
	});
	studentForm?.addEventListener("input", function () {
		formMethods.checkFormValidity();
		console.log(formMethods.elementStates);
	});
	studentForm?.addEventListener("change", function () {
		formMethods.checkFormValidity();
		console.log(formMethods.elementStates);
	});
})();
