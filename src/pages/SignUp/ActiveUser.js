import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sendGet, sendPost, sendPut } from "../../utils/api";
import { logo, tick } from "../../constants/images";
import "../SignIn/Component/FormSignin/FormSignin.scss";
import { Form, Input, Button, message } from "antd";

function ActiveUser() {
  const params = useParams();
  const [active, setActive] = useState(true);
  const onFinish = async (values) => {
    try {
      const res = await sendPut(`auth/active-user/${params.token}`, values);
      if (res.statusCode === 200) {
        setActive(!active);
      } else {
        message.error("Không tìm thấy thông tin tài khoản");
      }
    } catch (error) {
      message.error("Không tìm thấy thông tin tài khoản");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="Active-wrapper">
        <div
          className="logo"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <img
            alt="logo"
            src={logo}
            style={{
              width: "195px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "10px",
            }}
          />
          <p
            style={{
              fontSize: "19px",
              fontWeight: "500",
              letterSpacing: "4px",
            }}
          >
            Học lập trình để đi làm
          </p>
        </div>
        {active ? (
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

              <Button htmlType="submit">Active Tài khoản</Button>
            </Form>
          </div>
        ) : (
          <div
            className="active"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "123px",
            }}
          >
            <img alt="active" src={tick} style={{ width: "85px" }} />
            <h3 style={{ fontWeight: "600", fontSize: "23px" }}>
              Tài khoản của bạn đã được kích hoạt thành công
            </h3>
            <h4 style={{ fontSize: "17px" }}>
              Quay về trang{" "}
              <Link
                to="/Signin"
                style={{ color: " #ef2424", fontWeight: "700" }}
              >
                Đăng nhập
              </Link>{" "}
            </h4>
          </div>
        )}
      </div>
    </>
  );
}

export default ActiveUser;
