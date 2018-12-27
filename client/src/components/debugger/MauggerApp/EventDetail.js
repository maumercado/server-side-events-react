import React, { PureComponent } from "react";
import { Pane, Heading } from "evergreen-ui";
import ReactJson from "react-json-view";

class EventDetail extends PureComponent {
    renderNoEvent = () => {
        return (
            <Pane
                flex="1"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#f1f1f1"
                flexGrow={0}
                flexShrink={0}
                flexBasis={640}
            >
                <Heading>Select An Event</Heading>
            </Pane>
        );
    };
    renderEvent = () => {
        return (
            <Pane
                flex="1"
                display="flex"
                backgroundColor="#f1f1f1"
                flexGrow={0}
                flexShrink={0}
                flexBasis={640}
            >
                <ReactJson name={false} collapsed={1} src={this.props.selectedEvent} />
            </Pane>
        );
    };
    render() {
        if (this.props.selectedEvent) {
            return this.renderEvent();
        }
        return this.renderNoEvent();
    }
}

export default EventDetail;
