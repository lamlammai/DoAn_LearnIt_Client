import React, { useState } from "react";
import "../SignIn/SignIn.scss";
import Modal from "../SignIn/Component/Modal/Modal";
import { Link } from "react-router-dom";
import FormSignUp from "../SignIn/Component/FormSignUp/FormSignUp";

function SignUp() {
  document.title = "Đăng ký";
  const [isShow, setIsShow] = useState(true);
  const callbackFunction = (childData) => {
    setIsShow(!childData);
  };
  function handleClick() {
    setIsShow(!isShow);
  }
  return (
    <>
      <div className="SignIn-wrapper">
        <div className="Modal-SignIn">
          <div className="Modal-title">
            <img
              alt="logo"
              src="http://localhost:3000/static/media/logo.633b2632.png"
            />
            <h3>Đăng kí tài khoản LI </h3>
          </div>
          {isShow ? (
            <Modal parentCallback={callbackFunction} />
          ) : (
            <FormSignUp />
          )}

          <div className="Modal-info">
            Bạn đã có tài khoản? <Link to="/signin"> Đăng nhập</Link>
          </div>
          <div className="Login-about">
            <span>Giới thiệu về LI</span>
            <span>LI trên Facebook</span>
            <span>LI trên Youtube</span>
          </div>
          {isShow ? null : (
            <div className="exitLogin" onClick={handleClick}>
              <i class="fas fa-chevron-left"></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SignUp;
