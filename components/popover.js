export const popover = {
    prepare: function(){
        $(`#TEI [data-toggle="popover"]`)
        .popover({
            container: "#TEI", 
            html: true, 
            sanitize: false
        });
    }
}

