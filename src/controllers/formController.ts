import { formMethods } from "../view";
import { domRefs } from "../view";

export const formController = (function () {
	const form = domRefs.studentForm;
	console.log("formController ran");
	formMethods.loadFormDefaultState();

	form?.addEventListener("input", formMethods.nameInputIsValid);
})();
