import { mainViewMode } from "../components/mainViewMode.js";
import { parallelPanel } from "../components/parallelPanel.js";

export const outlinePanel = {
	selector: "#outline",
	outlineLinkSelector: "#outline .outline-link",
	htmlSectionSelector: "#outlineHtml",
	compatibleViews: ["outline-view"],
	setVisibility: function(){
		const selectedView = mainViewMode.getSelectedView();
		if(this.compatibleViews.includes(selectedView)){
			$(this.selector).show();
		} else {
			$(this.selector).hide();
		}
	},
	handleMouseover: function(currentOutlineLink){
		if(parallelPanel.getVisibility()){
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