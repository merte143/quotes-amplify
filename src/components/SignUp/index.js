import * as React from 'react'

import { Auth }from 'aws-amplify';

import AuthPiece from '../AuthPiece/AuthPiece';
import './SignUp.css'

import {
    FormSection,
    SectionHeader,
    SectionBody,
    SectionFooter,
    FormField,
    Input,
    InputLabel,
    Button,
    Link,
    SectionFooterPrimaryContent,
    SectionFooterSecondaryContent,
} from '../../modules/Amplify-UI/Amplify-UI-Components-React';

export default class SignUp extends AuthPiece {
    constructor(props) {
        super(props);

        this._validAuthStates = ['signUp'];
        this.signUp = this.signUp.bind(this);

        this.inputs = {
            dial_code: "+1",
        };
    }

    signUp() {
        const { username, password, email, dial_code='+1', phone_line_number } = this.inputs;
        if (!Auth || typeof Auth.signUp !== 'function') {
            throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
        }

        let signup_info = {
            username,
            password, 
            attributes: {
                email
            }
        };

        let phone_number = phone_line_number? `${dial_code}${phone_line_number.replace(/[-()]/g, '')}`: null;

        if (phone_number) {
            signup_info.attributes.phone_number = phone_number;
        }
        Auth.signUp(signup_info).then(() => this.changeState('confirmSignUp', username))
        .catch(err => this.error(err));
    }

    showComponent(theme) {
        const { hide } = this.props;
        if (hide && hide.includes(SignUp)) { return null; }

        return (
          <div className='sign-up'>
            <FormSection theme={theme}>
                <SectionHeader theme={theme}>{'Create a new account'}</SectionHeader>
                <SectionBody theme={theme}>
                    <FormField theme={theme}>
                        <InputLabel>{'Username'} *</InputLabel>
                        <Input
                            autoFocus
                            placeholder={'Create a username'}
                            theme={theme}
                            key="username"
                            name="username"
                            onChange={this.handleInputChange}
                        />
                    </FormField>
                    <FormField theme={theme}>
                        <InputLabel>{'Password'} *</InputLabel>
                        <Input
                            placeholder={'Create a password'}
                            theme={theme}
                            type="password"
                            key="password"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                    </FormField>
                    <FormField theme={theme}>
                        <InputLabel>{'Email Address'} *</InputLabel>
                        <Input
                            placeholder="janedoe@email.com"
                            theme={theme}
                            key="email"
                            name="email"
                            onChange={this.handleInputChange}
                        />
                    </FormField>
                </SectionBody>
                <SectionFooter theme={theme}>
                    <SectionFooterPrimaryContent theme={theme}>
                        <Button onClick={this.signUp} theme={theme}>
                            {'Create Account'}
                        </Button>
                    </SectionFooterPrimaryContent>
                    <SectionFooterSecondaryContent theme={theme}>
                        <Link theme={theme} onClick={() => this.changeState('signIn')}>
                            {'Sign in'}
                        </Link>
                    </SectionFooterSecondaryContent>
                </SectionFooter>
            </FormSection>
          </div>
        );
    }
}