import { combineReducers } from "redux";
import table from "./table";
import earnings from "./earnings";
import broker from "./broker";

//reducers config file
export default combineReducers({ table, earnings, broker });
