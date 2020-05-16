import { cloneDeep, assignIn } from "lodash";

const initialState = {
  isSolved: false,
  isEdited: false,
};

export function status(state = cloneDeep(initialState), action) {
  switch (action.type) {
    case "INPUT_VALUE":
      return assignIn({}, state, { isEdited: true });
    case "SOLVE":
      return assignIn({}, state, { isSolved: true, isEdited: true });
    case "CLEAR":
      return assignIn({}, state, { isSolved: false, isEdited: false });
    case "UNDO":
      if (!window.gridHistory.length) {
        return assignIn({}, state, { isEdited: false });
      }
      return state;
    default:
      return state;
  }
}
