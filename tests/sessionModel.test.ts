import { describe, beforeEach, it, expect } from "@jest/globals";
import { sessionModalMock, getDomRefs } from "./mockDom";
import { sessionModel as model } from "../src/model";

let domRefs: ReturnType<typeof getDomRefs>;
const sessionModel = model();
beforeEach(() => {
	document.body.innerHTML = sessionModalMock;
	domRefs = getDomRefs();
});

describe("sessionModel tests", () => {
	it("should load sessions from options in select into a set", () => {
		expect(sessionModel.loadSessions(domRefs.selectElem!)).toBeTruthy();
	});
	it("should return false for a session that does not exist", function () {
		expect(sessionModel.isDuplicateSession("2013/2014")).toBeFalsy();
	});

	it("should return true for a session that already exists", function () {
		expect(sessionModel.isDuplicateSession("2023/2024")).toBeTruthy();
	});

	it("should return true for an added sesionName", function () {
		expect(sessionModel.addSession("3023/2023")).toBeTruthy();
	});

	it("should return false for a duplicate session", function () {
		expect(sessionModel.addSession("2023/2024")).toBeFalsy();
	});
});
