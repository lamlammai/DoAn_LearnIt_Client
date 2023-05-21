/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import "./LayoutLesson.scss";
import { message, Tabs, Skeleton, Modal } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { icon } from "../../constants/images";
import Tutorial from "./component/Tutorial/Tutorial";
import { sendGet, sendPost } from "../../utils/api";
const { TabPane } = Tabs;
function LayoutLesson() {
  const params = useParams();
  const [zoom, setZoom] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState([]);
  const [dataVideo, setDataVideo] = useState([]);
  const [name, setName] = useState("Học lập trình cùng LearIT");
  // eslint-disable-next-line no-unused-vars
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState([]);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [nextLesson, setNextLesson] = useState();
  const [preLesson, setPreLesson] = useState();
  const [listNote, setListNote] = useState([]);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    message.success("Bạn đã copy link bài học!");
  }
  const handleZoom = () => {
    setZoom(!zoom);
    setView(!view);
  };
  const path = useLocation();
  let history = useHistory();
  const getInfoLesson = async () => {
    const res = await sendGet(`/lessons/user/${params.id}`);
    if (res.statusCode === 200) {
      setDataVideo(res?.returnValue?.data?.link);
      setNextLesson(res?.returnValue?.data?.nextLessonId);
      setPreLesson(res?.returnValue?.data?.previousLessonId);
      setName(res.returnValue.data?.course?.name);
    } else message.error("Thử lại sau.");
  };
  const getAllLesson = async () => {
    const res = await sendGet(`/lessons/user`, {
      courseId: params.link,
    });
    if (res.statusCode === 200) {
      setData(res?.returnValue?.data);
      // setCount(res?.count);
      // setComplete(res?.complete);
    } else message.error("Thử lại sau.");
  };
  const NextLesson = async (e) => {
    try {
      await sendGet(`/lessons/user/${nextLesson?.id}`);
      history.push(`/learn/${params.link}/${nextLesson?.id}`);
    } catch (e) {
      if (e.response.data.code === "ERR_LESSON_003") {
        message.error(
          "Bạn cần hoàn thiện bài tập trước khi chuyển sang bài tiếp theo"
        );
      }
    }
  };
  const PreLesson = async (e) => {
    try {
      await sendGet(`/lessons/user/${preLesson?.id}`);
      history.push(`/learn/${params.link}/${preLesson?.id}`);
    } catch (e) {
      if (e.response.data.code === "ERR_LESSON_003") {
        message.error("Bạn đang ở bài đầu tiên");
      }
    }
  };
  const handleNote = async () => {
    const res = await sendPost(`/lessons/user/note`, {
      lessonId: parseInt(params.id),
      notes: note,
      second: 0,
    });
    if (res.statusCode === 200) {
      setShowNote(false);
      message.success("Thêm ghi chú thành công");
      setNote("");
      await getNote();
    } else {
      message.error("Vui lòng thử lại sau");
    }
  };
  const [, setTimeVideo] = React.useState(0);
  const [timeCurrent, setTimeCurrent] = React.useState(0);
  const [timePlaying, setTimePlaying] = React.useState(0);
  const [showDialog, setShowDialog] = React.useState(false);
  const videoPlayerRef = React.useRef(null);
  const onChange = (e) => {
    if (e.target.currentTime - timeCurrent > 10) {
      setShowDialog(true);
      setTimePlaying(timeCurrent);
    } else {
      setShowDialog(false);
    }
    setTimeCurrent(e.target.currentTime);
  };
  const onLoadVideo = (e) => {
    setTimeVideo(e.target.duration);
  };
  const handleTimePlaying = () => {
    setShowDialog(false);
    videoPlayerRef.current.currentTime = timePlaying;
  };
  const getNote = async () => {
    const res = await sendGet(`/lessons/user/note/${params.id}`);
    if (res.statusCode === 200) {
      setListNote(res.returnValue.data);
    } else {
      message.error("Vui lòng thử lại sau");
    }
  };
  useEffect(() => {
    getInfoLesson();
    getAllLesson();
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  if (!Object.keys(data).length) return <Skeleton />;

  return (
    <>
      <div className="LayoutLesson-wrapper">
        <header>
          <div className="Header-left">
            <i
              className="fas fa-chevron-left"
              onClick={() => history.push("/")}
            ></i>
            <Link to="/">
              <img alt="logo" src={icon} />
            </Link>
            <p className="title">{name}</p>
          </div>
          <Tutorial />
        </header>
        <div className="container">
          <section className={classNames("container-left", { view: view })}>
            <div className="content-lesson">
              <i
                className="fas fa-chevron-left"
                onClick={() => PreLesson()}
                hidden={params.id == data?.lessons[0]?.id ? true : false}
              ></i>
              <video
                id="playerOne"
                onLoadedData={onLoadVideo}
                ref={videoPlayerRef}
                onCanPlay={onChange}
                class="video-js vjs-default-skin"
                src={dataVideo}
                controls="controls"
                width="80%"
                crossOrigin="anonymous"
              ></video>
              <i
                className="fas fa-chevron-right"
                onClick={() => NextLesson()}
                hidden={
                  params.id == data.lessons[data?.lessons.length - 1]?.id
                    ? true
                    : false
                }
                style={{ pointerEvents: active }}
              ></i>
              {zoom && (
                <div onClick={handleZoom} className="path-view">
                  <MenuFoldOutlined />
                  <span className="text">Xem lộ trình</span>
                </div>
              )}
            </div>
            <div className="sub-content-lesson">
              <div className="sub-lesson-main">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Nội dung" key="0" className="Content-reponsive">
                    <div className="content part">
                      {data?.lessons.map((i, key) => (
                        <LessonItem
                          data={i}
                          currentLesson={data.currentLesson}
                          key={key}
                        />
                      ))}
                    </div>
                  </TabPane>
                  <TabPane tab="Tổng quan" key="1">
                    <div className="overview">
                      <div className="title">
                        <p>
                          Tham gia nhóm{" "}
                          <a
                            href="https://www.facebook.com/groups/649972919142215"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Học lập trình tại Learn IT
                          </a>
                          trên Facebook để cùng nhau trao đổi trong quá trình
                          học tập ❤️
                        </p>
                        <p>
                          Các bạn subscribe kênh Youtube{" "}
                          <a
                            href="https://www.youtube.com/c/F8VNOfficial"
                            target="_blank"
                            rel="noreferrer"
                          >
                            LI Official
                          </a>{" "}
                          để nhận thông báo khi có các bài học mới nhé ❤️
                        </p>
                      </div>
                      <div className="answer">
                        <div className="share">
                          <p>Chia sẻ</p>
                          {/* sau ?u là đường link mình muốn share */}
                          <a
                            style={{ backgroundColor: "#4080ff" }}
                            href="https://www.facebook.com/sharer/sharer.php?u=http://learnit-kma.me/learn/reactjs4"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          {/* sau su là tiêu đề saubody là đường link chia sẻ */}
                          <a
                            style={{ backgroundColor: "#F47425" }}
                            href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to&su=Tiêu đề &body=http://learnit-kma.me/learn/reactjs4"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fas fa-envelope"></i>
                          </a>
                          {/* sao chép */}
                          <button
                            style={{ backgroundColor: "#666666" }}
                            onClick={copy}
                          >
                            <i className="fas fa-link"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Ghi chú" key="2">
                    {!showNote && (
                      <div className="note">
                        <div
                          className="note-top"
                          onClick={() => setShowNote(true)}
                        >
                          <p>Tạo ghi chú</p>
                          <i className="fas fa-plus-circle"></i>
                        </div>
                      </div>
                    )}
                    {showNote && (
                      <div className="CreateNote_wrapper">
                        <h2 class="CreateNote_heading">Thêm ghi chú</h2>
                        <input
                          className="CreateNote_value"
                          placeholder="nhập ghi chú"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                        <div class="Editor_editorActions">
                          <button
                            class="Button_btn Editor_cancelBtn"
                            onClick={() => setShowNote(false)}
                          >
                            Hủy bỏ
                          </button>
                          <button
                            class="Button_btn Button_primary"
                            onClick={() => handleNote()}
                          >
                            Tạo ghi chú
                          </button>
                        </div>
                      </div>
                    )}
                    {listNote.length > 0 ? (
                      <ul className="note-result-list">
                        {listNote?.map((item, index) => (
                          <li class="NoteItem_item" key={index}>
                            <div className="NoteItem_action">
                              <i class="fas fa-pencil-alt"></i>
                              <i class="fas fa-trash"></i>
                            </div>
                            <p className="note-content">{item?.notes}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="note-result">
                        <i class="fas fa-money-check-edit"></i>
                        <h4>Bạn chưa có ghi chú nào</h4>
                        <p>Hãy ghi chép để nhớ những gì bạn đã học!</p>
                      </div>
                    )}
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </section>
          {/* right */}
          <section className={classNames("container-right", { zoom: zoom })}>
            <div className="process">
              <div>
                <p>{name}</p>
                <p>
                  Hoàn thành {count}/{data?.lessons?.length} bài học
                </p>
              </div>
              <MenuUnfoldOutlined onClick={handleZoom} />
            </div>
            <div className="part">
              {data?.lessons.map((i, key) => (
                <LessonItem
                  data={i}
                  key={key}
                  currentLesson={data.currentLesson}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      {showDialog && (
        <Modal
          title="Cảnh báo"
          open={showDialog}
          visible={showDialog}
          footer={null}
          centered
          onCancel={() => handleTimePlaying()}
        >
          <div class="Dialog_content">
            Bạn đang học nhanh hơn bình thường, vui lòng không tua quá nhiều khi
            học!
          </div>
          <button
            class="Button_btn Button_primary Dialog_confirm-button"
            onClick={() => handleTimePlaying()}
          >
            Đồng ý
          </button>
        </Modal>
      )}
    </>
  );
}

export default LayoutLesson;
const LessonItem = ({ data, currentLesson }) => {
  const params = useParams();
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={show ? "lesson Lesson-item active" : "lesson Lesson-item "}
      >
        <div className="TrackItem_track-steps-list">
          {/* {data?.map((i, key) => ( */}
          <>
            <div
              className={
                currentLesson?.currentLesson >= data.id
                  ? "lesson-main "
                  : "lesson-main-hidden"
              }
            >
              <div className="lesson-name">
                <Link to={`/learn/${params.link}/${data?.id}`}>
                  <p>{data?.name}</p>
                </Link>
                <i
                  className={
                    currentLesson.currentLesson >= data.id
                      ? "fas fa-check"
                      : "fas fa-lock"
                  }
                ></i>
              </div>
              <div className="lesson-time">
                {/* <i className="fas fa-play-circle">20:11</i> */}
              </div>
              {data.exercises && (
                <div className="exercise">
                  {data.exercises.length > 0 && <h3>Bài tập</h3>}
                  {data.exercises?.map((e, key) => (
                    <p key={key}>
                      <Link to={`/exercise/${data?.id}/${e?.id}`}>
                        {e?.status ? (
                          <i
                            className="fa fa-check"
                            style={{ margin: "0px" }}
                          ></i>
                        ) : (
                          <span className="exercise-number">{key + 1}</span>
                        )}
                      </Link>
                    </p>
                  ))}
                </div>
              )}
            </div>
          </>
          {/* ))} */}
        </div>
      </div>
    </>
  );
};
const LessonItem2 = (data) => {
  return (
    <>
      <div className="part">
        {data?.map((i, index) => (
          <div className="lesson" key={index}>
            {data.pathname === `/learn/${data.link}/${i.id}` ? (
              <>
                <div
                  className="lesson-main "
                  style={{ backgroundColor: "#FCDCD3" }}
                >
                  <div className="lesson-name">
                    <i class="fas fa-check"></i>
                    <Link to={i.id}>
                      <p>{i.name}</p>
                    </Link>
                  </div>
                  <div className="lesson-time">
                    <i class="fas fa-play-circle"></i>
                  </div>
                </div>
                <div className="exercise" style={{ "pointer-events": "auto" }}>
                  {i.excercises?.length === 0 ? null : <h3>Bài tập</h3>}
                  {i.excercises?.map((index) => (
                    <>
                      <p>
                        <Link to={`/exercise/${index.id}`}>
                          {data?.complete.includes(index.id) ? (
                            <i
                              class="fa fa-check"
                              style={{ margin: "0px" }}
                              aria-hidden="true"
                            ></i>
                          ) : (
                            i.excercises?.indexOf(index) + 1
                          )}
                        </Link>
                      </p>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div
                  className="lesson-main"
                  style={
                    i.status
                      ? { "pointer-events": "auto" }
                      : {
                          "pointer-events": "none",
                          backgroundColor: "#f1f1f1",
                        }
                  }
                >
                  <div className="lesson-name ">
                    <i class={i.status ? "fas fa-check" : "fas fa-lock"}></i>
                    <Link to={i._id}>
                      {" "}
                      <p>{i.name}</p>
                    </Link>
                  </div>
                  <div className="lesson-time">
                    <i class="fas fa-play-circle"></i>
                  </div>
                </div>
                <div className="exercise" style={{ "pointer-events": "none" }}>
                  {i.excercises?.length === 0 ? null : <h3>Bài tập</h3>}
                  {i.excercises?.map((index) => (
                    <>
                      <p>
                        <Link to={`/exercise/${i._id}`}>
                          {i.excercises?.indexOf(index) + 1}
                        </Link>
                      </p>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
