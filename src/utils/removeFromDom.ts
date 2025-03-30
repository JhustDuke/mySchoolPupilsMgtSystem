export function removeElementById(elemId: string) {
	const element = document.getElementById(elemId);
	if (element) {
		element.remove();
		return true;
	}
	console.log("element with id:", elemId, "not found");
	return false;
}
