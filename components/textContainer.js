import { documentarySources } from "./documentarySources.js";
import { teiParallel } from "./teiParallel.js";
import { outlinePanel } from "./outlinePanel.js";
import { parallelPanel } from "./parallelPanel.js";
import { teiPanel } from "./teiPanel.js";
import { tools } from "./tools.js";

export const textContainer = {
    selector: '#text',
    setView: function(){	
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