export function addElemToDom({
	parentElem = document.body,
	typeOfElem,
	textContent = "placeholder",
	elemAttributes = {},
}: {
	parentElem?: HTMLElement | null;
	typeOfElem: keyof HTMLElementTagNameMap;
	textContent?: string;
	elemAttributes?: { [key: string]: any };
}): void {
	try {
		if (!(parentElem instanceof HTMLElement)) {
			console.log(`${parentElem} is not a valid html element`);
			return;
		}

		const createdElem = document.createElement(typeOfElem);

		// Apply attributes
		for (const [key, value] of Object.entries(elemAttributes)) {
			createdElem.setAttribute(key, value);
		}
		if (textContent) {
			createdElem.textContent = textContent;
		}

		parentElem.appendChild(createdElem);
		console.log(
			`Element <${typeOfElem}> created and added to ${parentElem.tagName}`
		);
	} catch (error) {
		console.error(`there was an error: ${error}`);
	}
}
