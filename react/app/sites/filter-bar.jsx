import { Component, PropTypes } from 'react';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

export default class FilterBar extends Component {
    render() {
        return (
            <div className="filter-bar">
                <SearchIcon className="filter-bar__search-icon"/>
                <TextField
                    floatingLabelText="Search"
                    hintText="Press 'Enter' to execute search"
                    onKeyDown={this.onEnter.bind(this)}
                    ref="searchInput" />
            </div>
        );
    }

    onEnter(event) {
        if (event.keyCode === 13) {
            this.search();
        }
    }

    search() {
        this.props.onSearch(this.refs.searchInput.getValue());
        this.refs.searchInput.blur();
    }
}

FilterBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};
