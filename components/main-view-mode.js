
import { textContainer } from "./text-container.js";


export const mainViewMode = {
	selector: 'input[name="view"]',
	setSelectedView: function(selectedView){
		$(`${this.selector}[value='${selectedView}']`).prop('checked', true);
	},
	getSelectedView: function(){
		let selectedView = $(`${this.selector}:checked`).val();
		if (!selectedView) { 
			selectedView = "chapter-view";
			this.setSelectedView(selectedView);
		};
		return selectedView;
	},
	getViews: function(){
		return ["chapter-view","chiastic-view","section-view"];
	}
};

$(document).on("change", mainViewMode.selector, function() {
	textContainer.show();
});