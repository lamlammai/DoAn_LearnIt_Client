/* eslint-disable */
import { Form, Input, Button, message } from "antd";
import "./FormSignin.scss";
import { Link, useHistory } from "react-router-dom";
import { sendGet, sendPost } from "../../../../utils/api/index";
import { setToken, setRefreshToken, setItem } from "../../../../utils/storage";

export default function FormSignIn() {
  const history = useHistory();
  const onFinish = async (values) => {
    const res = await sendPost("/auth/login", values);
    if (res.statusCode === 200) {
      setToken(res.returnValue.data.accessToken);
      setRefreshToken(res.returnValue.data.refreshToken);
      await infoUser();
    } else {
      message.error("Tài khoản/Mật khẩu không đúng!");
    }
  };
  const infoUser = async () => {
    const res = await sendGet("/users/me");
    try {
      if (res.statusCode === 200) {
        setItem("user", JSON.stringify(res?.returnValue));
        if (res.returnValue.data.isSetup == true) {
          return history.push("/");
        } else {
          return history.push("/onboard");
        }
      } else {
        message.error("Tài khoản/Mật khẩu không đúng!");
      }
    } catch (e) {
      message.error("Tài khoản/Mật khẩu không đúng!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="Form-wrapper">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="E-mail"
            hasFeedback
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
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[
              {
                validateStatus: "error",
                required: true,
                message: "Mật khẩu không được để trống!",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu của bạn" />
          </Form.Item>
          <Link className="forgot-pass" to="/forgotPassword">
            Quên mật khẩu?
          </Link>
          <Button htmlType="submit">Đăng nhập</Button>
        </Form>
      </div>
    </>
  );
}
