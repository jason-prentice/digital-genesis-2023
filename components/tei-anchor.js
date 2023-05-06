export const teiAnchor = {
    selector: "tei-anchor",
    addNoteIcon: function(){
        $(this.selector).html("<sup><i class='far fa-comment-alt light'></i><sup>");
    },
    getNoteSelector: function(){
        const id = $(this.selector).attr('id');
        return `tei-note[target="#${id}"]`;
    },
    prepareNoteContent: function(){
        const noteSelector = this.getNoteSelector();
        $(this.selector).wrap(function(){
            let html = $(noteSelector).find('[hidden]').html();
            if(html){
                html = html.replace(/"/g, "&quot;");
                html = html.replace(/[.\s]+Comment:/g, "<hr />Comment:");
                html = html.replace(/[.\s]+Alt\. Trans\.:/g, "<hr />Alt. Trans.:");
                return `<a tabindex="0" data-toggle="popover" data-trigger="focus" data-content="${html}" />` ;
            }
            return false;
        });      
    }
}
