
import React, { useState, useRef } from "react";
import "./formLogin.scss";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import messages from "../../../core/msg/login";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { loginApi } from "../../../core/apis/loginApi";
import { loginGoogle } from "../../../core/apis/loginGoogle";
import { loginFaceBook } from "../../../core/apis/loginFB";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import { userReducer } from "../../../../store/userReducer";
import { getTokenReducer } from "../../../../store/getTokenReducer";
import { setApiRequestToken } from "../../../../configuration";
import { todoProduct } from '../../../../store/cartReducer'

import { showNotification, type } from '../../../../utilities/Component/notification/Notification'
import { OverlayTrigger,Tooltip } from 'react-bootstrap'
import { useParams } from "react-router-dom";

const FormLogin = (props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
  const [err, setErr] = useState({});
  const reducerToken = useSelector(state => state.getToken.token)
  const [user, setData] = useState({
    email: "",
    password: "",
  });
  const refPass = useRef(null)

  const { modalLoading } = props

  const onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    let dataChange = { ...user };
    dataChange[name] = value;
    setData(dataChange);
  };

  const validateAll = () => {
    let msg = {};
    if (isEmpty(user.email)) {
      msg.email = formatMessage(messages.inputname);
    } else if (!isEmail(user.email)) {
      msg.email = formatMessage(messages.emailincorrect);
    }

    if (isEmpty(user.password)) {
      msg.password = formatMessage(messages.inputpass);
    }

    setErr(msg)

    if (msg.password || msg.email)
    {
      return false;
    } 
    return true;
  };

  const onHandleLogin = async (event) => {
    event.preventDefault();
    try {
      const isValid = validateAll();
      if (!isValid) 
      {
        refPass.current.value = ''
        return;
      }
      else {
        modalLoading(true)
        const res = await loginApi(user);
        if (res && res.data.result) {
          dispatch(userReducer(res.data.data.user));
          dispatch(getTokenReducer(res.data.data.token));
          dispatch(todoProduct({
            cart: res.data.data.cart.data,
            type: 'FETCH_CART'
          }))
          setApiRequestToken(res.data.data.token);

          const shareCode = new URLSearchParams(new URL(window.location.href).search).get('t') 
          if (!!shareCode) {
            history.replace(`/categories?t=${shareCode}`)
            return;
          }

          history.replace(location.state? location.state.from.pathname : "/")
        } else {
          setErr({...err,
            email: res.data.msg})
          modalLoading(false)
        }
      }
    } catch (error) {
      setErr({...err,
        email: error.message})
      modalLoading(false)
    }
    
  };
  const responseGoogle = async (response) => {
    modalLoading(true)
    try {
      const res = await loginGoogle({
        tokenId: response.tokenId,
      });
      if (res && res.data.result) {
        dispatch(userReducer(res.data.data.user));
        dispatch(getTokenReducer(res.data.data.token));
        dispatch(todoProduct({
          cart: res.data.data.cart.data,
          type: 'FETCH_CART'
        }))
        setApiRequestToken(res.data.data.token);
        
        const shareCode = new URLSearchParams(new URL(window.location.href).search).get('t') 
        if (!!shareCode) {
          history.replace(`/categories?t=${shareCode}`)
          return;
        }

        history.push(location.state? location.state.from.pathname : "/")
      } else {
        setErr(res.data.msg);
        modalLoading(false)
      }
    } catch (error) {
      showNotification("Đăng nhập bằng google lỗi",error.message,type.danger, 5000 )
      modalLoading(false)
    }
    
  };

  const responseFacebook = async (response) => {
    modalLoading(true)
    try {
      const { accessToken, userID } = response;
      const res = await loginFaceBook({
        accessToken,
        userID,
      });
      console.log(res.data)
      if (res && res.data) {
        dispatch(userReducer(res.data.data.user));
        dispatch(getTokenReducer(res.data.data.token));
        dispatch(todoProduct({
          cart: res.data.data.cart.data,
          type: 'FETCH_CART'
        }))
        setApiRequestToken(res.data.data.token);

        const shareCode = new URLSearchParams(new URL(window.location.href).search).get('t') 
        if (!!shareCode) {
          history.replace(`/categories?t=${shareCode}`)
          return;
        }
        
        history.push(location.state? location.state.from.pathname : "/")
        modalLoading(false)
      } else {
        alert("Login fail");
        modalLoading(false)
      }
    } catch (error) {
      showNotification("Đăng nhập bằng google lỗi",error.message,type.danger, 5000 )
      modalLoading(false)
    }
    
  };

  return (
    <div className="login-div form-container">
          <div className="title">{formatMessage(messages.logintext)}</div>
          <div className="fields">
            <div className={ !err.email ? "input" : "input error"}>
              <input
                type="username"
                className="user-input"
                placeholder={formatMessage(messages.userName)}
                value={user.email}
                name="email"
                onChange={onHandleChange}
              />
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-3">{err.email}</Tooltip>}
              >
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
              </OverlayTrigger>
            </div>
            <div className={ !err.password ? "input input_pass" : "input error input_pass"}>
              <input
                type="password"
                className="pass-input"
                placeholder={formatMessage(messages.passWord)}
                value={user.password}
                name="password"
                onChange={onHandleChange}
                ref={refPass}
              />
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="button-tooltip-4">{err.password}</Tooltip>}
              >
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
              </OverlayTrigger>
            </div>
            <div className="link">
              <a href="/forgot_password">
                {formatMessage(messages.forgotpass)}
              </a>{" "}
            </div>
            <button className="signin-btn form-btn" onClick={onHandleLogin}>
              {formatMessage(messages.logintext)}
            </button>
            <div className="hr">{formatMessage(messages.loginwith)}</div>
            <div className="social">
              <GoogleLogin
                className="btn-social button-gg"
                clientId="674754286550-fpn48c2cdl39s0iqjc8hm4otq09g6m5f.apps.googleusercontent.com"
                buttonText="Login with google"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <FacebookLogin
                className="button-fb"
                appId="4306052496159415"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
              >
              </FacebookLogin>
            </div>
            <div className="register-container">
              <div className="hr">Hoặc đăng ký ở đây</div>
              <a href="/register">
                <button className="form-btn">
                    Đăng ký
                  </button>
              </a>
            </div>
          </div>
        </div>
  );
};

export default FormLogin;
