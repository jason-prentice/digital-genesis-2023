import { textContainer } from "../components/textContainer.js";

const pageTitle = "Genesis Digital Edition";

$(".nav-item").on("click", function(event) {
	const { target } = event;
    event.preventDefault();
    handleRoute();
});


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
		title: "Introduction | " + pageTitle,
		description: "This is the site introduction",
	},
};

const handleRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
}

const locationHandler = async () => {
    
    $(".nav-item").removeClass('active');
    if (!window.location.hash || window.location.hash.startsWith("#/")) {
        var location = window.location.hash.replace("#/", "");

        if (location.length == 0) {
            location = "/";
        }
    
        const route = routes[location] || routes["404"];
       
        if (!["/", ""].includes(location)) {
            $("#page").load(route.content);
            $("#page").show();
            $("#text").hide();
            $(".nav-item[href='#/" + location + "'").addClass("active");
        } else {
            $(".nav-item[href='/'").addClass("active");
            $("#page").hide();
            $("#text").show();  
            textContainer.setView();
            $("#text").removeClass("hidden");
        }
        document.title = route.title;
        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", route.description);
    } else {
        $(".nav-item[href='/'").addClass("active");
        $("#page").hide();
        $("#text").show(); 
        textContainer.setView();
        $("#text").removeClass("hidden");
       
        
        const element = document.getElementById(window.location.hash.replace("#",""));
        if (element) {
            element.scrollIntoView();
        }
    }
	
};

window.addEventListener("hashchange", locationHandler);
window.onpopstate = locationHandler;

locationHandler();
