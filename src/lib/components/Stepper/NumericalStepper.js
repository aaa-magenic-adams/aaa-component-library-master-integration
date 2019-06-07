/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import MUIStep from '@material-ui/core/Step';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ReportProblem from '@material-ui/icons/ReportProblem';
import MUIStepLabel from '@material-ui/core/StepLabel';

import StepperButton from '../Button/StepperIconButton';
import NumericInput from '../Input/NumericInput/NumericInput';
import {
  AAA_CSS_IMPORTANT,
  AAA_CSS_CENTER,
  AAA_CSS_INLINE,
  AAA_CSS_MIDDLE,
  AAA_CSS_BASELINE
} from '../../constants/cssConstants';

const styleClasses = theme => ({
  stepperIcon: {
    color: theme.palette.primary.main,
    width: '24px',
    height: '24px'
  },
  stepperInput: {
    height: '48px',
    verticalAlign: `${AAA_CSS_BASELINE} ${AAA_CSS_IMPORTANT}`,
    borderRadius: '4px',
    textAlign: `${AAA_CSS_CENTER}`,
    '& input': {
      textAlign: `${AAA_CSS_CENTER} ${AAA_CSS_IMPORTANT}`
    }
  },
  stepperLabel: {
    color: theme.palette.colorVariables.BLACK,
    marginTop: '8px',
    fontSize: '16px',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px'
    }
  },
  helpText: {
    color: theme.palette.colorVariables.GRAY,
    marginTop: '8px',
    '& span': {
      fontSize: '14px',
      [theme.breakpoints.up('md')]: {
        fontSize: `16px  ${AAA_CSS_IMPORTANT}`
      }
    }
  },
  formControl: {
    width: `25% ${AAA_CSS_IMPORTANT}`,
    marginTop: '0'
  },
  error: {
    color: theme.palette.error.main,
    fontSize: '14px',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px'
    },
    '& svg': {
      display: `${AAA_CSS_INLINE}`,
      fontSize: '20px',
      marginLeft: '8px',
      marginRight: '8px',
      verticalAlign: `${AAA_CSS_MIDDLE}`
    }
  }
});

class NumericalStepper extends Component {
  render() {
    const {
      classes,
      error,
      labelText,
      helpText,
      errorText,
      value,
      onIncrease,
      onDecrease,
      disabled,
      id,
      mask
    } = this.props;

    return (
      <MUIStep id={id} disabled={disabled} classes={classes.root}>
        <MUIStepLabel
          data-quid={`StepLabel-${id}`}
          classes={{ label: classes.stepperLabel }}
        >
          {labelText}
        </MUIStepLabel>
        <StepperButton
          id={`DecreaseStepper-${id}`}
          disabled={disabled}
          onClick={onDecrease}
        >
          <RemoveIcon
            data-quid={`RemoveIcon-${id}`}
            disabled={disabled}
            className={classes.stepperIcon}
          />
        </StepperButton>

        <NumericInput
          id={`NumericInput-${id}`}
          className={classes.stepperInput}
          formControlClass={classes.formControl}
          type="text"
          value={value}
          error={error}
          disabled={disabled}
          mask={mask}
          disableWarning
        />
        <StepperButton
          id={`IncreaseStepper-${id}`}
          disabled={disabled}
          onClick={onIncrease}
        >
          <AddIcon
            data-quid={`AddIcon-${id}`}
            className={classes.stepperIcon}
          />
        </StepperButton>
        <MUIStepLabel
          data-quid={`Component-error-text-${id}`}
          classes={{ error: classes.error }}
          className={classes.helpText}
          error={error}
        >
          {error && <ReportProblem data-quid={`ReportProblem-${id}`} />}
          {errorText}
        </MUIStepLabel>
        <MUIStepLabel
          data-quid={`Component-helper-text-${id}`}
          className={classes.helpText}
        >
          {helpText}
        </MUIStepLabel>
      </MUIStep>
    );
  }
}

NumericalStepper.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  labelText: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  onIncrease: PropTypes.func.isRequired,
  value: PropTypes.number,
  onDecrease: PropTypes.func.isRequired,
  mask: PropTypes.array,
  error: PropTypes.bool
};

NumericalStepper.defaultProps = {
  classes: {},
  disabled: false,
  helpText: '',
  mask: [],
  error: false
};

export default withStyles(styleClasses, { index: 0, withTheme: true })(
  NumericalStepper
);
