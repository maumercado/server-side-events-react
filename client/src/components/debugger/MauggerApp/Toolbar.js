import React, { Component } from "react";
import { SearchInput, Pane, SegmentedControl } from "evergreen-ui";
import { connect } from "react-redux";
class SearchBar extends Component {
    onSearch = e => {
        const { handleSearch } = this.props;
        handleSearch(e.target.value);
    };

    onPauseLive = value => {
        const { onPlay, onPause } = this.props;

        if (value === "live") {
            onPlay();
        }

        if (value === "pause") {
            onPause();
        }
    };
    render() {
        const { isPaused } = this.props;
        const options = [ { label: "Pause", value: "pause" }, { label: "Live", value: "live" } ];

        return (
            <Pane
                height={"auto"}
                width="100%"
                display="flex"
                alignItems="center"
                alignContent="space-around"
                justifyContent="flex-start"
                backgroundColor="#f1f1f1"
            >
                <SegmentedControl
                    margin={8}
                    width={240}
                    height={36}
                    value={isPaused ? "pause" : "live"}
                    options={options}
                    onChange={this.onPauseLive}
                />
                <SearchInput
                    placeholder="Filter events..."
                    onChange={this.onSearch}
                    height={36}
                    width="50%"
                />
            </Pane>
        );
    }
}

export default connect()(SearchBar);
