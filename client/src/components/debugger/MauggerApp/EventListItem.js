import React from "react";
import { Table } from "evergreen-ui";
import moment from "moment";

const EventListItem = ({ event, onEventSelect }) => {
    return (
        <Table.Row isSelectable onSelect={() => onEventSelect(event)}>
            <Table.TextCell flexBasis={120} flexShrink={1} flexGrow={1}>
                {event.type.toUpperCase()}
            </Table.TextCell>
            <Table.TextCell>{event.description}</Table.TextCell>
            <Table.TextCell flexBasis={200} flexShrink={0} flexGrow={0}>
                {moment(event.time).format("YYYY/MM/DD HH:mm:ss")}
            </Table.TextCell>
        </Table.Row>
    );
};

export default EventListItem;
