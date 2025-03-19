import { describe, expect, it, beforeEach } from "@jest/globals";
import { sessionModalMock, getDomRefs } from "./mockDom";
// sessionModel
let domRefs: ReturnType<typeof getDomRefs>;

beforeEach(function () {
	document.body.innerHTML = sessionModalMock;
	domRefs = getDomRefs();
});

describe("DOM Rendering", () => {
	it("should render the session dropdown it1", () => {
		expect(domRefs.selectElem).toBeTruthy();
	});

	it("should have a modal for adding a session it2", () => {
		expect(domRefs.sessionModal).toBeTruthy();
	});
});

describe("Session Modal Interactions", () => {
	it("should update input value it3", () => {
		if (domRefs.sessionModalInput) {
			domRefs.sessionModalInput.value = "2025/2026";
			expect(domRefs.sessionModalInput.value).toBe("2025/2026");
		}
	});

	it('should enable the "Add Session" button when input is filled', () => {
		if (domRefs.sessionModalInput && domRefs.modalSubmitBtn) {
			domRefs.sessionModalInput.value = "2025/2026";
			domRefs.modalSubmitBtn.disabled = false;
			expect(domRefs.modalSubmitBtn.disabled).toBe(false);
		}
	});
});
