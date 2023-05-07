import { menu } from "../components/menu.js";
import { pageContainer } from "../components/page-container.js";
import { parallelPanel } from "../components/parallel-panel.js";
import { teiContainer } from "../components/tei-container.js";
import { textContainer } from "../components/text-container.js";

const pageTitle = "Genesis Digital Edition";

const routes = {
	404: {
		content: "includes/404.html",
		title: `404 | ${pageTitle}`,
		description: "Page not found",
	},
	"/": {
		content: "includes/home.html",
		title: `Home | ${pageTitle}`,
		description: "The home page",
	},
	"#/about": {
		content: "includes/about.html",
		title: `About Us | ${pageTitle}`,
		description: "This is the about page",
	},
	"#/bibliography": {
		content: "includes/bibliography.html",
		title: `Bibliography | ${pageTitle}`,
		description: "This is the project bibliography",
	},
    "#/introduction": {
		content: "includes/introduction.html",
		title: `Introduction | ${pageTitle}`,
		description: "This is the site introduction",
	},
    "#/text": {
        title: `Text | ${pageTitle}`,
        description: "The interactive digital text"
    }
};

$(menu.navItemSelector).on("click", function(event) {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
});

$(`${parallelPanel.parallelLinkSelector} a`).on("click", function(event) {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
});

const deconstructHash = hash => {
   
    if (!hash || hash === "/" || !hash.startsWith("#/")) {
        return {
            path: "/"
        };
    }
    
    const segments = hash.split("?");
   
    const path = segments[0];
    if (segments.length !== 2) {
        return {
            path
        }
    }
    
    return {
        path, 
        params: new URLSearchParams(segments[1])
    };
}

const locationHandler = async () => {
    menu.clearActiveItem();
   

    const { path, params } = deconstructHash(window.location.hash);
    if (window.location.hash.length == 0) {
        menu.makeItemActive(`${menu.navItemSelector}[href='/']`);
    } else {
        menu.makeItemActive(`${menu.navItemSelector}[href='${path}']`);
    }

    const route = routes[path] || routes["404"];

    if (path !== "#/text") {
        pageContainer.show(route.content);
        textContainer.hide();
    } else {
        pageContainer.hide();
        textContainer.show();

        if (params) {
            const requestedParallel = params.get('parallel');
            const element = document.getElementById(requestedParallel.replace("#",""));
            if (element) {
                element.scrollIntoView();
            } else {
                $(teiContainer.selector).scrollTop(0);
            }
        } else {
            $(teiContainer.selector).scrollTop(0);
        }
        
    }
    document.title = route.title;
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
	
};

window.onpopstate = locationHandler;

locationHandler();
