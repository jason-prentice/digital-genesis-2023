import { CHAPTER_VIEW, CHIASTIC_VIEW, OUTLINE_VIEW, PARALLEL_PARAM, SECTION_VIEW, VIEW_PARAM } from "../helpers/constants.js";
import { getHref, addParam, deleteParam, getParamValue } from "../helpers/hash-utils.js";
import { locationHandler } from "../helpers/location-handler.js";


export const mainViewMode = {
	selector: 'input[name="view"]',
	setSelectedView: function(selectedView){
		let modifications = [{func: addParam, param: VIEW_PARAM, value: selectedView}];

		if(selectedView === OUTLINE_VIEW) {
			modifications.push({func: deleteParam, param: PARALLEL_PARAM});
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
		let selectedView = getParamValue(VIEW_PARAM);
		if (!selectedView || !this.getViews().includes(selectedView)) { 
			selectedView = CHAPTER_VIEW;
			this.setSelectedView(selectedView);
		};
		return selectedView;
	},
	getViews: function(){
		return [CHAPTER_VIEW, CHIASTIC_VIEW, SECTION_VIEW, OUTLINE_VIEW];
	}
};

$(document).on("change", mainViewMode.selector, function(event) {
	const selectedView = event.currentTarget.value;
	mainViewMode.setSelectedView(selectedView);
});