import Request, { getHostUrl } from 'site/common/request';

export const LOAD_DATA = 'LOAD_SITES_DATA';
export const SEARCH = 'SITES_SEARCH';

export function fetchData() {
    return dispatch => {
        Request.get({
            url: getHostUrl() + '/sites'
        }).then(xhr => {
            const data = JSON.parse(xhr.response);
            dispatch({
                data: data.sites,
                type: LOAD_DATA
            });
        }).catch(error => {
            console.log(error);
        });
    }
}

export function search(searchText) {
    return {
        searchText,
        type: SEARCH
    };
}
