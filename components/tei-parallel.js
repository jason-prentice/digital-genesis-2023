import { parallelPanel } from "./parallel-panel.js";

export const teiParallel = {
	selector: "#TEI tei-div[type='section'][corresp]",

	handleMouseover: function(currentParallel) {
		if(parallelPanel.getVisibility()){
			this.clearHighlighting();
			$(currentParallel).addClass("active");
			const correspSelector = $(currentParallel).attr("corresp");
			parallelPanel.setHtml(correspSelector);
		}
	},
	clearHighlighting: function(){
		$(this.selector).removeClass("active");
	}
};

export const teiSection = {
	selector: "#TEI tei-div[type='section']",
};

$(document).on("mouseover", teiSection.selector, function(event) {
	const currentParallel = event.target.closest(teiParallel.selector);
	teiParallel.handleMouseover(currentParallel);
});