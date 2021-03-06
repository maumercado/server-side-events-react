import React from "react";
import { Table } from "evergreen-ui";
import moment from "moment";

const Event = ({ event }) => {
    return (
        <Table.Row key={event.messageId} isSelectable onSelect={() => alert(event.messageId)}>
            <Table.TextCell flexBasis={120} flexShrink={0} flexGrow={0}>
                {event.type.toUpperCase()}
            </Table.TextCell>
            <Table.TextCell>{event.description}</Table.TextCell>
            <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0}>
                {moment(event.time).format("YYYY/MM/DD HH:mm:ss")}
            </Table.TextCell>
        </Table.Row>
    );
};

export default Event;
