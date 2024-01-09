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
    const { params } = deconstructHash();
    return params.get(param);
}


export const addParam = (params, paramToAdd, value) => {

    if (params) {
        params.delete(paramToAdd);
    }
    params.append(paramToAdd, value);
    return params;
}

export const deleteParam = (params, paramToDelete) => {
    if (params) {
        params.delete(paramToDelete);
    }
    return params;
}
 
export const getHref = modifications => {
    let { path, params } = deconstructHash();
    if (modifications) {
        modifications.forEach(modification => {
            const { func, param, value } = modification;
            params = func(params, param, value);
        });
    }
    
    return `${path}?${params.toString()}`;
}
