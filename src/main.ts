import { sessionModalEvents } from "./controllers/sessionModalEvents";

(function () {
	document.addEventListener("DOMContentLoaded", function () {
		sessionModalEvents;
	});
})();

// (() => {
// 	// Event listeners
// 	document.addEventListener("DOMContentLoaded", function () {
// 		sessionModalEvents;
// 	});

// 	// function initModal() {
// 	// 	displayModal();
// 	// 	updateModalUI();
// 	// }
// 	// function displayModal() {
// 	// 	if (!domRefs.selectElem) return;
// 	// 	const selectedOption =
// 	// 		domRefs.selectElem.options[domRefs.selectElem.selectedIndex];

// 	// 	if (selectedOption?.value === "addSession") {
// 	// 		domRefs.sessionModal!.style.display = "block";
// 	// 		console.log("loading modal.....");
// 	// 	} else {
// 	// 		domRefs.sessionModal!.style.display = "none";
// 	// 		console.log(selectedOption, " is not modal activator");
// 	// 	}
// 	// }

// 	// function updateModalUI() {
// 	// 	const isValid = isValidYearFormat(domRefs.sessionModalInput);

// 	// 	if (!isValid) {
// 	// 		domRefs.modalHelp?.classList.add("red", "fw-bold", "fs-5");
// 	// 	} else {
// 	// 		domRefs.modalHelp?.classList.remove("red", "fw-bold", "fs-5");
// 	// 	}

// 	// 	domRefs.modalSubmitBtn!.disabled = !isValid;
// 	// }

// 	// addToSelectOption({
// 	// 	parentElem: domRefs.selectElem,
// 	// 	typeOfElem: "option",

// 	// 	elemAttributes: {
// 	// 		value: domRefs.sessionModalInput,
// 	// 	},
// 	// });
// })();
