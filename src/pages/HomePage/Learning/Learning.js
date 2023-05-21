/* eslint-disable eqeqeq */
import React, { lazy, useEffect, useState } from "react";
import "./Learning.scss";
import Layout from "../../../component/Layout/Basic/Layout";
import { message } from "antd";
import { sendGet } from "../../../utils/api";
const LearningItem = lazy(() =>
  import("../../../component/LearningItem/LearningItem")
);
function Learning() {
  document.title = "Danh sách các khóa học tại Learn IT";
  const Token = localStorage.getItem("accessToken");
  const [courseVip, setcourseVip] = useState([]);
  const [comingsoon, setcomingsoon] = useState([]);
  const [courseNormal, setcourseNormal] = useState([]);
  const [data, setData] = useState([]);
  const [courseSuitable, setcourseSuitable] = useState([]);

  const listCourse = async () => {
    const res = await sendGet("/courses");
    if (res.statusCode === 200) {
      setcomingsoon(res.returnValue.data?.filter((item) => item.type == 2));
      setcourseNormal(res.returnValue.data?.filter((item) => item.type == 0));
      setcourseVip(res.returnValue.data?.filter((item) => item.type == 1));
      setcourseSuitable(
        res.returnValue.data?.filter((item) => item.path == "FRONTEND")
      );
    } else {
      message.error("Vui lòng thử lại sau!");
    }
  };
  const userCourse = async () => {
    if (Token) {
      const res = await sendGet("/courses/user/current");
      if (res.statusCode === 200) {
        setData(res.returnValue.data);
      } else {
        message.error("Vui lòng thử lại sau!");
      }
    }
  };
  useEffect(() => {
    listCourse();
    userCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Layout>
        <div className="Learning-wrapper">
          <section>
            <h1>Khóa học</h1>
            <p>
              Các khóa học được thiết kế phù hợp cho cả người mới, miễn phí, nội
              dung dễ hiểu.
            </p>
            {Token ? (
              <>
                <h2>Khóa đang học</h2>
                <div className="LearingList">
                  {data == null ? (
                    <p>Bạn chưa đăng kí khóa học nào</p>
                  ) : (
                    <>
                      {data?.map((item, index) => (
                        <LearningItem data={item.course} key={index} />
                      ))}
                    </>
                  )}
                </div>
              </>
            ) : null}
            <h2>Khóa sắp ra mắt</h2>
            <div className="LearingList">
              {comingsoon?.map((item, index) => (
                <LearningItem data={item} key={index} />
              ))}
            </div>
            {Token && (
              <>
                <h2>Khóa học phù hợp dành cho bạn</h2>
                <div className="LearingList">
                  {courseSuitable?.map((item, index) => (
                    <LearningItem data={item} key={index} />
                  ))}
                </div>
              </>
            )}
            <h2>Khóa học Vip</h2>
            <div className="LearingList">
              {courseVip?.map((item, index) => (
                <LearningItem data={item} key={index} />
              ))}
            </div>
            <h2>Khóa học Miễn phí</h2>
            <div className="LearingList">
              {courseNormal?.map((item, index) => (
                <LearningItem data={item} key={index} />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
export default Learning;
