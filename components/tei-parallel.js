import { parallelPanel } from "./parallel-panel.js";

export const teiParallel = {
	selector: "#TEI tei-div[type='section'][corresp]",
	transform: function() {
		$(this.selector).each(function(){
			const newId = $(this).attr("xml\:id").replace("pr","'").replace(/_/g, " ");
			$(this).attr("display", newId);
		});
	},
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

