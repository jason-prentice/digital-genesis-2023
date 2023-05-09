export const deconstructHash = () => {

    const hash = window.location.hash;
   
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

export const getParamValue = (param) => {
    const { path, params } = deconstructHash();
    return params.get(param);
}


export const updateParam = (paramToUpdate, value, replace = true) => {
    const { path, params } = deconstructHash();
    if (replace && params) {
        params.delete(paramToUpdate);
    }
    params.append(paramToUpdate, value);
    return `${path}?${params.toString()}`;
}

export const deleteParam = (paramToDelete) => {
    const { path, params } = deconstructHash();
    if (params) {
        params.delete(paramToDelete);
    }
    return `${path}?${params.toString()}`;
}
