import Layout from "../../component/Layout/Basic/Layout";
import React, { useEffect, useState } from "react";
import Pay from "./index";
import { Modal } from "antd";
import {
  imggift,
  imgtele1,
  imgtele2,
  imgtele3,
  imgtele4,
} from "../../constants/images";
import "./style.css";
import { Link } from "react-router-dom";
import { sendGet } from "../../utils/api";
function IntroducePay() {
  document.title = "Cổng thanh toán ";
  const data = [
    {
      price: 10000,
      coin: 10,
      image: imgtele1,
    },
    {
      price: 20000,
      coin: 20,
      image: imgtele2,
    },
    {
      price: 30000,
      coin: 30,
      image: imgtele3,
    },
    {
      price: 40000,
      coin: 40,
      image: imgtele4,
    },
  ];
  const [active, setActive] = useState(0);
  const [dataChild, setDataChild] = useState(data[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [infoUser, setInfoUser] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setStep(2);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleActive = (index) => {
    setActive(index);
    setDataChild(data[index]);
  };
  const InfoUser = async () => {
    const res = await sendGet("/users/me");
    if (res.statusCode == 200) {
      setInfoUser(res.returnValue.data);
    } else {
      //đơn hàng thất bại
    }
  };
  useEffect(() => {
    InfoUser();
  }, []);
  return (
    <>
      <Layout>
        <div className="pay-wrapper">
          <div className={step === 1 ? "container" : "container hidden"}>
            <div className="section telecom-offer">
              <h2 className="section-title">Đổi xu</h2>
              <p className="section-desc">
                Bạn đang có
                <strong>
                  {infoUser?.coinAvailable.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
                xu. <br />
                Xem
                <Link className="" to="/tra-cuu-giao-dich">
                  <strong>lịch sử giao dịch</strong>
                </Link>
              </p>
              <div className="telecom-offer__content">
                <div className="telecom-pack">
                  <div className="tab-content">
                    <div id="pack-date" className="tab-pane active">
                      <div className="telecom-box">
                        <div className="telecom-box__exchange">
                          <p className="telecom-box__exchange-value">
                            <span>
                              {new Intl.NumberFormat("de-DE").format(10000)}
                            </span>
                            đ =<span>10</span>
                            xu
                          </p>
                        </div>
                        <ul className="telecom-box__list">
                          <li className="telecom-box__item">
                            <h5 className="telecom-box__sub">Thể lệ</h5>
                            <div className="telecom-box__detail">
                              <p>
                                Xu để đổi lấy khóa học hoặc thời gian support
                                của giảng viên
                              </p>
                              <p>Mức điểm đổi tối thiểu: 100 điểm.</p>
                              <p>Thời gian sử dụng: Không giới hạn.</p>
                              <p>1 xu = 1.000đ</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="exchange-point">
                  <h3 className="exchange-point__title">Gói điểm quy đổi</h3>
                  <ul className="exchange-point__list">
                    {data?.map((item, index) => (
                      <li
                        className={
                          active === index
                            ? "exchange-point__item active"
                            : "exchange-point__item"
                        }
                        onClick={() => handleActive(index)}
                      >
                        <span className="exchange-point__action">
                          <i class="fas fa-check"></i>
                        </span>
                        <div className="exchange-point__images img-hover">
                          <img src={item.image} alt="img" />
                          <div className="exchange-point__value">
                            <h3 className="exchange-point__value-title">
                              {item.coin}
                            </h3>
                            <h3 className="exchange-point__value-subtitle">
                              xu
                            </h3>
                          </div>
                        </div>
                        <div className="exchange-point__info">
                          <span className="exchange-point__icon">
                            <i class="fas fa-money-check-alt"></i>
                          </span>
                          <span className="exchange-point__name">
                            {new Intl.NumberFormat("de-DE").format(item.price)}{" "}
                            đ
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="telecom-offer__btn">
                  <p
                    className="button-plus button-plus--primary button-plus--medium"
                    onClick={showModal}
                  >
                    Xác nhận đổi điểm
                  </p>
                  <Modal
                    title=""
                    open={isModalOpen}
                    visible={isModalOpen}
                    centered
                    footer={null}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <div class="modal-endow">
                      <h3 class="modal-endow__title">Xác nhận đổi điểm</h3>
                      <div class="modal-endow__content">
                        <div class="modal-endow__images">
                          <img src={imggift} alt="img" />
                        </div>
                        <div class="modal-endow__exchange">
                          <span class="modal-endow__exchange-name">
                            {dataChild.price} đ
                          </span>
                          <span class="modal-endow__exchange-icon">
                            <i class="fas fa-exchange-alt"></i>
                          </span>
                          <span class="modal-endow__exchange-name">
                            {dataChild.coin} xu
                          </span>
                        </div>
                        <p class="modal-endow__des">
                          Xu sẽ được cộng vào tài khoản trong vòng 12 giờ
                        </p>
                      </div>
                      <div class="modal-endow__btn">
                        <p
                          class="button-plus button-plus--primary"
                          onClick={handleOk}
                        >
                          Xác Nhận
                        </p>
                        <p
                          rel="modal:close"
                          class="button-plus button-plus--normal"
                          onClick={handleCancel}
                        >
                          Quay Lại
                        </p>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <Pay step={step} dataChild={dataChild} />
        </div>
      </Layout>
    </>
  );
}

export default IntroducePay;
