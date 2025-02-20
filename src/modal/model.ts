export const dom = {
	selectElem: document.querySelector<HTMLSelectElement>("select"),
	sessionModal: document.querySelector<HTMLDivElement>("#addSessionModal"),
	sessionModalInput:
		document.querySelector<HTMLInputElement>("#sessionModalInput"),
	modalSubmitBtn: document.querySelector<HTMLButtonElement>("#addSessionBtn"),
	modalHelp: document.querySelector<HTMLParagraphElement>("#modalHelp"),
	closeModalBtn: document.querySelector<HTMLSpanElement>("#closeModalBtn"),
};
