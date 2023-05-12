export const teiAnchor = {
    selector: "tei-anchor",
    addNoteIcon: function(){
        $(this.selector).html(`<sup><i class='far fa-comment-alt light'></i><sup>`);
        $(this.selector).attr("data-toggle", "modal");
        $(this.selector).attr("data-target", "#noteModal") 
    }
};


$("#noteModal").on('show.bs.modal', function (event) {
    const noteAnchor = $(event.relatedTarget) // Button that triggered the modal
    const id = noteAnchor.attr("id");
    const noteSelector = `tei-note[target="#${id}"]`;
    let html = $(noteSelector).find('[hidden]').html();
    if(html){
        html = html.replace(/"/g, "&quot;");
        html = html.replace(/[.\s]+Comment:/g, "<hr />Comment:");
        html = html.replace(/[.\s]+Alt\. Trans\.:/g, "<hr />Alt. Trans.:");
    }
    const modal = $(this)
    modal.find('.modal-body').html(html);
});
