/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { sendPost } from "../../utils/api";

function Pay({ step, dataChild }) {
  const [method, setMethod] = useState("momo");
  // const orderId = new Date().getTime() + "";
  // console.log("orderId", orderId);
  const [enpoint, setEndpoint] = useState(
    "http://localhost/learning-online/api/atm-momo.php"
  );
  const handleOnChange = (e) => {
    setMethod(e);
    if (e == "momo") {
      setEndpoint("http://localhost/learning-online/api/atm-momo.php");
    } else setEndpoint("/users/deposit");
  };

  const PayOnline = async () => {
    const res = await sendPost(enpoint, {
      amount: dataChild.price,
    });
    if (res.statusCode == 200) {
      // console.log(` res.returnValue.data`, res.returnValue.data);
      window.location.href = res.returnValue.data;
    } else {
      //đơn hàng thất bại
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className={step === 2 ? "main" : "main hidden"}>
        <div className="method-payment-component">
          <div className="pathway">
            <div className="content">
              <ul>
                <li>
                  <a href="/">Trang chủ</a>
                </li>
                <li>
                  <span>
                    <i class="fas fa-chevron-right"></i>
                  </span>
                </li>
                <li>
                  <strong>Đổi điểm</strong>
                </li>
              </ul>
            </div>
          </div>
          <div className="payment-online">
            <div className="content">
              <h3 className="payment-online__title">Phương thức thanh toán</h3>
              <div className="payment-online__inner">
                <div className="payment-online__left">
                  <div className="payment-online__row">
                    <h4 className="payment-online__sub">
                      Chọn phương thức thanh toán*
                    </h4>
                    <div className="method-payment">
                      <ul className="method-payment__list">
                        <li className="method-payment__item">
                          <div className="method-payment__left">
                            <span className="method-payment__icon">
                              <img
                                alt=""
                                src="http://media.vietteltelecom.vn/upload//05/68/80/08650e955cd61f5161be492532eda40b0abea8e7.png"
                                width="30"
                                height="30"
                              />
                            </span>
                            <div className="method-payment__detail">
                              <div className="method-payment__info">
                                <div className="method-payment__top js-toggle">
                                  <h5 className="method-payment__name">
                                    Ví Momo
                                  </h5>
                                </div>
                                <div className="method-payment__choose">
                                  <label className="radio-custom1">
                                    <input
                                      type="radio"
                                      name="radio"
                                      value="momo"
                                      checked={method == "momo"}
                                      onChange={(e) =>
                                        handleOnChange(e.target.value)
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                              </div>
                              <p className="method-payment__des">
                                {/* <span>Chiết khấu 3%</span> */}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="method-payment__item">
                          <div className="method-payment__left">
                            <span className="method-payment__icon">
                              <img
                                alt=""
                                src="http://media.vietteltelecom.vn/upload//d2/8e/ed/9fe6190b351055d26fe82fae4769b63dba6407de.png"
                                width="30"
                                height="30"
                              />
                            </span>
                            <div className="method-payment__detail">
                              <div className="method-payment__info">
                                <div className="method-payment__top js-toggle">
                                  <h5 className="method-payment__name">
                                    VNPAY: ATM Nội địa
                                  </h5>
                                </div>
                                <div className="method-payment__choose">
                                  <label className="radio-custom1">
                                    <input
                                      type="radio"
                                      name="radio"
                                      value="vnpay"
                                      checked={method == "vnpay"}
                                      onChange={(e) =>
                                        handleOnChange(e.target.value)
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                              </div>
                              <p className="method-payment__des">
                                {/* <span>Chiết khấu 3%</span> */}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="payment-online__right">
                  <div className="order-payment">
                    <h4 className="order-payment__title">Thông tin đơn hàng</h4>
                    <ul className="order-payment__list">
                      <li className="order-payment__item">
                        <span className="order-payment__name">Tổng tiền</span>
                        <span className="order-payment__value">
                          {dataChild.price} đ
                        </span>
                      </li>
                      <li className="order-payment__item last">
                        <span className="order-payment__name">
                          Tổng thanh toán
                        </span>
                        <span className="order-payment__value">
                          {dataChild.price} đ
                        </span>
                      </li>
                    </ul>
                    <div className="order-payment__btn">
                      <p
                        className="button button--primary"
                        onClick={() => PayOnline()}
                      >
                        Đồng ý
                      </p>
                      <p className="button button--normal button--register nowrap">
                        Quay lại
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pay;
