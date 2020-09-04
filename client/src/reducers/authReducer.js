// pull out a function .. name the file with lower case beginning
import {FETCH_USER} from "../actions/types";
export default function(state = null, action) {

  switch (action.type) {
    case FETCH_USER:
    // '' || false = false
      return action.payload || false ;
    default:
      return state;
  }
}
