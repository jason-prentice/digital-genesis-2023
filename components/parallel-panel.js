import { locationHandler } from "../helpers/location-handler.js";
import { teiParallel } from "./tei-parallel.js";
import { mainViewMode } from "./main-view-mode.js";
import { outlinePanel } from "./outline-panel.js";
import { getHref, addParam, deleteParam } from "../helpers/hash-utils.js";

export const parallelPanel = {
	selector: "#parallel",
	htmlSectionSelector: "#parallelHtml",
	parallelLinkSelector: "#parallelLink",
	toggleSelector: "#parallel-toggle",
	toggleLabelSelector: "label[for='parallel-toggle']",
	compatibleViews: ["chapter-view", "chiastic-view", "outline-view", "section-view"],
	defaultHtml: {
		contents: "<p class='small'><i>Hover over a section of the outline to view the full contents in this panel.</i></p>",
		parallel: "<p class='small'><i>Hover over a section of the text to view its parallel in this panel.</i></p>"
	},
	setVisibility: function() {
		if(this.shouldBeVisible(mainViewMode)){
			$(this.selector).show();
		} else {
			$(this.selector).hide();
			this.reset();
			teiParallel.clearHighlighting();
			outlinePanel.clearHighlighting();
		}
	},
	shouldBeVisible: function() {
		const selectedView = mainViewMode.getSelectedView();
		if(this.compatibleViews.includes(selectedView)){
			if($(this.toggleSelector).is(':checked')){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	reset: function() {
		const selectedView = mainViewMode.getSelectedView();
		if (this.compatibleViews.includes(selectedView)){
			$(this.toggleSelector).show();
			$(this.toggleLabelSelector).show();
		} else {
			$(this.toggleSelector).hide();
			$(this.toggleLabelSelector).hide();
		}
		if(selectedView === "outline-view"){
			$(this.toggleLabelSelector).text("Show section text");
			$(this.htmlSectionSelector).html(this.defaultHtml.contents);
		} else {
			$(this.toggleLabelSelector).text("Show parallels");
			$(this.htmlSectionSelector).html(this.defaultHtml.parallel);
		}
	},
	setHtml: function(sectionSelector) {
		const selectedView = mainViewMode.getSelectedView();
		if(selectedView === "outline-view"){
			if(sectionSelector) {
				const html = $(sectionSelector).html();

				$(this.htmlSectionSelector).html(html);
				$(this.htmlSectionSelector).find('a[data-toggle="popover"]').remove();
				
			} else {
				$(this.htmlSectionSelector).html(this.defaultHtml.contents);
			}
		} else {
			if(sectionSelector){
				const partnerId = $(`${teiParallel.selector}[corresp='${sectionSelector}']`).attr("id");
				
				$(this.htmlSectionSelector).html(`<span id='parallelLink' data-section='${sectionSelector}' data-corresp='#${partnerId}'>Parallel: <a href='#'>${$(sectionSelector).attr("display")}</a></span>${$(sectionSelector).html()}`);
				$(this.htmlSectionSelector).find('a[data-toggle="popover"]').remove();
			} else {
				$(this.htmlSectionSelector).html("<span id='parallelLink'>Parallel: none</span>");
			}
		}
	},
	setMainView: function(){
		const selectedView = mainViewMode.getSelectedView();
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

$(document).on("change", parallelPanel.toggleSelector, function() {
	parallelPanel.setVisibility();
})

$(document).on("click", parallelPanel.parallelLinkSelector , function(event) {
	parallelPanel.setHtml($(parallelPanel.parallelLinkSelector).attr("data-corresp"));
    event.preventDefault();
	const parallel = event.currentTarget.getAttribute("data-section");
	
	let href;
	if (parallel) {
		href = getHref([{func: addParam, param: "parallel", value: parallel.replace("#","")}]);
	} else {
		href = getHref([{func: deleteParam, param: "parallel"}]);
	}
	
    window.history.pushState({}, "", href);
    locationHandler();
});