import { capitalizeTitle } from "../helpers/capitalize-title.js";
import { teiParallel } from "./tei-parallel.js";
import { getParamValue } from "../helpers/hash-utils.js";
import { EXCERPT_PARAM } from "../helpers/constants.js";


export const teiSection = {
	selector: "#TEI tei-div[type='section']",
    titleSelector: '#TEI tei-div[ana]',
    addSectionTitles: function() {
        $(this.titleSelector).each(function(){
			const prettyAna = capitalizeTitle($(this).attr("ana"));
			const level = $(this).parentsUntil($('tei-body'), 'tei-div[ana]').length;
			$(this).prepend(`<span class='sectionTitle' level='${level}'>${prettyAna}</span>`)
		});		
	},
	showSelectedExcerpt: function(){
	
		const selectedExcerpt = getParamValue(EXCERPT_PARAM);
	
		if (selectedExcerpt) {
			$(this.titleSelector).hide();
			$(`${this.selector}[ana='${selectedExcerpt}']`).show();
			$(`${this.selector}[ana='${selectedExcerpt}'] tei-div`).show();
		} else {
			$(this.titleSelector).show();
		}
	
	}
};

$(document).on("mouseover", teiSection.selector, function(event) {
	const currentParallel = event.target.closest(teiParallel.selector);
	teiParallel.handleMouseover(currentParallel);
});