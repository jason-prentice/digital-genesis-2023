
import { updateParam, deleteParam, getParamValue } from "../helpers/hash-utils.js";
import { locationHandler } from "../helpers/location-handler.js";


export const mainViewMode = {
	selector: 'input[name="view"]',
	setSelectedView: function(selectedView){
		let href = updateParam("view", selectedView);
		// console.log (`href ${href}`)

		// if(selectedView === "outline-view") {
		// 	href = deleteParam("parallel");
		// }
		// console.log (`href ${href}`)

		window.history.pushState({}, "", href);
    	locationHandler();
	},
	showSelectedView: function(){
		const selectedView = this.getSelectedView();
		$(`${this.selector}[value='${selectedView}']`).prop('checked', true);

	},
	getSelectedView: function(){
		let selectedView = getParamValue("view");
		if (!selectedView || !this.getViews().includes(selectedView)) { 
			selectedView = "chapter-view";
			this.setSelectedView(selectedView);
		};
		return selectedView;
	},
	getViews: function(){
		return ["chapter-view","chiastic-view","section-view","outline-view"];
	}
};

$(document).on("change", mainViewMode.selector, function(event) {
	const selectedView = event.currentTarget.value;
	mainViewMode.setSelectedView(selectedView);
});