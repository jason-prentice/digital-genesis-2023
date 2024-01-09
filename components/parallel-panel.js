import { locationHandler } from "../helpers/location-handler.js";
import { teiParallel } from "./tei-parallel.js";
import { mainViewMode } from "./main-view-mode.js";
import { outlinePanel } from "./outline-panel.js";
import { getHref, addParam, deleteParam, getParamValue } from "../helpers/hash-utils.js";
import { CHAPTER_VIEW, CHIASTIC_VIEW, OUTLINE_VIEW, PARALLEL_PARAM, SECTION_VIEW, SHOW_SECTION_PARAM } from "../helpers/constants.js";

export const parallelPanel = {
	selector: "#parallel",
	htmlSectionSelector: "#parallelHtml",
	parallelLinkSelector: "#parallelLink",
	toggleSelector: "#parallel-toggle",
	toggleOnSelector:"#parallel-toggle-on",
	toggleOffSelector:"#parallel-toggle-off",
	compatibleViews: [CHAPTER_VIEW, CHIASTIC_VIEW, OUTLINE_VIEW, SECTION_VIEW],
	defaultHtml: {
		contents: "<p class='small'><i>Hover over a section of the outline to view the full contents in this panel.</i></p>",
		parallel: "<p class='small'><i>Hover over a section of the text to view its parallel in this panel.</i></p>"
	},
	setVisibility: function() {
		if(this.shouldBeVisible()){
			$(this.selector).show();
			$(this.toggleOffSelector).hide();
			$(this.toggleOnSelector).show();
		} else {
			$(this.selector).hide();
			$(this.toggleOffSelector).show();
			$(this.toggleOnSelector).hide();
			this.reset();
			teiParallel.clearHighlighting();
			outlinePanel.clearHighlighting();
		}
		this.reset();
	},
	shouldBeVisible: function() {
		const { selectedView } = mainViewMode.getSelectedView();
		if(this.compatibleViews.includes(selectedView)){
			const param = getParamValue(SHOW_SECTION_PARAM);
			if(param === "true"){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	reset: function() {
		const { selectedView } = mainViewMode.getSelectedView();
		if({ selectedView } === OUTLINE_VIEW){
			$(`${this.toggleSelector} span[class="content"]`).show();
			$(`${this.toggleSelector} span[class="parallel"]`).hide();

			$(this.htmlSectionSelector).html(this.defaultHtml.contents);
		} else {
			$(`${this.toggleSelector} span[class="content"]`).hide();
			$(`${this.toggleSelector} span[class="parallel"]`).show();
			$(this.htmlSectionSelector).html(this.defaultHtml.parallel);
		}
	},
	setHtml: function(sectionSelector) {
		const { selectedView } = mainViewMode.getSelectedView();
		if(selectedView === OUTLINE_VIEW){
			if(sectionSelector) {
				const html = $(sectionSelector).html();

				$(this.htmlSectionSelector).html(html);
				
			} else {
				$(this.htmlSectionSelector).html(this.defaultHtml.contents);
			}
		} else {
			if(sectionSelector){
				const partnerId = $(`${teiParallel.selector}[corresp='${sectionSelector}']`).attr("id");
				
				$(this.htmlSectionSelector).html(`<span id='parallelLink' data-section='${sectionSelector}' data-corresp='#${partnerId}'>Parallel: <a href='#'>${$(sectionSelector).attr("display")}</a></span>${$(sectionSelector).html()}`);
			} else {
				$(this.htmlSectionSelector).html("<span id='parallelLink'>Parallel: none</span>");
			}
		}
	},
	setMainView: function(){
		const { selectedView } = mainViewMode.getSelectedView();
		const selector = this.selector;
		const views = mainViewMode.getViews();
		views.forEach(function(view){
			if(view !== selectedView){
				$(selector).removeClass(view);
			}
		})
		$(selector).addClass(selectedView);
	}
};

$(document).on("click", parallelPanel.toggleSelector, function() {
	const currentVisibility = parallelPanel.shouldBeVisible();
	let href;
	if (currentVisibility) {
		href = getHref([	
			{func: deleteParam, param: SHOW_SECTION_PARAM}
		]);
	} else {
		href = getHref([
			{func: addParam, param: SHOW_SECTION_PARAM, value: true}
		]);

	}			
			
	window.history.pushState({}, "", href);
	locationHandler();
})

$(document).on("click", parallelPanel.parallelLinkSelector , function(event) {
	parallelPanel.setHtml($(parallelPanel.parallelLinkSelector).attr("data-corresp"));
    event.preventDefault();
	const parallel = event.currentTarget.getAttribute("data-section");
	
	let href;
	if (parallel) {
		href = getHref([{func: addParam, param: PARALLEL_PARAM, value: parallel.replace("#","")}]);
	} else {
		href = getHref([{func: deleteParam, param: PARALLEL_PARAM}]);
	}
	
    window.history.pushState({}, "", href);
    locationHandler();
});