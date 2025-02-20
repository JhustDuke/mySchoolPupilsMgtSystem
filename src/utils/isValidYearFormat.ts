export function isValidYearFormat(sessionModalInput: any): boolean {
	const sessionInputFormat = /^(\d{4})\/(\d{4})$/;
	const inputValue = sessionModalInput?.value.trim() || "";
	const validate = sessionInputFormat.test(inputValue);
	if (!validate) {
		return false;
	}
	return true;
}
