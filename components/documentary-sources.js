export const documentarySources = {
	toggleSelector: "#sources-toggle",
	sources: ["yahwist","priestly"],
	setVisibility: function(){
		if(this.shouldBeVisible()){
			const sources = this.sources;
			sources.forEach(function(source){	
				$(`tei-seg[ana='#${source}']`).addClass(`show-${source}`);
			});
		} else {
			this.sources.forEach(function(source){
				$(`.show-${source}`).removeClass(`show-${source}`);
			});
			
		}
	},
	shouldBeVisible: function() {
		if($(this.toggleSelector).is(':checked')){
			return true;
		} else {
			return false;
		}
	},
};

$(document).on("change", documentarySources.toggleSelector, function() {
	documentarySources.setVisibility();
});
