import React, { useState } from "react";
import "./login.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useIntl } from "react-intl";

import  HeaderLogin  from '../../base/HeaderLogin/headerLogin';
import  Footer  from '../../base/Footer/footer';
import FormLogin from "../../base/Form/FormLogin/formLogin";
import FormForgotPass from "../../base/Form/FormForgotPass/formForgotPass";
import FormRegsiter from "../../base/Form/FormRegister/formRegister";
import ResetPass from "../../base/Form/FormResetPass/formResetPass";

import LoadingOverlay from 'react-loading-overlay';

const LoginPage = () => {
  const { formatMessage } = useIntl();

  const [ isActive, setIsActive ] = useState(false)

  const [ content, setContent ] = useState('')

  const configLoadingModal = (isOn, content='Please wait a second...') => 
  {
    setIsActive(isOn)
    setContent(content)
  }

  return (
    <>
          <Switch> 
            <Route path="/login" render={props => <HeaderLogin {...props} pagination="LOGIN" />} />;
            <Route path="/register" render={props => <HeaderLogin {...props} pagination="REGISTER" />} />
            <Route path="/forgot_password" render={props => <HeaderLogin {...props} pagination="FORGOT PASSWORD" />} />
            <Route path="/reset/:token"render={props => <HeaderLogin {...props} pagination="RESET PASSWORD" />} />
          </Switch>
            <section className="section section-lg dark bg-dark section-middle">
              {
                isActive &&
                <LoadingOverlay
                  active={isActive}
                  spinner
                  text={content}
                  >
                  <p>Some content or children or something.</p>
                </LoadingOverlay>
              }
                <div className="bg-image bg-fixed">
                  <img src="" alt=""></img>
                </div>
            <Switch> 
              <Route path="/login" render={props => <FormLogin {...props} modalLoading={configLoadingModal} />} />;
              <Route path="/register" render={props => <FormRegsiter {...props} modalLoading={configLoadingModal} />} />
              <Route path="/forgot_password" render={props => <FormForgotPass {...props} modalLoading={configLoadingModal} />} />
              <Route path="/reset/:token" render={props => <ResetPass {...props} modalLoading={configLoadingModal} />} />
            </Switch>
            </section>
            <Footer/>
    </>
  );
};
export default LoginPage;
