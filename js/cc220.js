import { teiPanel } from "../components/tei-panel.js";

const prepareNotePopovers = function(selector){
	$(function () {
		$(`${selector} [data-toggle="popover"]`)
		.popover({
			container: selector, 
			html: true, 
			placement: "bottom", 
			sanitize: false
		});
	});
};

function capitalizeTitle(title) {
	const lowercaseWords = ["the", "an", "a", "of", "for", "in", "under", "with", "on", "in"];
	return title.split("_").map((word, index) => {
		if (index === 0 ||
			lowercaseWords.indexOf(word.toLowerCase()) === -1) {
			return word.substring(0, 1).toUpperCase() + word.substring(1);
		}
		return word.toLowerCase();
		
	}).join(" ");
}


/*** CETEIcean ***/

/*Convert a TEI document to HTML and insert into #TEI.*/

if (CETEI) {
	const CETEIcean = new CETEI()
	CETEIcean.getHTML5("tei/gen_creation1_eden_cain-abel_noah-flood_babel_main_6.5.xml", function(data) {
		document.getElementById("TEI").appendChild(data);		
		$('tei-anchor').wrap(function(){
			const ID = $(this).attr('id');
			const selector = `tei-note[target="#${ID}"]`;
			let html = $(selector).find('[hidden]').html();
			if(html){
				html = html.replace(/"/g, "&quot;");
				html = html.replace(/[.\s]+Comment:/g, "<hr />Comment:");
				html = html.replace(/[.\s]+Alt\. Trans\.:/g, "<hr />Alt. Trans.:");
				return `<a tabindex="0" data-toggle="popover" data-trigger="focus" data-content="${html}" />` ;
			}
			return false;
		});  
		$('tei-div[type="section"][corresp]').each(function(){
			const newId = $(this).attr("xml\:id").replace("pr","'").replace(/_/g, " ");
			$(this).attr("display", newId);
		});
		$("tei-seg[type='verse']").wrap("<sup />");
		$("tei-anchor").html("<sup><i class='far fa-comment-alt light'></i><sup>");
		$('tei-div[ana]').each(function(){
			const prettyAna = capitalizeTitle($(this).attr("ana"));
			const level = $(this).parentsUntil($('tei-body'), 'tei-div[ana]').length;
			$(this).prepend(`<span class='sectionTitle' level='${level}'>${prettyAna}</span>`)
		})
		prepareNotePopovers(teiPanel.selector);
	});	
}
