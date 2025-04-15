import { formMethods } from "../view";
import { populateStates, resetLgaSelect } from "../utils";
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
		addressInput,
		startCameraBtn,
		stopCameraBtn,
		snapCameraBtn,
		formSubmitBtn,
	} = domRefs;

	formMethods.loadFormDefaultState(
		populateStates(stateSelect as HTMLSelectElement)
	);

	//webCam

	startCameraBtn?.addEventListener("click", formMethods.startCameranFunc);
	stopCameraBtn?.addEventListener("click", formMethods.stopCameraFunc);
	snapCameraBtn?.addEventListener("click", function () {
		formMethods.snapPictureFunc(formMethods.stopCameraFunc);
	});

	lgaSelect?.addEventListener("focusin", formMethods.getLocalGovts);

	//name inputs
	firstnameInput?.addEventListener("input", formMethods.validateFirstname);
	middlenameInput?.addEventListener("input", formMethods.validateMiddlename);
	surnameInput?.addEventListener("input", formMethods.validateSurname);

	//address
	addressInput?.addEventListener("input", formMethods.validateAddress);

	//phonenumber
	fatherPhoneInput?.addEventListener("input", formMethods.validateFatherPhone);

	motherPhoneInput?.addEventListener("input", formMethods.validateMotherPhone);

	otherPhoneInput?.addEventListener("input", formMethods.validateOtherPhone);

	//selects
	dobInput?.addEventListener("change", formMethods.validateDob);

	stateSelect?.addEventListener("change", function () {
		formMethods.validateNaijaState(
			resetLgaSelect(lgaSelect as HTMLSelectElement)
		);
	});

	genderSelect?.addEventListener("change", formMethods.validateGender);

	religionSelect?.addEventListener("change", formMethods.validateReligion);

	bloodGroupSelect?.addEventListener("change", formMethods.validateBloodGroup);

	///button toggler

	studentForm?.addEventListener("input", function () {
		formMethods.checkFormValidity();
	});
	studentForm?.addEventListener("change", function () {
		formMethods.checkFormValidity();
	});
})();
