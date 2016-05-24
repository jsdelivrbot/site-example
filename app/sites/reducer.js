import { LOAD_DATA, SEARCH } from 'site/sites/actions';
import AutoComplete from 'material-ui/AutoComplete';

export default function sites(state = {}, action) {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                sites: action.data
            };
        case SEARCH:
            if (!action.searchText) {
                return {
                    ...state,
                    filteredSites: null
                };
            }

            const filteredSites = state.sites.filter(site => {
                return AutoComplete.fuzzyFilter(action.searchText, site.name)
                    || AutoComplete.fuzzyFilter(action.searchText, site.location)
                    || AutoComplete.fuzzyFilter(action.searchText, site.description)
                    || AutoComplete.fuzzyFilter(action.searchText, site.stage)
            });

            return {
                ...state,
                filteredSites
            };
        default:
            return state;
    }
}
