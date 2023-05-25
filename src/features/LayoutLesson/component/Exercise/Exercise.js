// @monaco-editor/react is Monaco editor wrapper for easy/one-line integration with React
// applications without need of webpack (or other module bundler)
// configuration files.

import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useHistory, useParams } from "react-router-dom";
import { ClockLoader as Loader } from "react-spinners";
import "./Exercise.scss";
import { Tabs } from "antd";
import { sendGet, sendPost } from "../../../../utils/api";
import { Collapse, Skeleton, message } from "antd";
import { DATA } from "../../../../constants/data";
const { Panel } = Collapse;
const { TabPane } = Tabs;
export default function Exercise(props) {
  const editorRef = useRef(null);
  const params = useParams();
  let history = useHistory();
  const [excercise, setExcercise] = useState({});
  const [temp, setTemp] = useState("");
  const [result, setResult] = useState([]);
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  function removeComments(code) {
    // Remove single-line comments

    code = code.replace(/\/\/.*/g, "");

    // Remove multi-line comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, "");

    return code;
  }
  async function showValue() {
    const res = await sendPost(`/exercises/do-exercise`, {
      exerciseId: parseInt(params.id),
      answer: removeComments(editorRef.current?.getValue()),
    });
    let check = res.returnValue.data.filter((e) => {
      return e.status == 0;
    });
    if (res.statusCode === 400) {
      message.error(res.message);
      return;
    }
    if (check.length > 0) {
      setResult(res.returnValue.data);
      message.error("Có lỗi trong quá trình thực hiện");
    } else {
      message.success("Bạn đã giải đúng.");
      setResult(res.returnValue.data);
      // setTimeout(() => history.goBack(), 5000);
    }
  }
  async function getLanguage() {
    let lang = await sendGet(`/lessons/user/${params.lessonid}`);
    if (lang.statusCode === 200) {
      if (lang.returnValue.data?.course?.language === "c") {
        setTemp(DATA.C_BASIC);
      } else if (lang.returnValue.data?.course?.language === "java") {
        setTemp(DATA.JAVA_BASIC);
      } else if (lang.returnValue.data?.course?.language === "python3") {
        setTemp(DATA.PYTHON_BASIC);
      } else setTemp("function resolve(){\n//Viet code o day nhe\n\n}");
    }
  }
  async function getExcercise() {
    const res = await sendGet(`/exercises/user/${params.id}`);
    if (res.statusCode === 200) {
      setExcercise(res.returnValue.data);
    }
  }

  useEffect(() => {
    getExcercise();
    getLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!Object.keys(excercise).length)
    return (
      <div className="example">
        <Skeleton />
      </div>
    );
  return (
    <>
      <div className="Exercise-wrapper">
        <header>
          <span className="pre" onClick={() => history.goBack()}>
            <i class="fas fa-chevron-left"></i>Quay lại
          </span>
          <div className="button">
            <button className="btn-run" onClick={showValue}>
              Lưu
            </button>
          </div>
          <p>
            Học lập trình để đi làm cùng <span>Learn IT</span>
          </p>
        </header>
        <div className="Exercise-main">
          <Editor
            width="70%" // By default, it fully fits with its parent
            defaultLanguage="javascript"
            loading={<Loader />}
            value={`//viết code ở đây nhé! KMA with love\n//Đề bài: ${excercise?.question}\n//Mô tả: ${excercise?.description}\n${temp}`}
            onMount={handleEditorDidMount}
          />
          <div className="result">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Test Case" key="1">
                {excercise.testCases?.map((e, key) => (
                  <Collapse bordered={false} defaultActiveKey={key}>
                    <Panel header="TestCase" key={key}>
                      <p>
                        <strong>Input:</strong> {e?.input}
                      </p>
                      <p>
                        <strong>Expect:</strong> {e?.output}
                      </p>
                      <p className="output">
                        <strong>Output:</strong>

                        {result[key]?.output}
                      </p>
                      {result[key]?.status === 0 ? (
                        <div
                          className="status"
                          style={{ backgroundColor: "rgb(202, 52, 52)" }}
                        >
                          <i class="fas fa-times"></i>
                        </div>
                      ) : null}
                      {result[key]?.status === 1 ? (
                        <div
                          className="status"
                          style={{ backgroundColor: "#49e17cc9" }}
                        >
                          <i class="fas fa-check"></i>
                        </div>
                      ) : null}
                    </Panel>
                  </Collapse>
                ))}
              </TabPane>
              <TabPane tab="Hỏi đáp" key="2">
                <Comment />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
const Comment = () => {
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const listComment = [
    {
      avt: "https://i.pinimg.com/564x/a2/c5/f3/a2c5f3725f5b5fbfc06ae2b8f7d87eb6.jpg",
      author: "Mai lam 1",
      comment: "e không cài đc live sever ạ",
      reply: [
        {
          avt: "https://i.pinimg.com/564x/a2/c5/f3/a2c5f3725f5b5fbfc06ae2b8f7d87eb6.jpg",
          author: "Mai lam 1",
          value: "trar loiwf 1",
        },
        {
          avt: "https://i.pinimg.com/564x/a2/c5/f3/a2c5f3725f5b5fbfc06ae2b8f7d87eb6.jpg",
          author: "Mai lam 1",
          value: "trar loiwf 1",
        },
      ],
    },
    {
      avt: "https://i.pinimg.com/564x/0b/9a/8c/0b9a8c8f3218f9dd20d2725ca13664e5.jpg",
      author: "Mai lam 2",
      comment: "rồi bật trên chrome lên ntn để coi như trên bài học? ",
      reply: [
        {
          avt: "https://i.pinimg.com/564x/a2/c5/f3/a2c5f3725f5b5fbfc06ae2b8f7d87eb6.jpg",
          author: "Mai lam 1",
          value: "trar loiwf 1",
        },
        {
          avt: "https://i.pinimg.com/564x/a2/c5/f3/a2c5f3725f5b5fbfc06ae2b8f7d87eb6.jpg",
          author: "Mai lam 1",
          value: "trar loiwf 1",
        },
      ],
    },
  ];
  const handleSubmit = async (values) => {
    // const data = {
    // content: content,
    // };
    // await sendPost(`/api/comment/${params.link}`, data);
    // const res = await sendGet(`/api/comment/${params.link}`);
    // if (res.status === 200) {
    // props.listComment();
    // } else {
    // message.error("Không thể đăng bình luận");
    // }
    setContent("");
  };
  return (
    <>
      <div className="comment-user">
        <div className="comment-text">
          <img
            alt="ảnh avt"
            src="https://i.pinimg.com/736x/99/03/18/99031823c7a9704dc825a24fb4decbc8.jpg"
          />
          <input
            onClick={() => setShow(true)}
            placeholder="Bạn có thắc mắc gì trong bài học này"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={show ? "comment-btn show" : "comment-btn"}>
          <div>
            <button className="cancel" onClick={() => setShow(false)}>
              Hủy
            </button>
            <button className="submit" onClick={handleSubmit}>
              Bình luận
            </button>
          </div>
        </div>
      </div>
      <div className="list_comment">
        {listComment?.map((item, index) => (
          <>
            <div className="comment" key={index}>
              <div className="comment-item comment-text">
                <img alt="ảnh avt" src={item.avt} />
                <div className="comment-main">
                  <div className="comment-content">
                    <h3 className="name">{item.author}</h3>
                    <span>{item?.comment}</span>
                  </div>
                </div>
              </div>
              <div className="active">
                <i className="fas fa-ellipsis-h">
                  <ul>
                    <li>Xóa</li>
                    <li>Sửa</li>
                  </ul>
                </i>
              </div>
            </div>
            <div class="Comment_commentTime">
              <div class="Comment_createdAt">
                <div class="Comment_createdAtLeft">
                  <span class="Comment_likeComment">Thích</span>·
                  <span class="Comment_replyComment">Trả lời</span>
                </div>
                <div class="Comment_createdAtRight">
                  <span class="Comment_createdAtDotRight"> · </span>
                  <span class="Comment_time">2 tháng trước</span>
                  <span class="Comment_createdAtDotRight"> · </span>
                </div>
              </div>
            </div>
            <div className="comment_reply">
              {item.reply.map((i, key) => (
                <div className="reply-item" key={key}>
                  <div className="comment">
                    <div className="comment-item comment-text">
                      <img alt="ảnh avt" src={i.avt} />
                      <div className="comment-main">
                        <div className="comment-content">
                          <h3 className="name">{i.author}</h3>
                          <span>{i?.value}</span>
                        </div>
                      </div>
                    </div>
                    <div className="active">
                      <i className="fas fa-ellipsis-h">
                        <ul>
                          <li>Xóa</li>
                          <li>Sửa</li>
                        </ul>
                      </i>
                    </div>
                  </div>
                  <div class="Comment_commentTime">
                    <div class="Comment_createdAt">
                      <div class="Comment_createdAtLeft">
                        <span class="Comment_likeComment">Thích</span>·
                        <span class="Comment_replyComment">Trả lời</span>
                      </div>
                      <div class="Comment_createdAtRight">
                        <span class="Comment_createdAtDotRight"> · </span>
                        <span class="Comment_time">2 tháng trước</span>
                        <span class="Comment_createdAtDotRight"> · </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
};
