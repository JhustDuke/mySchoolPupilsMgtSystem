export function showErrMsg(
	parentElem: HTMLElement | undefined,
	newElem: HTMLElement | undefined
) {
	if (!parentElem || !newElem) return;

	// Ensure the error message appears properly
	parentElem.style.position = "relative";

	newElem.style.position = "absolute";
	newElem.style.top = "0";
	newElem.style.left = "50%";
	newElem.style.color = "red";

	newElem.style.padding = "5px";

	// Remove after 5 seconds if not corrected
	setTimeout(() => {
		if (parentElem.contains(newElem)) {
			newElem.remove();
		}
	}, 3000);
}
