import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { addElemToDom } from "../src/utils";

describe("addElemToDom", function () {
	let parentElem: HTMLElement;

	beforeEach(function () {
		// Reset DOM before each test
		document.body.innerHTML = `
      <div id='test-container'>
        <p id='staticP'>I'm static</p>
        <button id='staticBtn'>Static Button</button>
      </div>
    `;
		parentElem = document.getElementById("test-container")!;
	});

	/*** Basic Element Addition ***/
	it("should add an element with correct type and text", function () {
		addElemToDom({
			parentElem,
			typeOfElem: "p",
			textContent: "Hello, World!",
		});

		const addedElem = parentElem.querySelector("p:last-of-type");
		expect(addedElem).not.toBeNull();
		expect(addedElem!.textContent).toBe("Hello, World!");
	});

	it("should apply attributes correctly", function () {
		addElemToDom({
			parentElem,
			typeOfElem: "button",
			elemAttributes: { id: "btn-1", class: "btn-primary" },
		});

		const addedElem = parentElem.querySelector("button#btn-1");
		expect(addedElem).not.toBeNull();
		expect(addedElem!.classList.contains("btn-primary")).toBe(true);
	});

	/*** Plugin Functionality ***/
	it("should insert the dynamic p tag before the static button", function () {
		addElemToDom({
			parentElem,
			typeOfElem: "p",
			textContent: "I'm dynamic",
			pluginFunc: function (parent: any, newElem: any) {
				const button = parent.querySelector("#staticBtn");
				if (button) {
					parent.insertBefore(newElem, button);
				}
			},
		});

		const addedElem = parentElem.querySelector("p:last-of-type");
		const button = parentElem.querySelector("#staticBtn");

		expect(addedElem).not.toBeNull();
		expect(button).not.toBeNull();
		expect(button?.previousElementSibling).toBe(addedElem);
	});
});
