import CETEI from "../dependencies/CETEI.js";
import { teiAnchor } from "./tei-anchor.js";
import { teiParallel } from "./tei-parallel.js";
import { teiSection } from "./tei-section.js"
import { popover } from "./popover.js";
import { verseNumber } from "./verse-number.js";

export const teiContainer = {
    selector: "#TEI",
	defaultTei: "tei/gen_creation1_eden_cain-abel_noah-flood_babel_main_6.5.xml",
    populate: function(tei) {
		const currentSource = $(this.selector).attr("data-source");
		const selectedTei = tei || this.defaultTei;
		if (currentSource !== selectedTei) {
			const CETEIcean = new CETEI();
			$(this.selector).attr("data-source", selectedTei);
			const selector = this.selector;
			CETEIcean.getHTML5(selectedTei, function(data) {
				//Add CETEIcean output to teiContainer
				$(selector).html(data);		
				transformOutput();
			});	
	   }
		
	
    }
}

const transformOutput = () => {
	teiAnchor.addNoteIcon();
	teiAnchor.prepareNoteContent();
	teiParallel.transform();
	verseNumber.makeSuperscript();
	teiSection.addSectionTitles();
	popover.prepare();
}




