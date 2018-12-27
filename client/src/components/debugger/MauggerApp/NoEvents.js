import React, { PureComponent } from "react";
import { Heading, Pane } from "evergreen-ui";

export default class NoEvents extends PureComponent {
    render() {
        return (
            <Pane
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <div>
                    <Heading>No Events Seen</Heading>
                </div>
            </Pane>
        );
    }
}
