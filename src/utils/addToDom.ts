export function addElemToDom({
	parentElem,
	typeOfElem,
	textContent,
	elemAttributes = {},
}: {
	parentElem: any;
	typeOfElem: string;
	textContent?: any;
	elemAttributes?: { [key: string]: any };
}): void {
	const getParent = document.querySelector(parentElem);
	const createdElem = document.createElement(typeOfElem);

	if (!getParent) {
		console.log(`Parent element '${parentElem}' not found.`);
		return;
	}
	// Apply attributes
	for (const [key, value] of Object.entries(elemAttributes)) {
		createdElem.setAttribute(key, value);
	}
	if (textContent) {
		createdElem.textContent = textContent;
	}
	getParent.appendChild(createdElem);
	console.log(`Element <${typeOfElem}> created and added to ${parentElem}`);
}
