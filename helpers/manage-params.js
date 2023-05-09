import { deconstructHash } from "./deconstruct-hash.js";

export const updateParam = (paramToUpdate, value, replace = true) => {
    const { path, params } = deconstructHash(window.location.hash);
    if (replace && params) {
        params.delete(paramToUpdate);
    }
    params.append(paramToUpdate, value);
    return `${path}?${params.toString()}`;
}

export const deleteParam = (paramToDelete) => {
    const { path, params } = deconstructHash(window.location.hash);
    if (params) {
        params.delete(paramToDelete);
    }
    return `${path}?${params.toString()}`;
}
