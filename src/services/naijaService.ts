import naijaStates from "naija-state-local-government";

export const naijaService = {
	getStates: function () {
		return naijaStates.states();
	},
	getLgasByState: function (state: string) {
		return naijaStates.lgas(state).lgas;
	},
};
