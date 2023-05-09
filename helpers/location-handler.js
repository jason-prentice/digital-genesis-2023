import { deconstructHash } from "./hash-utils.js";
import { menu } from "../components/menu.js";
import { pageContainer } from "../components/page-container.js";
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

export const locationHandler = async () => {
    menu.clearActiveItem();
    

    const { path, params } = deconstructHash();
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
        textContainer.show(params);
    }
    document.title = route.title;
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
    
};
