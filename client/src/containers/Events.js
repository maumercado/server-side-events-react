import React, { Component } from "react";
import { Table, Spinner, Alert } from "evergreen-ui";
import { connect } from "react-redux";
import Event from "../components/Event";
import * as actions from "../actions";
class Events extends Component {
    componentDidMount() {
        this.props.debuggerInit();
    }

    renderError = () => {
        return <Alert intent="danger" title="Hrm something is wrong, check your connections!" />;
    };
    renderEvents = () => {
        if (this.props.isLoading && this.props.events.length < 1) {
            return <Spinner />;
        } else {
            const eventResults = this.props.events.map((event, i) => {
                return <Event key={event.id} event={event} />;
            });

            return (
                <Table>
                    <Table.Body height={640}>{eventResults}</Table.Body>
                </Table>
            );
        }
    };
    render() {
        if (this.props.isError) {
            return this.renderError();
        }
        return this.renderEvents();
    }
}

const mapStateToProps = state => {
    const { isLoading, events, isError } = state.debugger;
    return { isLoading, events, isError };
};

export default connect(
    mapStateToProps,
    actions
)(Events);
