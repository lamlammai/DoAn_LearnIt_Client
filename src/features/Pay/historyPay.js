/* eslint-disable */
import React, { useEffect, useState } from "react";
import { sendGet } from "../../utils/api";
import { avt, vnpay } from "../../constants/images";
import { Skeleton } from "antd";
import "./style.css";
import Layout from "../../component/Layout/Basic/Layout";

export default function PayHistoryV2() {
  const [infoUser, setInfoUser] = useState();
  const InfoUser = async () => {
    const res = await sendGet("/users/me");
    if (res.statusCode == 200) {
      setInfoUser(res.returnValue.data?.transactions);
    } else {
      //đơn hàng thất bại
    }
  };
  useEffect(() => {}, []);
  const formatterDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formatterTime = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
  useEffect(() => {
    InfoUser();
  }, []);
  // if (!Object.keys(HistoryV2).length) return <Skeleton />;
  return (
    <>
      <Layout>
        <div className="pay__wrapper history-wrapper">
          <h3 className="history-title">Lịch sử giao dịch</h3>
          <li class="HistoryV2-list__info-year">
            <ul class="HistoryV2-list__info">
              {infoUser?.map((item, index) => (
                <li class="HistoryV2-item__info" key={index}>
                  <div class="HistoryV2-images">
                    <img src={vnpay} alt="" />
                  </div>
                  <div class="HistoryV2-des">
                    <div class="HistoryV2-des__title_group">
                      <h4 class="HistoryV2-des__title">
                        Đổi {item?.amount / 1000} xu
                      </h4>
                      <div class="HistoryV2-des__sub-title">
                        <div class="HistoryV2-des__sub-date_time">
                          <p>
                            {formatterDate.format(Date.parse(item?.createdAt))}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="HistoryV2-des__sub">
                      <div class="HistoryV2-des__sub-price">
                        <p>{formatterPrice.format(item?.amount)}đ</p>
                      </div>
                      <div class="HistoryV2-des__sub-date_time">
                        <p>
                          {item?.status == 1
                            ? "Thành công"
                            : item?.status == 2
                            ? "Đang xử lý"
                            : "Thất bại"}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </div>
      </Layout>
    </>
  );
}
