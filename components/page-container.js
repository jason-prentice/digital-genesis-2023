export const pageContainer = {
    selector: "#page",
    hide: function(){
        $(this.selector).hide();
    },
    show: function(html){
        $(this.selector).load(html);
        $(this.selector).show();
    }
};