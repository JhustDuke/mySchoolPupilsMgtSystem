import {
	addElemToDom,
	showErrMsg,
	validateNameField,
	validatePhoneField,
	validateSelectField,
	validateAddressField,
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
		addressInput: false,
		fatherPhoneInput: false,
		motherPhoneInput: false,
		otherPhoneInput: false,
		lgaSelect: false,
		statesSelect: false,
	};

	const loadFormDefaultState = function (preLoadFunc?: any) {
		domRefs.formSubmitBtn!.disabled = true;
		domRefs.stopCameraBtn!.disabled = true;
		domRefs.snapCameraBtn!.disabled = true;
		preLoadFunc?.();
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

	const validateNaijaState = function (resetLgaSelectPlugin?: any) {
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
			resetLgaSelectPlugin?.();
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

	const validateAddress = function () {
		const { addressInput } = domRefs;
		validateAddressField({
			inputElem: addressInput!,
			fieldKey: "addressInput",
			elementStates,
		});
	};

	let stream: any = null;
	const startCameranFunc = async function () {
		const {
			video,
			startCameraBtn,
			canvasWrapper,
			cameraHelp,
			stopCameraBtn,
			snapCameraBtn,
		} = domRefs;

		try {
			//if the stream is inactive start the webcam
			if (!stream) {
				stream = await navigator.mediaDevices.getUserMedia({ video: true });
				video!.srcObject = stream;
				video?.play();
				canvasWrapper?.classList.remove("d-none");
				cameraHelp?.classList.add("d-none");
				startCameraBtn!.textContent = "retake?";
				startCameraBtn!.disabled = true;
				stopCameraBtn!.disabled = false;
				snapCameraBtn!.disabled = false;
				console.log("streaming");
			}
		} catch (err) {
			console.log("there was an error:", err);
		}
	};
	const snapPictureFunc = function (stopCameraPlugin: any) {
		const { video, canvas, generatedImg } = domRefs;
		if (stream) {
			const ctx = canvas?.getContext("2d");
			canvas!.width = video?.videoWidth as number;
			canvas!.height = video?.videoHeight as number;
			ctx?.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
			const convertToImageData = canvas?.toDataURL("image/png");
			generatedImg?.classList.remove("d-none");
			generatedImg!.src = convertToImageData as string;
			canvas?.classList.add("d-none");
			console.log("snapped picture");
		}
		stopCameraPlugin?.();
	};

	const stopCameraFunc = function () {
		//if the stream is active
		const { video, snapCameraBtn, stopCameraBtn, startCameraBtn } = domRefs;
		if (stream) {
			stream.getTracks().forEach(function (track: any) {
				track.stop();
			});
			stream = null;
			video?.pause();
			stopCameraBtn!.disabled = true;
			snapCameraBtn!.disabled = true;
			startCameraBtn!.disabled = false;
			console.log("stream stopped!");
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

	return {
		loadFormDefaultState,
		validateFirstname,
		validateMiddlename,
		validateSurname,
		validateDob,
		validateGender,
		validateBloodGroup,
		validateReligion,
		validateNaijaState,
		validateAddress,
		validateFatherPhone,
		validateMotherPhone,
		validateOtherPhone,
		getLocalGovts,
		startCameranFunc,
		stopCameraFunc,
		snapPictureFunc,
		elementStates,
		checkFormValidity,
	};
})();
