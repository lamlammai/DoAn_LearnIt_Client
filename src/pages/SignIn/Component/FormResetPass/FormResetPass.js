import React from "react";
import { Form, Input, Button, message } from "antd";

import { sendPost, sendPut } from "../../../../utils/api/index";
import { useHistory } from "react-router-dom";
import "../../SignIn.scss";
import "../FormSignin/FormSignin.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { logo } from "../../../../constants/images";
function SignUp() {
  const history = useHistory();
  const params = useParams();
  console.log(params);
  document.title = "Đổi mật khẩu";
  const onFinish = async (values) => {
    try {
      const res = await sendPost(`/auth/forgot-password`, values);
      if (res.statusCode === 200) {
        message.success("Đổi mật khẩu thành công");
        history.push("/Signin");
      } else {
        message.error("Không thể truy cập");
      }
    } catch (error) {
      message.error("Không thể truy cập");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="SignIn-wrapper">
        <div className="Modal-SignIn">
          <div className="Modal-title">
            <img alt="logo" src={logo} />
            <h3>Đặt lại mật khẩu</h3>
          </div>
          <div className="Form-wrapper">
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    validateStatus: "error",
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                  {
                    validateStatus: "error",
                    required: true,
                    message: "Email không được để trống!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu mới"
                rules={[
                  {
                    required: true,
                    message: "Nhập mật khẩu",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="passwordConfirmation"
                label="Nhập lại mật khẩu"
                dependencies={["passwordConfirmation"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Nhật mật khẩu",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="otp"
                label="OTP"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "OTP không được để trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button htmlType="submit">Lưu mật khẩu</Button>
            </Form>
          </div>
          <div className="Modal-info">
            Bạn đã có tài khoản? <Link to="/signin"> Đăng nhập</Link>
          </div>
          <div className="Login-about">
            <span>Giới thiệu về LI</span>
            <span>LI trên Facebook</span>
            <span>LI trên Youtube</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
