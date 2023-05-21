/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Checkbox, message } from "antd";
import "./SignIn.scss";
import { logo, imgwelcome, arrow, form2 } from "../../constants/images";
import { sendGet, sendPost, sendPut } from "../../utils/api";
import { setItem } from "../../utils/storage";
export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({});
  const [groupCourse, setGroupCourse] = useState();
  const [groupTopic, setGroupTopic] = useState();
  async function getProfile() {
    const res = await sendGet("/users/me");
    if (res.statusCode === 200) setProfile(res.returnValue.data);
  }
  useEffect(() => {
    getProfile();
  }, []);
  const topic = [
    {
      label: "Backend",
      value: "topicBackend",
    },
    {
      label: "FrontEnd",
      value: "topicFrontEnd",
    },
    {
      label: "Basic",
      value: "topicBasic",
    },
    {
      label: "Mobile",
      value: "topicMobile",
    },
    {
      label: "Devops",
      value: "topicsDevops",
    },
    {
      label: "Other",
      value: "topicOther",
    },
  ];
  const course = [
    {
      label: "Basic",
      value: "courseBasic",
    },
    {
      label: "Backend",
      value: "courseBackend",
    },
    {
      label: "Mobile",
      value: "courseMobile",
    },
    {
      label: "Frontend",
      value: "courseFrontend",
    },
    {
      label: "Fullstack",
      value: "courseFullstack",
    },
    {
      label: "Other",
      value: "courseOther",
    },
  ];
  const onChangeTopic = (checkedValues) => {
    console.log("onChangeTopic = ", checkedValues);
    setGroupTopic(checkedValues);
  };
  const onChangeCourse = (checkedValues) => {
    console.log("onChangeCourse = ", checkedValues);
    setGroupCourse(checkedValues);
  };
  const completedOnboarding = async () => {
    try {
      const res = await sendPut("/users/prefer", {
        courseBasic: groupCourse.includes("courseBasic") ? true : false,
        courseBackend: groupCourse.includes("courseBackend") ? true : false,
        courseMobile: groupCourse.includes("courseMobile") ? true : false,
        courseFrontend: groupCourse.includes("courseFrontend") ? true : false,
        courseFullstack: groupCourse.includes("courseFullstack") ? true : false,
        courseOther: groupCourse.includes("courseOther") ? true : false,
        topicBackend: groupTopic.includes("topicBackend") ? true : false,
        topicFrontEnd: groupTopic.includes("topicFrontEnd") ? true : false,
        topicBasic: groupTopic.includes("topicBasic") ? true : false,
        topicMobile: groupTopic.includes("topicMobile") ? true : false,
        topicsDevops: groupTopic.includes("topicsDevops") ? true : false,
        topicOther: groupTopic.includes("topicOther") ? true : false,
      });
      if (res.statusCode === 200) {
        window.location.href = "/";
        message.success("Đã ghi nhận");
      } else {
        message.error("Thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="onboarding__wrapper">
        <div
          className={
            step === 1 ? "Onboarding-container step1" : "Onboarding-container"
          }
        >
          <div className="Welcome_wrapper">
            <div className="Welcome_welcome-right">
              <h1>
                Xin chào, <span>{profile?.username}!</span>
              </h1>
              <p>
                <span class="Welcome_welcome-right-main">
                  Chào mừng bạn đã đến với cộng đồng học lập trình Online ,
                </span>
              </p>
              <p>
                Để xây dựng hướng đi hoàn hảo nhất, <br /> giúp chúng mình trả
                lời một vài câu hỏi nhé!
              </p>
              <div
                class="Welcome_button button-primary"
                onClick={() => setStep(2)}
              >
                <span class="Button_title">Đồng ý</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            step === 2 ? "Onboarding-container step2" : "Onboarding-container"
          }
        >
          <div class="Onboarding_back" onClick={() => setStep(1)}>
            <div class="Onboarding_back-button">
              <img src={arrow} alt="back-icon" />
            </div>
          </div>
          <div className="Welcome_wrapper">
            <div className="Welcome_welcome-left">
              <img src={form2} alt="welcome" />
            </div>
            <div className="Welcome_welcome-right">
              <div className="Welcome_welcome_group">
                {" "}
                <div className="step3">
                  <h1>Chuyên ngành muốn tìm hiểu</h1>
                  <Checkbox.Group options={course} onChange={onChangeCourse} />
                </div>
                <div className="step3">
                  <h1>Chủ đề bạn quan tâm</h1>
                  <Checkbox.Group options={topic} onChange={onChangeTopic} />
                </div>
              </div>

              <div
                class="Welcome_button button-primary"
                onClick={() => completedOnboarding()}
              >
                <span class="Button_title">Bắt đầu học</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
