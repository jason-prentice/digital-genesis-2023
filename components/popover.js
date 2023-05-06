export const popover = {
    prepare: function(){
        $(`#TEI [data-toggle="popover"]`)
        .popover({
            container: "#TEI", 
            html: true, 
            placement: "bottom", 
            sanitize: false
        });
    }
}

