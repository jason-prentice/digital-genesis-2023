import { OUTLINE_VIEW } from "../helpers/constants.js";
import { mainViewMode } from "./main-view-mode.js";
import { parallelPanel } from "./parallel-panel.js";

export const outlinePanel = {
	selector: "#outline",
	outlineLinkSelector: "#outline .outline-link",
	htmlSectionSelector: "#outlineHtml",
	compatibleViews: [OUTLINE_VIEW],
	setVisibility: function(){
		const { selectedView } = mainViewMode.getSelectedView();
		if(this.compatibleViews.includes(selectedView)){
			$(this.selector).show();
		} else {
			$(this.selector).hide();
		}
	},
	handleMouseover: function(currentOutlineLink){
		if(parallelPanel.shouldBeVisible()){
			this.clearHighlighting();
			$(currentOutlineLink).addClass("active");
			const parallelSelector = $(currentOutlineLink).attr("data-parallel");
			parallelPanel.setHtml(parallelSelector);
		}
	},
	clearHighlighting: function(){
		$(this.outlineLinkSelector).removeClass("active");
	}
};

$(document).on("mouseover", outlinePanel.outlineLinkSelector, function() {
	outlinePanel.handleMouseover(this);
});