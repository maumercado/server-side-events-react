import React, { Component } from "react";
import { SearchInput, Pane, SegmentedControl } from "evergreen-ui";
import { connect } from "react-redux";
class SearchBar extends Component {
    onChange = e => {
        const { handleSearch } = this.props;
        handleSearch(e.target.value);
    };
    render() {
        const options = [ { label: "Pause", value: "pause" }, { label: "Live", value: "live" } ];

        return (
            <Pane
                height={"auto"}
                width="100%"
                display="flex"
                alignItems="center"
                alignContent="space-around"
                justifyContent="flex-start"
            >
                <SegmentedControl margin={8} width={240} height={36} options={options} />
                <SearchInput
                    placeholder="Filter events..."
                    onChange={this.onChange}
                    height={36}
                    width="50%"
                />
            </Pane>
        );
    }
}

export default connect()(SearchBar);
