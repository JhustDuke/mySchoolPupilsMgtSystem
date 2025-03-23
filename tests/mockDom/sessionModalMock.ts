// mockDom.ts
export const sessionModalMock = `
  <div id="app">
    <center class="blue p-4">
      <div>
        <select class="form-select text-center" id="select">
          <option selected disabled value="Choose session">Choose Session</option>
          <option value="2013/2014">2013/2014</option>
          <option value="2024/2025">2024/2025</option>
          <option value="addSession">Add Session</option>
        </select>
      </div>
    </center>

    <div class="center px-2 py-1 w-50 text-center mx-auto isRelative grey darken-3"
         id="addSessionModal" style="z-index: 4">
      <span class="red-text isAbsolute hover" style="right: 8px; top: 0" id="closeModalBtn">
        <i class="fa fa-window-close" aria-hidden="true"></i>
      </span>
      <div>
        <p class="form-text white-text fw-bold">
          sessions should be written in the format <br />
          <span id="modalHelp"> YYYY/YYYY </span>four digits on each side
        </p>
        <input type="text" class="form-control my-0" id="sessionModalInput" />
        <br />
        <button disabled class="btn btn-primary w-100" id="addSessionBtn">add session</button>
      </div>
    </div>
  </div>
`;
export function getDomRefs() {
	return {
		selectElem: document.querySelector<HTMLSelectElement>("#select"),
		sessionModal: document.querySelector<HTMLDivElement>("#addSessionModal"),
		sessionModalInput:
			document.querySelector<HTMLInputElement>("#sessionModalInput"),
		modalSubmitBtn: document.querySelector<HTMLButtonElement>("#addSessionBtn"),
		modalHelp: document.querySelector<HTMLParagraphElement>("#modalHelp"),
		closeModalBtn: document.querySelector<HTMLSpanElement>("#closeModalBtn"),
	};
}
