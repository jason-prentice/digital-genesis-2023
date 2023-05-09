export const deconstructHash = hash => {
   
    if (!hash || hash === "/" || !hash.startsWith("#/")) {
        return {
            path: "/",
            params: new URLSearchParams()
        };
    }
    
    const segments = hash.split("?");
   
    const path = segments[0];
    if (segments.length !== 2) {
        return {
            path,
            params: new URLSearchParams()
        }
    }
    const params = new URLSearchParams(segments[1]);
    return {
        path, 
        params
    };
};