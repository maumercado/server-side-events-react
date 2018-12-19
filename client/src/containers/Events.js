import React, { Component } from "react";
import { Table, Spinner, Alert } from "evergreen-ui";
import { connect } from "react-redux";
import Event from "../components/Event";
import { debuggerInit } from "../actions";
class Events extends Component {
    componentDidMount() {
        this.props.debuggerInit();
    }

    renderError = () => {
        return (
            <Alert
                intent="danger"
                title="Hrm something is wrong, check your connections!"
            />
        );
    };
    renderEvents = () => {
        if (this.props.isLoading && this.props.events.length < 1) {
            return <Spinner />;
        } else {
            const eventResults = this.props.events.map((event, i) => {
                return <Event key={i} event={event} />;
            });

            return (
                <Table>
                    <Table.Body height={240}>{eventResults}</Table.Body>
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
    { debuggerInit }
)(Events);
