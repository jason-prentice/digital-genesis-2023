import { deconstructHash } from "./hash-utils.js";
import { menu } from "../components/menu.js";
import { pageContainer } from "../components/page-container.js";
import { textContainer } from "../components/text-container.js";

const pageTitle = "Genesis Digital Edition";

const routes = {
	404: {
		content: "pages/404.html",
		title: `404 | ${pageTitle}`,
		description: "Page not found",
	},
	"/": {
		content: "pages/home.html",
		title: `Home | ${pageTitle}`,
		description: "The home page",
	},
	"#/about": {
		content: "pages/about.html",
		title: `About Us | ${pageTitle}`,
		description: "This is the about page",
	},
	"#/bibliography": {
		content: "pages/bibliography.html",
		title: `Bibliography | ${pageTitle}`,
		description: "This is the project bibliography",
	},
    "#/introduction": {
		content: "pages/introduction.html",
		title: `Introduction | ${pageTitle}`,
		description: "This is the site introduction",
	},
    "#/text": {
        title: `Text | ${pageTitle}`,
        description: "The interactive digital text"
    },
    "#/visualizations": {
        content: "pages/visualizations/index.html",
        title: `Visualizations | ${pageTitle}`,
        description: "Data visualizations on the texts"
    },
    "#/commentary": {
        content: "pages/commentary/index.html",
        title: `Commentary | ${pageTitle}`,
        description: "Commentary on the text"
    }
};

export const locationHandler = async () => {
    menu.clearActiveItem();
    

    const { path, params } = deconstructHash();
    if (window.location.hash.length == 0) {
        menu.makeItemActive("/");
    } else {
        menu.makeItemActive(path);
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
