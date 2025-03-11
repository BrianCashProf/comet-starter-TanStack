import { useForm } from '@tanstack/react-form'; // Remove Controller, SubmitHandler. TanStack has these inherrently.
import {
  Button,
  ButtonGroup,
  Form,
  TextInput,
  Alert
} from '@metrostar/comet-uswds'; 
import { hasSsoConfig } from '@src/utils/auth'; 
import {
  PASSWORD_RULES,
  REQUIRED_FORM_FIELDS_RULES
} from '@src/utils/constants'; 
import { FormInput } from '@src/types/form'; 
import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import useAuth from '../../hooks/use-auth';  

export const SignIn = (): React.ReactElement => {
  const navigate = useNavigate();
  const { signIn, error } = useAuth();
  
  const form = useForm<FormInput>({ // Register values and submition action
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      signIn(false);
      navigate('/dashboard');
    },
  });

  const handleCancel = (event: React.FormEvent): void => {
    event.preventDefault();
    navigate('/');
  };
  
  const handleSsoSignIn = (): void => {
    signIn(true);
  };
  
  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="tablet:grid-col-6">
          <h1>Sign In</h1>
          {error && (
            <Alert id="loginAlert" type="error" heading="Error">
              There was an error signing in. Please try again.
            </Alert>
          )}
          <Form
            id="login-form"
            className="maxw-mobile-lg"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="username"
              validators={{
                required: ({ value }) => !value ? 'Username is required' : undefined,
              }}
            >
              {(field) => (
                <TextInput
                  id="username"
                  name={field.name}
                  label="Username"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors?.[0] || ''}
                  autoFocus
                />
              )}
            </form.Field>
            
            <form.Field
              name="password"
              validators={{
                required: ({ value }) => !value ? 'Password is required' : undefined,
              }}
            >
              {(field) => (
                <TextInput
                  id="password"
                  name={field.name}
                  type="password"
                  label="Password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors?.[0] || ''}
                />
              )}
            </form.Field>
            
            <ButtonGroup>
              <Button
                id="submit"
                type="submit"
                disabled={form.state.isSubmitting || !form.state.canSubmit}
              >
                Sign In
              </Button>
              <Button
                id="cancel"
                type="button"
                variant="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              {hasSsoConfig() && (
                <Button
                  id="sign-in-sso"
                  type="button"
                  variant="outline"
                  onClick={handleSsoSignIn}
                >
                  Sign In with SSO
                </Button>
              )}
            </ButtonGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};