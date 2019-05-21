import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MUIButton from '@material-ui/core/Button';
import cx from 'clsx';

type propTypes = {
  // MUI Decorator
  classes: PropTypes.object,
  // Passed Props
  className: PropTypes.string,
  children?: PropTypes.string | PropTypes.node,
  color?: 'primary' | 'secondary',
  disabled: PropTypes.bool,
  href?: PropTypes.bool,
  onClick: () => {},
};

const styleClasses = theme => ({
  root: {
    border: 0,
    height: '48px',
    boxShadow: 'none',
    color: theme.palette.common.white,
    padding: '0 16px',
    textTransform: 'none',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '314px',
    },
  },
  label: {
    fontSize: '18px',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  },
  containedPrimary: {
    '&:active,&:hover': {
      background: theme.palette.primary.dark,
    },
    '&:disabled': {
      background: theme.palette.disabled.main,
      color: theme.palette.common.white,
    }
  },
  containedSecondary: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    background: 'transparent',
    '&:active,&:hover': {
      background: theme.palette.colorVariables.SECONDARY_HOVER,
    },
    '&:disabled': {
      background: 'transparent',
      borderColor: theme.palette.disabled.main,
    }
  },
})


class Button extends Component<propTypes> {
  static defaultProps = {
    color: 'primary'
  }

  render() {
    const {
      children,
      className,
      classes,
      disabled,
      color,
      href,
      onClick
    } = this.props;

    return (
      <MUIButton
        className={cx('Button', className)}
        classes={classes}
        disabled={disabled}
        color={color}
        variant="contained"
        href={href}
        onClick={onClick}
      >
        {children}
      </MUIButton>
    );
  }
}

export default withStyles(styleClasses, {withTheme: true})(Button);
