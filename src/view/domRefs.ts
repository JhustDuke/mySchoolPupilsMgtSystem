export const domRefs = {
	selectElem: document.querySelector<HTMLSelectElement>("#select"),

	sessionModal: document.querySelector<HTMLDivElement>("#addSessionModal"),

	sessionModalInput:
		document.querySelector<HTMLInputElement>("#sessionModalInput"),

	modalSubmitBtn: document.querySelector<HTMLButtonElement>("#addSessionBtn"),

	modalHelp: document.querySelector<HTMLParagraphElement>("#modalHelp"),

	closeModalBtn: document.querySelector<HTMLSpanElement>("#closeModalBtn"),

	mainTable: document.querySelector<HTMLDivElement>("#mainTable"),

	classSelect: document.querySelector<HTMLSelectElement>("#classSelect"),

	addClassBtn: document.querySelector<HTMLButtonElement>("#addClass"),

	// Form elements
	studentForm: document.querySelector<HTMLFormElement>("#studentForm"),

	surnameInput: document.querySelector<HTMLInputElement>("#surnameInput"),

	firstnameInput: document.querySelector<HTMLInputElement>("#firstnameInput"),

	middlenameInput: document.querySelector<HTMLInputElement>("#middlenameInput"),

	genderSelect: document.querySelector<HTMLSelectElement>("#genderSelect"),

	dobInput: document.querySelector<HTMLInputElement>("#dobInput"),

	stateSelect: document.querySelector<HTMLSelectElement>("#stateSelect"),

	lgaSelect: document.querySelector<HTMLSelectElement>("#lgaSelect"),

	bloodGroupSelect:
		document.querySelector<HTMLSelectElement>("#bloodGroupSelect"),

	religionSelect: document.querySelector<HTMLSelectElement>("#religionSelect"),

	addressInput: document.querySelector<HTMLTextAreaElement>("#addressInput"),

	fatherPhoneInput:
		document.querySelector<HTMLInputElement>("#fatherPhoneInput"),

	motherPhoneInput:
		document.querySelector<HTMLInputElement>("#motherPhoneInput"),

	otherPhoneInput: document.querySelector<HTMLInputElement>("#otherPhoneInput"),

	errorFields: document.querySelector<HTMLDivElement>("#errorFields"),

	formSubmitBtn: document.querySelector<HTMLButtonElement>("#studentSubmitBtn"),

	//webCam and image
	startCameraBtn: document.querySelector<HTMLButtonElement>("#startCameraBtn"),

	stopCameraBtn: document.querySelector<HTMLButtonElement>("#stopCameraBtn"),

	snapCameraBtn: document.querySelector<HTMLButtonElement>("#snapCameraBtn"),
	canvasWrapper: document.querySelector<HTMLElement>("#canvasWrapper"),

	canvas: document.querySelector<HTMLCanvasElement>("#canvas"),

	video: document.querySelector<HTMLVideoElement>("#video"),

	cameraHelp: document.querySelector<HTMLSpanElement>("#cameraHelp"),

	generatedImg: document.querySelector<HTMLImageElement>("#generatedImg"),
};
