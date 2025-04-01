import { formMethods } from "../view";
import { domRefs } from "../view";

export const formController = (function () {
	console.log("formController ran");
	formMethods.loadFormDefaultState();
})();
