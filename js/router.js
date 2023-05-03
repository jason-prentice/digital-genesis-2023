const pageTitle = "Genesis Digital Edition";

const routes = {
	404: {
		content: "includes/404.html",
		title: "404 | " + pageTitle,
		description: "Page not found",
	},
	"/": {
		content: "includes/index.html",
		title: "Home | " + pageTitle,
		description: "The interactive Genesis text",
	},
	about: {
		content: "includes/about.html",
		title: "About Us | " + pageTitle,
		description: "This is the about page",
	},
	bibliography: {
		content: "includes/bibliography.html",
		title: "Bibliography | " + pageTitle,
		description: "This is the project bibliography",
	},
    introduction: {
		content: "includes/introduction.html",
		title: "Bibliography | " + pageTitle,
		description: "This is the site introduction",
	},
};

const locationHandler = async () => {
    console.log(window.location.hash)
    if (window.location.hash.startsWith("#/")) {
        console.log("page change")
        var location = window.location.hash.replace("#/", "");

        if (location.length == 0) {
            location = "/";
        }
        console.log(location)
    
        const route = routes[location] || routes["404"];
        $(".nav-item").removeClass('active');
        if (location !== "/") {
            console.log("page")
            //const html = await fetch(route.content).then((response) => response.text());
            //document.getElementById("page").innerHTML = html;
            $("#page").load(route.content);
            $("#page").show();
            $("#text").hide();
            $(".nav-item[href='#" + location + "'").addClass("active");
        } else {
            console.log(text)
            $(".nav-item[href='/'").addClass("active");
            $("#page").hide();
            $("#text").show();
        }
        document.title = route.title;
        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", route.description);
    }
	
};

window.addEventListener("hashchange", locationHandler);
window.addEventListener("onload", locationHandler)

locationHandler();
