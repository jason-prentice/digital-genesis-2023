export const teiAnchor = {
    selector: "tei-anchor",
    addNoteIcon: function(){
        $(this.selector).html("<sup><i class='far fa-comment-alt light'></i><sup>");
    },
    prepareNoteContent: function(){
        $(this.selector).wrap(function(){
            const id = $(this).attr('id');
            const noteSelector = `tei-note[target="#${id}"]`;
            let html = $(noteSelector).find('[hidden]').html();
            if(html){
                html = html.replace(/"/g, "&quot;");
                html = html.replace(/[.\s]+Comment:/g, "<hr />Comment:");
                html = html.replace(/[.\s]+Alt\. Trans\.:/g, "<hr />Alt. Trans.:");
                return `<a tabindex="0" data-toggle="popover" data-trigger="focus" title="thing" data-content="${html}" />` ;
            }
            return false;
        });       
    }
}
