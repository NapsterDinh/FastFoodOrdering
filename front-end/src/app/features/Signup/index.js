"use strict";

import React, { useState } from "react";
import "./signup.scss";
import { useIntl } from "react-intl";
import messages from "../../core/msg/register";
import { signup } from "../../core/apis/signup";
import { useHistory } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { useDispatch, useSelector } from "react-redux";
import { setApiRequestToken } from "../../../configuration";
import { getTokenReducer } from "../../../store/getTokenReducer";

const SignUpPage = () => {
  const token = useSelector((state) => state.getToken.activation_token);
  const user1 = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [validationMsg, setValidationMsg] = useState({});

  const [user, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const { name, email, phone, password } = user;

  const onHandleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    let dataChange = { ...user };
    dataChange[name] = value;
    setData(dataChange);
  };

  const validateAll = () => {
    const msg = {};
    if (isEmpty(user.email)) {
      msg.email = formatMessage(messages.inputname);
    } else if (!isEmail(user.email)) {
      msg.email = formatMessage(messages.inputemail);
    }
    if (isEmpty(user.name)) {
      msg.name = formatMessage(messages.verifyemail);
    }

    if (isEmpty(user.phone)) {
      msg.phone = formatMessage(messages.inputphone);
    } else if (!isMobilePhone(user.phone)) {
      msg.phone = formatMessage(messages.verifyphone);
    }

    if (isEmpty(user.password)) {
      msg.password = formatMessage(messages.inputpass);
    } else if (user.password.length < 6)
      msg.password = formatMessage(messages.verifypass);

    if (isEmpty(user.confirm)) {
      msg.confirm = formatMessage(messages.inputconfirm);
    } else if (user.password !== user.confirm)
      msg.confirm = formatMessage(messages.verifyconfirm);

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const onHandleSignUp = async (event) => {
    event.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    else {
      const res = await signup({ name, email, phone, password });

      if (res && res.data.result) {
        alert("Check email accept");
        history.push("/login");
      } else {
        alert(res.data.msg);
      }
    }
  };

  return (
    <div className="body">
      <div className="signup-div">
        <div className="title">{formatMessage(messages.signup)}</div>
        <div className="fields">
          <form onSubmit={onHandleSignUp}>
            <div className="username">
              <input
                type={formatMessage(messages.userName)}
                className="user-input"
                placeholder={formatMessage(messages.userName)}
                value={user.name}
                name="name"
                onChange={onHandleChange}
              />
            </div>
            <p className="errorColor">{validationMsg.name}</p>
            <div className="email">
              <input
                type="email"
                className="user-input"
                placeholder={formatMessage(messages.email)}
                value={user.email}
                name="email"
                onChange={onHandleChange}
              />
            </div>
            <p className="errorColor">{validationMsg.email}</p>
            <div className="phone">
              <input
                type="phone"
                className="user-input"
                placeholder={formatMessage(messages.phone)}
                value={user.phone}
                name="phone"
                onChange={onHandleChange}
              />
            </div>
            <p className="errorColor">{validationMsg.phone}</p>
            <div className="password">
              <input
                type="password"
                className="pass-input"
                placeholder={formatMessage(messages.passWord)}
                value={user.password}
                name="password"
                onChange={onHandleChange}
              />
            </div>
            <p className="errorColor">{validationMsg.password}</p>
            <div className="confirm">
              <input
                type="password"
                className="pass-input"
                placeholder={formatMessage(messages.confirm)}
                value={user.confirm}
                name="confirm"
                onChange={onHandleChange}
              />
            </div>
            <p className="errorColor">{validationMsg.confirm}</p>
            <button className="signin-button">
              {formatMessage(messages.signup)}
            </button>
            <div className="link">
              <a href="/login">{formatMessage(messages.gotologin)}</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
