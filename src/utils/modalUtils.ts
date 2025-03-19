export const domUtils = {
	toggleVisibility: function ({
		targetElem,
		shouldShow = false,
	}: {
		targetElem: HTMLElement | null;
		shouldShow?: boolean;
	}) {
		if (!targetElem) return;
		targetElem.style.display = shouldShow ? "block" : "none";
	},

	clearInputs: function ({
		targetElem,
		hintElem,
		submitBtn,
	}: {
		targetElem: HTMLInputElement | null;
		hintElem?: HTMLElement | null;
		submitBtn?: HTMLButtonElement | null;
	}) {
		if (targetElem) targetElem.value = "";
		if (hintElem) hintElem.classList.remove("red", "fw-bold", "fs-5");
		if (submitBtn) submitBtn.disabled = true;
	},
};
