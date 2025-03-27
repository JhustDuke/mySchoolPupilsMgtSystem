export const insertBeforeAddSession = function (parent: any, newElem: any) {
	if (!parent) return;
	const addSession = parent.querySelector("#addSession");
	if (addSession) {
		parent.insertBefore(newElem, addSession);
	}
};