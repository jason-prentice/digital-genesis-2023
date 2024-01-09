import { CHAPTER_VIEW, CHIASTIC_VIEW, OUTLINE_VIEW, PARALLEL_PARAM, SECTION_VIEW, VIEW_PARAM, EXCERPT_PARAM, SOURCE_PARAM } from "../helpers/constants.js";
import { getHref, addParam, deleteParam, getParamValue } from "../helpers/hash-utils.js";
import { locationHandler } from "../helpers/location-handler.js";


export const mainViewMode = {
	selector: '.main-view-mode',
	setSelectedView: function(selectedView, selectedExcerpt){		
		let modifications = [
			{func: addParam, param: VIEW_PARAM, value: selectedView}
		];

		if (selectedExcerpt) {
			modifications.push({func: addParam, param: EXCERPT_PARAM, value: selectedExcerpt});
			modifications.push({func: deleteParam, param: PARALLEL_PARAM});
		} else {
			modifications.push({func: deleteParam, param: EXCERPT_PARAM});
		}

		// if (selectedSource) {
		// 	modifications.push({func: addParam, param: SOURCE_PARAM, value: selectedSource});
		// } else {
		// 	modifications.push({func: deleteParam, param: SOURCE_PARAM});
		// }

		if(selectedView === OUTLINE_VIEW) {
			modifications.push({func: deleteParam, param: PARALLEL_PARAM});
		}

		const href = getHref(modifications);

		window.history.pushState({}, "", href);
    	locationHandler();
	},
	showSelectedView: function(){
		const { selectedView, selectedExcerpt } = this.getSelectedView();
		$(`#text-menu button`).removeClass("active");
		$("[data-view]").removeClass("active");
		if (selectedView === CHAPTER_VIEW ) {
			$(`button[data-view='${selectedView}']`).addClass("active");
		}
		$(`[data-view='${selectedView}'][data-selector='${selectedExcerpt}']`).addClass("active");
		$(`[data-view='${selectedView}'][data-selector='${selectedExcerpt}']`).closest(".dropdown-menu").siblings("button").addClass("active");

	},
	getSelectedView: function(){
		let selectedView = getParamValue(VIEW_PARAM);
		const selectedExcerpt = getParamValue(EXCERPT_PARAM);
		const selectedSource = getParamValue(SOURCE_PARAM);
		if (!selectedView || !this.getViews().includes(selectedView)) { 
			selectedView = CHAPTER_VIEW;
			this.setSelectedView(selectedView);
		};
		return {selectedView, selectedExcerpt, selectedSource};
	},
	getViews: function(){
		return [CHAPTER_VIEW, CHIASTIC_VIEW, SECTION_VIEW, OUTLINE_VIEW];
	}
};

$(document).on("click", mainViewMode.selector, function(event) {
	const selectedView = event.currentTarget.getAttribute("data-view");
	const selectedExcerpt = event.currentTarget.getAttribute("data-selector");
	// const selectedSource = event.currentTarget.getAttribute("data-source");
	mainViewMode.setSelectedView(selectedView, selectedExcerpt);
	event.preventDefault();
});