import CETEI from "../dependencies/CETEI.js";
import { mainViewMode } from "./main-view-mode.js";
import { teiAnchor } from "./tei-anchor.js";
import { teiParallel } from "./tei-parallel.js";
import { teiSection } from "./tei-section.js"
import { popover } from "./popover.js";
import { verseNumber } from "./verse-number.js";
import { deconstructHash } from "../helpers/hash-utils.js";

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
	   scrollToRequestedParallel();
    }
}

const scrollToRequestedParallel = () => {
	const { params } = deconstructHash();
	if (params) {
		const requestedParallel = params.get('parallel');
		if (requestedParallel) {
			const element = document.getElementById(requestedParallel.replace("#",""));
			if (element) {
				element.scrollIntoView();
			} else {
				$(teiContainer.selector).scrollTop(0);
			}
		}
	} else {
		$(teiContainer.selector).scrollTop(0);
	}
};

const transformOutput = () => {
	teiAnchor.addNoteIcon();
	teiAnchor.prepareNoteContent();
	teiParallel.transform();
	verseNumber.makeSuperscript();
	teiSection.addSectionTitles();
	popover.prepare();
};




