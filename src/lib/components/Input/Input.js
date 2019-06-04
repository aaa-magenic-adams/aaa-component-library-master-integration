/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable prefer-template */
/* eslint-disable import/imports-first */
/* eslint-disable import/order */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import InputMUI from '@material-ui/core/Input';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Clear from '@material-ui/icons/Clear';
import Label from "../Label/Label";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const styleClasses = theme => ({
  root: {
    marginTop: '8px',
    width: '343px',
    height: '48px',
    borderRadius: '4px',
    background: theme.palette.colorVariables.WHITE,
    border: `solid 1px ${theme.palette.colorVariables.GRAY}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      border: `solid 1px ${theme.palette.colorVariables.DARKER_BLUE}`,
    },
    "&.Mui-focused": {
      border: `solid 2px ${theme.palette.colorVariables.DARKER_BLUE}`
    },
  },
  disabled: {
    background: theme.palette.disabled.main,
    border: "none",
    '&:hover': {
      backgroundColor: theme.palette.disabled.main,
      border: "none",
    },
  },
  error: {
    border: `solid 2px ${theme.palette.error.main} !important`,
    '&:hover': {
      backgroundColor: theme.palette.colorVariables.WHITE,
    },
  },
  input: {
    padding: '10px 12px',
  },
  iconButton: {
    padding: '10px',
    transition: 'none'
  },
  iconStyle: {
    fontSize: '20px',
    color: theme.palette.primary.main
  }
});

class Input extends Component {
  render() {
    const {
      classes,
      className,
      disabled,
      error,
      errorText,
      helperText,
      id,
      labelName,
      name,
      placeholder,
      type,
      value,
      onBlur,
      onChange,
      onClear,
    } = this.props;
    return (
      <Fragment>
        <FormControl error={error} disabled={disabled}>
          {labelName && <Label
            htmlFor={id}
          >{labelName}</Label>}

          {/* Insert logic here text/numeric */}
          {type === 'text' && <InputMUI
            classes={{
              root: classes.root,
              disabled: classes.disabled,
              error: classes.error,
              input: classes.input
            }}
            className={cx("Input", className)}
            disableUnderline
            endAdornment={
              (onClear && value) && <InputAdornment position="end">
                <IconButton
                  disableRipple
                  aria-label="Clear text"
                  onClick={onClear}
                  disabled={disabled}
                  color="inherit"
                  classes={{
                    root: classes.iconButton,
                  }}
                >
                  <Clear
                    classes={{
                      root: classes.iconStyle,
                    }} />
                </IconButton>
              </InputAdornment>
            }
            id={id}
            name={name}
            placeholder={placeholder}
            type='text'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />}
          {(errorText && error) && <FormHelperText id={id + "-component-error-text"}>{errorText}</FormHelperText>}
        </FormControl>
        {helperText && <FormHelperText id={id + "-component-helper-text"}>{helperText}</FormHelperText>}
      </Fragment>
    );
  }
}

Input.propTypes = {
  // MUI Decorator
  classes: PropTypes.object.isRequired,
  // Passed Props
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onClear: PropTypes.func
};

export default withStyles(styleClasses, { withTheme: true })(Input);
