import { describe, it, expect, beforeEach } from "@jest/globals";
import { sessionModalMock as mockDom, getDomRefs } from "./mockDom";
// import { getSessionData } from "../src/view";

let domRefs: ReturnType<typeof getDomRefs>;
beforeEach(function () {
	document.body.innerHTML = mockDom;
	domRefs = getDomRefs();
});

describe("should listen for events in the options inside the select", function () {
	it("it should add event on the option", function () {
		getSessionEvHandler();
		const spyOnGlobalConsoleObject = jest
			.spyOn(console, "log")
			.mockImplementation(function () {});
		domRefs.selectElem!.value = "2013/2014";
		domRefs.selectElem?.dispatchEvent(new Event("change", { bubbles: true }));

		expect(spyOnGlobalConsoleObject).toHaveBeenCalledWith("2013/2014:result");
		spyOnGlobalConsoleObject.mockRestore();
	});
});
/**
 * i want when i click an option from the select menu e.g 2013/2000 is clicked
 * it getsData for that year like it simulates querying a db
 * so i'll do event delegation
 * then start from the select its self
 * get the select target value
 * and if its not choose session or addSession
 * i simply simulate a click
 */
function getSessionEvHandler() {
	const select: HTMLElement | null = domRefs.selectElem;
	if (!select) return null;
	select?.addEventListener("change", function (e: Event) {
		const theOption = e.target as HTMLSelectElement;
		const theOptionValue = theOption.value;
		if (theOptionValue === "choose session" || theOptionValue === "add session")
			return;
		const queryDBResult = queryDBMock(theOptionValue);
		console.log(queryDBResult);
	});
}

function isSessionExistMock(year: string) {
	const isExist = jest.fn(function (yr: string) {
		if (yr === "choose session" || yr === "add session") return;
		return yr === "2013/2014";
	});
	return isExist(year);
}

function queryDBMock(sessionYear: string) {
	const checkedYear = isSessionExistMock(sessionYear);
	if (!checkedYear) {
		console.log("sesion does not exist");
		return false;
	}
	const DBQueryResult = jest.fn(function (year) {
		const value = `${year}:result`;
		return value;
	});
	return DBQueryResult(sessionYear);
}
