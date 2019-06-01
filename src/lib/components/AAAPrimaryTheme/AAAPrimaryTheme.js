// https://next.material-ui.com/customization/themes
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

// Colors
import {
  AAA_COLOR_DISABLED,
  AAA_COLOR_ERROR,
  AAA_COLOR_MAIN_BLACK,
  AAA_COLOR_MAIN_BLUE,
  AAA_COLOR_MAIN_DARK_BLUE,
  AAA_COLOR_MAIN_DARKER_BLUE,
  AAA_COLOR_MAIN_GRAY,
  AAA_COLOR_MAIN_WHITE,
  AAA_COLOR_SECONDARY_HOVER,
  AAA_COLOR_TRANSPARENT,
} from '../../constants/colors';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  palette: {
    primary: {
      // NOTE: when not specifying other values like "light", they will
      // be calculated from palette.primary.main,
      main: AAA_COLOR_MAIN_BLUE,
      dark: AAA_COLOR_MAIN_DARK_BLUE,
    },
    error: {
      main: AAA_COLOR_ERROR,
    },
    disabled: {
      main: AAA_COLOR_DISABLED,
    },
    // These are use defined variables we can use
    colorVariables: {
      SECONDARY_HOVER: AAA_COLOR_SECONDARY_HOVER,
      TRANSPARENT: AAA_COLOR_TRANSPARENT,
      BLACK: AAA_COLOR_MAIN_BLACK,
      DARKER_BLUE: AAA_COLOR_MAIN_DARKER_BLUE,
      GRAY: AAA_COLOR_MAIN_GRAY,
      WHITE: AAA_COLOR_MAIN_WHITE
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

type propTypes = {
  children: PropTypes.node,
};

export default function AAAThemeProvider({children}:propTypes){
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
