import CETEI from "../dependencies/CETEI.js";
import { mainViewMode } from "./main-view-mode.js";
import { teiAnchor } from "./tei-anchor.js";
import { teiParallel } from "./tei-parallel.js";
import { teiSection } from "./tei-section.js"
import { popover } from "./popover.js";
import { verseNumber } from "./verse-number.js";
import { getParamValue } from "../helpers/hash-utils.js";
import { 
	OUTLINE_VIEW, 
	PARALLEL_PARAM, 
	VIEW_PARAM, 
	CHAPTER_VIEW, 
	CHIASTIC_VIEW, 
	SECTION_VIEW 
} from "../helpers/constants.js";

export const teiContainer = {
    selector: "#TEI",
	defaultTei: "tei/gen_creation1_eden_cain-abel_noah-flood_babel_main_6.5.xml",
    compatibleViews: [CHAPTER_VIEW, CHIASTIC_VIEW, SECTION_VIEW],
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
				scrollToRequestedParallel();
			});	
	    } else {
		
			$(document).ready(function() {
			scrollToRequestedParallel();	
			});
		}
	   
    },
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
}

const scrollToRequestedParallel = () => {
	const requestedParallel = getParamValue(PARALLEL_PARAM);
	const selectedView = getParamValue(VIEW_PARAM);
	if (requestedParallel && selectedView !== OUTLINE_VIEW) {
		const element = document.getElementById(requestedParallel.replace("#",""));
		if (element) {
			element.scrollIntoView();
		} else {
			$(teiContainer.selector).scrollTop(0);
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




