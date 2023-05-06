export const verseNumber = {
    selector: "tei-seg[type='verse']",
    makeSuperscript: function(){
        $(this.selector).wrap("<sup />")
    }
}