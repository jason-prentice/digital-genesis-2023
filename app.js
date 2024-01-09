import { locationHandler } from "./helpers/location-handler.js";

window.onpopstate = locationHandler;

locationHandler();
