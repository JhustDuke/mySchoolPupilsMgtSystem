export function isValidYearFormat(inputValue: string): boolean {
	const sessionInputFormat = /^(\d{4})\/(\d{4})$/;
	return sessionInputFormat.test(inputValue.trim());
}
