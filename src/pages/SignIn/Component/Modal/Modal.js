import React from "react";
import { facebook, github, google, user } from "../../../../constants/images";

function Modal(props) {
  const sendData = () => {
    props.parentCallback(true);
  };
  return (
    <>
      <div className="Modal-main">
        <div onClick={sendData}>
          <img alt="icon" src={user}></img>
          <span>Sử dụng Email/ Số điện thoại</span>
        </div>
        <div>
          <img alt="icon" src={google}></img>
          <span>Tiếp tục với Google</span>
        </div>
        <div>
          <img alt="icon" src={facebook}></img>
          <span>Tiếp tục với Facebook</span>
        </div>
        <div>
          <img alt="icon" src={github}></img>
          <span>Tiếp tục với Github</span>
        </div>
      </div>
    </>
  );
}

export default Modal;
