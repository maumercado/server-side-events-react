import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { config } from "../../config";
import EventSource from "eventsource-polyfill";
configure({ adapter: new Adapter() });

global.config = config.client;
global.EventSource = EventSource;
