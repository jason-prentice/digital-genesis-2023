import { capitalizeTitle } from "../js/capitalize-title.js";
import { teiParallel } from "./tei-parallel.js";

export const teiSection = {
	selector: "#TEI tei-div[type='section']",
    titleSelector: '#TEI tei-div[ana]',
    addSectionTitles: function() {
        $(this.titleSelector).each(function(){
		const prettyAna = capitalizeTitle($(this).attr("ana"));
		const level = $(this).parentsUntil($('tei-body'), 'tei-div[ana]').length;
		$(this).prepend(`<span class='sectionTitle' level='${level}'>${prettyAna}</span>`)
	})
}
};

$(document).on("mouseover", teiSection.selector, function(event) {
	const currentParallel = event.target.closest(teiParallel.selector);
	teiParallel.handleMouseover(currentParallel);
});