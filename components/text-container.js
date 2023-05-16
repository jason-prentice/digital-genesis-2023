import { documentarySources } from "./documentary-sources.js";
import { mainViewMode } from "./main-view-mode.js";
import { teiContainer } from "./tei-container.js";
import { teiParallel } from "./tei-parallel.js";
import { outlinePanel } from "./outline-panel.js";
import { parallelPanel } from "./parallel-panel.js";
import { tools } from "./tools.js";

export const textContainer = {
    selector: '#text',
    hide: function(){
        $(this.selector).hide();
    },
    show: function(){
        mainViewMode.showSelectedView();	
        teiContainer.populate();
        teiParallel.clearHighlighting();
	    outlinePanel.clearHighlighting();
        teiContainer.setMainView();
        teiContainer.setVisibility();
        parallelPanel.setMainView();
        parallelPanel.setVisibility();
        documentarySources.setVisibility();
        outlinePanel.setVisibility();
        tools.setVisibility();
        $(this.selector).removeClass("hidden");
        $(this.selector).show();
    }
}