import { isValidYearFormat, addElemToDom as addToSelectOption } from "./utils";
import { dom } from "./modal";
(() => {
	// Hide modal & disable button by default
	dom.sessionModal!.style.display = "none";
	dom.modalSubmitBtn!.disabled = true;

	// Event listeners
	dom.selectElem!.addEventListener("click", initModal);
	dom.sessionModalInput!.addEventListener("input", updateModalUI);
	dom.closeModalBtn!.addEventListener("click", () => {
		dom.sessionModal!.style.display = "none";
		console.log("modal closed");
	});

	function initModal() {
		displayModal();
		updateModalUI();
	}
	function displayModal() {
		if (!dom.selectElem) return;
		const selectedOption = dom.selectElem.options[dom.selectElem.selectedIndex];

		if (selectedOption?.value === "addSession") {
			dom.sessionModal!.style.display = "block";
			console.log("loading modal.....");
		} else {
			dom.sessionModal!.style.display = "none";
			console.log(selectedOption, " is not modal activator");
		}
	}

	function updateModalUI() {
		const isValid = isValidYearFormat(dom.sessionModalInput);

		if (!isValid) {
			dom.modalHelp?.classList.add("red", "fw-bold", "fs-5");
		} else {
			dom.modalHelp?.classList.remove("red", "fw-bold", "fs-5");
		}

		dom.modalSubmitBtn!.disabled = !isValid;
	}

	addToSelectOption({
		parentElem: dom.selectElem,
		typeOfElem: "option",
		textContent: dom.sessionModalInput,
		elemAttributes: {
			value: dom.sessionModalInput,
		},
	});
})();
