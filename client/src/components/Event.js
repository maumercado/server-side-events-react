import React from "react";
import { Table } from "evergreen-ui";

const Event = ({ event }) => {
    return (
        <Table.Row
            key={event.messageId}
            isSelectable
            onSelect={() => alert(event.messageId)}
        >
            <Table.TextCell>{event.type.toUpperCase()}</Table.TextCell>
            <Table.TextCell>{event.messageId.toUpperCase()}</Table.TextCell>
            <Table.TextCell>{event.receivedAt}</Table.TextCell>
        </Table.Row>
    );
};

export default Event;
