/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// MUI Components
import Paper from '@material-ui/core/Paper';

// Components
import {
  AAAPrimaryTheme,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  FormInput
} from '../../src/lib/components';

// Utilities
import Validate from '../../src/lib/utilities/validate';

const VALIDATIONS = {
  firstName: {
    required: 'First name is required',
    'max_length[24]': 'Too long. Do you have a nickname?',
    alpha_dash_dot_space: 'Name can only contain letters, dashes, periods, and spaces',
  },
};

function handleValidate(values){
  return Validate.validateForm(values, VALIDATIONS);
}

function onSubmit(vals){
  console.log('vals', vals);
  action(vals);
}

const stories = storiesOf('Molecules|Form', module);
stories
  .add('basic form', () => {
    return (
      <AAAPrimaryTheme>
        <div className="u-background--gray">
          <Paper className="u-padding--50">
              <Form
                validate={handleValidate}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <FormInput 
                        labelName="First name"
                        name="firstName"
                        type="text"
                      />
                    </FormGroup>
                    <ButtonGroup>
                      <Button onClick={handleSubmit}>Submit</Button>
                      <Button color="secondary" onClick={handleSubmit}>Skip</Button>
                    </ButtonGroup>
                  </form>
                )}
              />
          </Paper>
        </div>
      </AAAPrimaryTheme>
    );
  });
