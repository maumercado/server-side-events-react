import React from "react";
import ReactDOM from "react-dom";
import App from "../../../components/App";
import { shallow } from "enzyme";
import MauggerApp from "../../../containers/debugger/MauggerApp";

describe("<App />", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders the MauggerApp container", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(MauggerApp)).toHaveLength(1);
    });
});
