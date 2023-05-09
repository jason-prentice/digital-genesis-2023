
import { getHref, addParam, deleteParam, getParamValue } from "../helpers/hash-utils.js";
import { locationHandler } from "../helpers/location-handler.js";


export const mainViewMode = {
	selector: 'input[name="view"]',
	setSelectedView: function(selectedView){
		let modifications = [{func: addParam, param: "view", value: selectedView}];

		if(selectedView === "outline-view") {
			modifications.push({func: deleteParam, param: "parallel"});
		}
		const href = getHref(modifications);

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