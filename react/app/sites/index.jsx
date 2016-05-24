import { Component } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { fetchData, search } from 'site/sites/actions';
import FilterBar from 'site/sites/filter-bar';

const selector = state => state.sites;

class Sites extends Component {
    render() {
        return (
            <div>
                <FilterBar onSearch={this.props.search}/>
                <Table>
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </Table>
            </div>
        );
    }

    renderTableHeader() {
        return (
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Location</TableHeaderColumn>
                <TableHeaderColumn>Stage</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
        );
    }

    renderTableBody() {
        const sites = this.props.filteredSites ? this.props.filteredSites : this.props.sites;
        return (
            <TableBody>
                {!!sites && sites.map(site => this.renderTableRow(site))}
            </TableBody>
        );
    }

    renderTableRow(site) {
        return (
            <TableRow key={site.id}>
                <TableRowColumn>{site.name}</TableRowColumn>
                <TableRowColumn>{site.location}</TableRowColumn>
                <TableRowColumn>{site.stage}</TableRowColumn>
                <TableRowColumn>{site.description}</TableRowColumn>
            </TableRow>
        );
    }

    componentWillMount() {
        this.props.fetchData();
    }
}

export default connect(selector, { fetchData, search })(Sites);
