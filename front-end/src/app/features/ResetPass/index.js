"use strict";

import React, { useState } from "react";
import "./resetpass.scss";
import { useIntl } from "react-intl";
import messages from "../../core/msg/resetpass";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { setApiRequestToken } from "../../../configuration";
import { resetPass } from "../../core/apis/resetPass";
import { showNotification, type } from "../../../../utilities/Component/notification/Notification";
import isEmpty from "validator/lib/isEmpty";

const ResetPass = () => {
  const { formatMessage } = useIntl();
  const [success, setSuccess] = useState("");
  const history = useHistory();
  const { token } = useParams();
  const [validationMsg, setValidationMsg] = useState({});
  const [reset, setData] = useState({
    password: "",
    confirm: "",
  });
  const { password } = reset;

  const onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    let dataChange = { ...reset };
    dataChange[name] = value;
    setData(dataChange);
  };

  const validateAll = () => {
    const msg = {};

    if (isEmpty(reset.password)) {
      msg.password = formatMessage(messages.inputpass);
    } else if (reset.password.length < 6) {
      msg.password = formatMessage(messages.verifypass);
    }

    if (isEmpty(reset.confirm)) {
      msg.confirm = formatMessage(messages.inputconfirm);
    } else if (reset.password !== reset.confirm) {
      msg.confirm = formatMessage(messages.verifypass);
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const onHandleReset = async (event) => {
    event.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    else {
      setApiRequestToken(token);
      const res = await resetPass({ password });

      if (res && res.data.result) {
        setSuccess(res.data.msg);
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      } else {
        alert("Reset fail");
      }
    }
  };

  return (
    <>
      <div className="active_page">{success && showSuccessMsg(success)}</div>
      <div className="body">
        <div className="reset-div">
          <div className="title"> {formatMessage(messages.resetpass)}</div>
          <div className="fields">
            <div className="reset">
              <input
                type="password"
                className="pass-input"
                placeholder={formatMessage(messages.pass)}
                value={reset.password}
                name="password"
                onChange={onHandleChange}
              />
            </div>
            <p className="errorColor">{validationMsg.password}</p>
            <div className="reset">
              <input
                type="password"
                className="confirm-input"
                placeholder={formatMessage(messages.confirm)}
                value={reset.confirm}
                name="confirm"
                onChange={onHandleChange}
              />
            </div>
            <p className="errorColor">{validationMsg.confirm}</p>
            <button className="Verify-button" onClick={onHandleReset}>
              {formatMessage(messages.verify)}
            </button>
          </div>
        </div>
      </div>
      <div className="active_page">{success && showSuccessMsg(success)}</div>
    </>
  );
};

export default ResetPass;
