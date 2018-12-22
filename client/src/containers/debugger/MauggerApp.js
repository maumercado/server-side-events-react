import { Alert, Spinner } from "evergreen-ui";
import normalize from "normalize-for-search";
import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import * as actions from "../../actions";
import Maugger from "../../components/debugger/MauggerApp/Maugger";

function matchesSearchTerm(event, searchTerm) {
    const normalKeyword = normalize(searchTerm);

    if (event.normalValues.includes(normalKeyword)) {
        return true;
    }

    return false;
}

function filterEvents(events, searchTerm) {
    return events.filter(event => {
        if (searchTerm && !matchesSearchTerm(event, searchTerm)) {
            return false;
        }

        return true;
    });
}

class MauggerApp extends Component {
    /**
     * Components Lifecycle methods
     */
    componentDidCatch() {
        return this.renderError();
    }

    componentDidMount() {
        this.props.debuggerInit();
    }

    /**
     * Custom methods for application
     */

    handleSearch = query => {
        const searchFn = debounce(this.props.debuggerSearch, 1000);
        searchFn(query);
    };

    /**
     * Custom Render Methods and Render
     */
    renderError = () => {
        return <Alert intent="danger" title="Hrm something is wrong, check your connections!" />;
    };

    render() {
        if (this.props.isError) {
            return this.renderError();
        }
        if (this.props.isLoading) {
            return <Spinner />;
        }
        return (
            <Maugger
                events={this.props.events}
                eventsCount={this.props.eventsCount}
                handleSearch={this.handleSearch}
            />
        );
    }
}

const mapStateToProps = state => {
    const { isLoading, events, isError, searchTerm } = state.debugger;
    const filteredEvents = filterEvents(events, searchTerm);

    return { isLoading, events: filteredEvents, isError, eventsCount: events.length };
};

export default connect(
    mapStateToProps,
    actions
)(MauggerApp);
