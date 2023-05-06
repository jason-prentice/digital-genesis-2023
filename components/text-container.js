import { documentarySources } from "./documentary-sources.js";
import { teiContainer } from "./tei-container.js";
import { teiParallel } from "./tei-parallel.js";
import { outlinePanel } from "./outline-panel.js";
import { parallelPanel } from "./parallel-panel.js";
import { teiPanel } from "./tei-panel.js";
import { tools } from "./tools.js";

export const textContainer = {
    selector: '#text',
    setView: function(){	
        teiContainer.populate();
        teiParallel.clearHighlighting();
	    outlinePanel.clearHighlighting();
        teiPanel.setMainView();
        teiPanel.setVisibility();
        parallelPanel.setMainView();
        parallelPanel.setVisibility();
        parallelPanel.reset();
        documentarySources.setVisibility();
        outlinePanel.setVisibility();
        tools.setVisibility();
    }
}