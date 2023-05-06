import { mainViewMode } from "../components/mainViewMode.js";

export const teiPanel = {
	selector: "#TEI",
	compatibleViews: ["chapter-view", "chiastic-view", "section-view"],
	setMainView: function(){
		const selector = this.selector;
		const selectedView = mainViewMode.getSelectedView();

		const views = mainViewMode.getViews();
		views.forEach(function(view){
			if(view !== selectedView){
				$(selector).removeClass(view);
			}
		})
		$(selector).addClass(selectedView);
	},
	setVisibility: function(){
		const selectedView = mainViewMode.getSelectedView();
		if(this.compatibleViews.includes(selectedView)){
			$(this.selector).show();
		} else {
			$(this.selector).hide();
		}
	}
};