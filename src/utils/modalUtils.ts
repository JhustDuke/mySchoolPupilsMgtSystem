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

	/**
	 * Updates a modal hint element with text and optional styling.
	 * Using `+` before a class appends it to the default classes.
	 * Using a class name without `+` overrides the default list.
	 *
	 * Example:
	 * - `["+new-class"]` → Adds `new-class` alongside defaults.
	 * - `["override-class"]` → Replaces all defaults with `override-class`.
	 * same for strings..string doesnt suport more than 1 class
	 */
	inputHintHelper: function ({
		hintText = "This is a placeholder hint text",
		classListStyling,
		targetElem,
	}: {
		hintText?: string;
		classListStyling?: string[] | string;
		targetElem?: HTMLElement | null;
	}) {
		if (!targetElem) {
			console.log("modalHint is null");
			return null;
		}

		const defaultClasses: string[] = ["red", "fw-bold", "fs-5"];
		const preservedClass: string[] = [...defaultClasses];

		if (Array.isArray(classListStyling)) {
			for (const cls of classListStyling) {
				if (cls.startsWith("+")) {
					preservedClass.push(cls.substring(1));
				} else {
					preservedClass.push(cls);
				}
			}
		}
		if (typeof classListStyling === "string") {
			if (classListStyling.startsWith("+")) {
				preservedClass.push(classListStyling.substring(1));
			} else {
				preservedClass.length = 0;
				preservedClass.push(classListStyling);
			}
		}

		targetElem.classList.add(...preservedClass);
		targetElem.textContent = hintText;
		targetElem.style.display = "block";
	},
};
