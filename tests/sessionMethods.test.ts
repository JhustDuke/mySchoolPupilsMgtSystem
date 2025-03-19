import { describe, it, expect, beforeEach } from "@jest/globals";
import { sessionModalMock, getDomRefs } from "./mockDom";
import { sessionModalMethods } from "../src/view";

let domRefs: ReturnType<typeof getDomRefs>;
let modalMethods: ReturnType<typeof sessionModalMethods>;

const mockSessionModel = {
	loadSessions: jest.fn(),
	isDuplicateSession: jest.fn().mockReturnValue(false),
	addSession: jest.fn().mockReturnValue(true),
};

beforeEach(function () {
	document.body.innerHTML = sessionModalMock;
	domRefs = getDomRefs();
	modalMethods = sessionModalMethods(domRefs, mockSessionModel);
});

describe("Session Modal Tests", function () {
	it("should exist", function () {
		expect(modalMethods).toBeDefined();
	});
});
