export const themeContext = {
  SET_THEME_DETAIL: 'SET_THEME_DETAIL',
};


export default {
  setThemeDetail(theme) {
    return {
      type: themeContext.SET_THEME_DETAIL,
      theme,
    };
  }
}