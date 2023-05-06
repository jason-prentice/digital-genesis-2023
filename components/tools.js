import { mainViewMode } from "../components/mainViewMode.js";

export const tools = {
	selector: "#interp",
	toggleSelector:"#tools-toggle",
	toggleLabelSelector:"#tools-toggle-label",
	closeSelector: ".close[data-for='interp']",
	compatibleViews: ["chapter-view", "chiastic-view", "outline-view", "section-view"],
	setVisibility: function(){
		const selectedView = mainViewMode.getSelectedView();
		if(this.compatibleViews.includes(selectedView)){

			if($(this.toggleSelector).is(':checked')){
				$(this.selector).show();
				$(this.toggleLabelSelector).hide();
			} else{
				$(this.selector).hide();
				$(this.toggleLabelSelector).show();
			}
		} else {
			$(this.selector).hide();
			$(this.toggleLabelSelector).hide();
		}
	}
};

$(document).on("click", tools.toggleLabelSelector, function() {
	$(tools.toggleSelector).prop('checked', true);
	tools.setVisibility();
});
$(document).on("click", tools.closeSelector, function() {
	$(tools.toggleSelector).prop('checked', false);
	tools.setVisibility();
});

$( document ).on("click",".accordion", function() {	
    const panel = $(this).next();
    const arrow = $(this).find('.arrow');
    if (panel.css('max-height')==="0px"){
      panel.css('max-height',"800px");
      arrow.removeClass('fa-chevron-down');
      arrow.addClass('fa-chevron-up');
    } else {
    	panel.css('max-height','0px');
    	arrow.removeClass('fa-chevron-up');
      	arrow.addClass('fa-chevron-down');
    } 
});
