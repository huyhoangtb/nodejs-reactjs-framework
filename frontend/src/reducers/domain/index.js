import {themeContext} from "themes/actions";

const themeState = {
  theme: {}
};

const DomainState = (state = themeState, action) => {
  let newState = {};
  switch (action.type) {
    case themeContext.SET_THEME_DETAIL:
      newState = {
        ...state,
        theme: action.theme,
      };
      break;

    default:
      return state;
  }
  return newState;
};
export default DomainState;
