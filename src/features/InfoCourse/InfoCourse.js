/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, message, Modal, Result, Skeleton } from "antd";
import { useParams, useHistory } from "react-router-dom";
import "../DetailRoute/Detail.scss";
import "../../pages/HomePage/StudyRoute/StudyRoute.scss";
import "./InfoCourse.scss";
import { imggift } from "../../constants/images";
import Layout from "../../component/Layout/Basic/Layout";
import { sendGet, sendPost, sendPut } from "../../utils/api";
function InfoCourse() {
  const [infoCourse, setinfoCourse] = useState({});
  const [lesson, setLesson] = useState([]);
  const [login, setLogin] = useState();
  const [goal1, setGoal] = useState();
  const [requirement1, setRequirement] = useState();
  const params = useParams();
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pay, setPay] = useState(false);
  const Token = localStorage.getItem("accessToken");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getInfoCourse = async () => {
    const res = await sendGet(`/courses/${params.link}`);
    setinfoCourse(res.returnValue.data);
    setLesson(res.returnValue.data?.lessonList);
    setGoal(res.returnValue.data.goal.split("\n"));
    setRequirement(res.returnValue.data.requirement.split("\n"));
  };
  const handleOkPay = async () => {
    try {
      const res = await sendPost(`/courses/register`, {
        courseId: parseInt(params.link),
      });
      if (res.statusCode === 200) {
        message.success("Đăng kí khóa học thành công");
        setPay(false);
        return history.push(`/learn/${params.link}/${lesson[0].id}`);
      } else {
        message.success("Bạn không đủ xu để thanh toán.");
      }
    } catch (e) {
      if (e.response.data.statusCode === 400) {
        message.error("Bạn không đủ xu để thanh toán.");
      }
    }
  };
  const handleCancelPay = () => {
    setPay(false);
  };

  async function AddCourse() {
    if (infoCourse?.price == 0) {
      const res = await sendPost(`/courses/register`, {
        courseId: parseInt(params.link),
      });
      if (res.statusCode === 200) {
        message.success("Đăng kí khóa học thành công");
        return history.push(`/learn/${params.link}/${lesson[0].id}`);
      }
    } else {
      setPay(true);
    }
  }
  async function getCurrentLesson() {
    let res = await sendGet(`/lessons/user/currentLesson/${params.link}`);
    if (res.statusCode === 200) {
      return history.push(
        `/learn/${params.link}/${res?.returnValue?.data?.currentLesson}`
      );
    }
  }
  useEffect(() => {
    getInfoCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!Object.keys(infoCourse).length) return <Skeleton />;
  return (
    <>
      <Layout>
        <div className="InfoCourse-wrapper">
          <div className=" Detail-wrapper">
            <div className="StudyRoute-wrapper">
              <section className="Main-row">
                <div className="Main-left">
                  <h1>{infoCourse?.name}</h1>
                  <p>{infoCourse?.description}</p>
                  <div className="InfoCourse-content">
                    <h2>Bạn sẽ học được gì</h2>
                    <div className="target">
                      {goal1?.map((element, key) => (
                        <p key={key}>
                          <i className="fas fa-thumbtack"></i>
                          {element}
                        </p>
                      ))}
                    </div>
                    <h2>Nội dung khóa học</h2>
                    <div className="Course-main-title">
                      <ul>
                        <li>{lesson?.length} bài học</li>
                        {/* <li>2giờ 15 phút</li> */}
                      </ul>
                    </div>
                    <div className="Course-main">
                      {/* {lesson?.map((i, index) => (
                        <CourseItem data={i} key={index} />
                      ))} */}
                      {lesson?.length === 0 ? (
                        <p>Chưa có bài học</p>
                      ) : (
                        <>
                          {lesson?.map((i, index) => (
                            <div className="Course-lesson-item" key={index}>
                              <p className="Course-lesson-name">
                                <i class="fas fa-play-circle"></i>
                                {lesson?.indexOf(i) + 1}. {i.name}
                              </p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    <h2>Yêu cầu</h2>
                    {requirement1?.map((item, key) => (
                      <p key={key}>
                        <i className="fas fa-thumbtack"></i>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="Main-right">
                  <div className="Main-right-body">
                    <div className="Register-learn">
                      <div className="Coating">
                        <div
                          onClick={showModal}
                          className="Course-img"
                          style={{
                            backgroundImage: `url(${infoCourse?.img})`,
                          }}
                        >
                          <i className="fas fa-play-circle"></i>
                          <h4>Xem giới thiệu khóa học</h4>
                        </div>
                        <Modal
                          title="Giới thiệu khóa học"
                          visible={isModalVisible}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          width={912}
                          footer={null}
                          destroyOnClose={true}
                        >
                          <video
                            class="video-js vjs-default-skin"
                            src={infoCourse?.firstLesson?.link}
                            controls="controls"
                            width="100%"
                            height="400px"
                            crossorigin="anonymous"
                          ></video>
                        </Modal>
                      </div>
                      <p className="Price">
                        {infoCourse.price != "0"
                          ? `${infoCourse.price} xu`
                          : "Miễn phí"}
                      </p>
                      {Token ? (
                        <>
                          {infoCourse?.isRegisted == false ? (
                            <button onClick={() => AddCourse()}>
                              Bắt đầu học
                            </button>
                          ) : (
                            <button onClick={() => getCurrentLesson()}>
                              Tiếp tục học
                            </button>
                          )}
                        </>
                      ) : (
                        <button onClick={() => setLogin(true)}>
                          Bắt đầu học
                        </button>
                      )}

                      <p>
                        <i className="fas fa-seedling"></i>Trình độ :
                        {infoCourse?.level == 0
                          ? " CƠ BẢN"
                          : infoCourse?.level == 1
                          ? "KHÁ"
                          : " NÂNG CAO"}
                      </p>
                      <p>
                        <i className="fas fa-film"></i>Tổng số {lesson?.length}
                        bài học
                      </p>
                      {/* <p>
                        <i className="fas fa-clock"></i>Thời lượng 2 giờ 15 phút
                      </p> */}
                      <p>
                        <i className="fas fa-calendar-plus"></i>Học mọi lúc, mọi
                        nơi
                      </p>
                    </div>
                    <Modal
                      title=""
                      open={pay}
                      visible={pay}
                      centered
                      footer={null}
                      onOk={handleOkPay}
                      onCancel={handleCancelPay}
                    >
                      <div class="modal-endow">
                        <h3 class="modal-endow__title">
                          Xác nhận đăng ký khóa học
                        </h3>
                        <div class="modal-endow__content">
                          <div class="modal-endow__images">
                            <img src={imggift} alt="img" />
                          </div>
                          <div class="modal-endow__exchange">
                            <span class="modal-endow__exchange-name">
                              - {infoCourse?.price} xu
                            </span>
                          </div>
                          <p class="modal-endow__des">
                            Khóa học sẽ được kích hoạt trong vòng 12 giờ tới
                          </p>
                        </div>
                        <div class="modal-endow__btn">
                          <p
                            class="button-plus button-plus--primary"
                            onClick={handleOkPay}
                          >
                            Xác Nhận
                          </p>
                          <p
                            rel="modal:close"
                            class="button-plus button-plus--normal"
                            onClick={handleCancelPay}
                          >
                            Quay Lại
                          </p>
                        </div>
                      </div>
                    </Modal>
                    <Modal
                      title=""
                      open={login}
                      visible={login}
                      footer={false}
                      onCancel={() => setLogin(false)}
                    >
                      <Result
                        status="error"
                        title="Bạn cần đăng nhập"
                        extra={[
                          <Button
                            type="primary"
                            key="console"
                            onClick={() => history.push("/signin")}
                          >
                            Đăng nhập
                          </Button>,
                        ]}
                      />
                    </Modal>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default InfoCourse;
const CourseItem = (data) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className={show ? "Course-lesson-item active" : "Course-lesson-item "}
      >
        <div
          className="CurriculumOfCourse_headline "
          onClick={() => {
            setShow(!show);
          }}
        >
          <span className="CurriculumOfCourse_groupName">
            <i className={show ? "fas fa-minus" : "fas fa-plus"}></i>
            <strong>{data?.data?.title}</strong>
          </span>
          <span className="CurriculumOfCourse_timeOfSection">
            {data?.data?.track_steps?.length + 1} bài học
          </span>
        </div>
        {show && (
          <div className="CurriculumOfCourse_panelBody">
            {data?.data?.track_steps?.map((i, index) => (
              <div className=" CurriculumOfCourse_lessonItem" key={index}>
                <div className="CurriculumOfCourse_lessonName">
                  <i className="fas fa-play-circle"></i>
                  {i.step?.title}
                </div>
                <span className="CurriculumOfCourse_floatRight">
                  {Math.floor(i.step?.duration / 60)} :{" "}
                  {i.step?.duration - Math.floor(i.step?.duration / 60) * 60}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
