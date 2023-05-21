import React, { useEffect, useState } from "react";
import { Drawer, message } from "antd";
import "../interact/interact.scss";
import Comment from "../../component/interact/Comment";
import ReactCmt from "../../component/interact/react";
import "./DrawerComment.scss";
import { sendDelete, sendGet, sendPut } from "../../utils/api";
import { useParams } from "react-router-dom";
import { avt, haha, like } from "../../constants/images";
const DrawerComment = (props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(null);
  const [count, setCount] = useState(0);
  const [content, setContent] = useState();
  const params = useParams();
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleClick = () => {
    setShow(!show);
  };
  const ReactCMT = () => {
    setCount();
  };
  // thay doi
  const listComment = async () => {
    const res = await sendGet(`/comments`, {
      postId: parseInt(params.link),
      limit: 100,
    });
    if (res.statusCode === 200) {
      setData(res.returnValue.data);
      props.parentCallback(res.returnValue.data.data.length);
    } else {
      message.error("Không thể đăng bình luận");
    }
  };
  const deleteComment = async (e) => {
    try {
    } catch (error) {
      message.error("Không thể xóa bình luận");
    }
    await sendDelete(`/comments/${e}`);
    await listComment();
  };

  const showEditCmt = (value, content) => {
    setActive(value);
    setHidden(false);
    setContent(content);
  };
  const handleEdit = async (key, value) => {
    const res = await sendPut(`/comments`, { content: value, commentId: key });
    try {
      if (res.status === 200) {
        await listComment();
        setHidden(!hidden);
      }
    } catch (error) {}
  };
  useEffect(() => {
    listComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <i class="far fa-comment" onClick={showDrawer} />
      <Drawer
        width="720px"
        placement="right"
        onClose={onClose}
        visible={visible}
        closeIcon={<i class="fas fa-times"></i>}
      >
        <h3>{data?.data?.length >= 0 ? data?.data?.length : "0"} bình luận</h3>
        <Comment text="Viết bình luận..." listComment={listComment} />
        {data?.data?.map((item) => (
          <div className="comment">
            <div className="comment-item comment-text">
              <img alt="ảnh avt" src={avt} />
              <div className="comment-main">
                <div className="comment-content">
                  <h3 className="name">{item?.authorName}</h3>
                  <span>{item?.content}</span>
                  {active === item?.id ? (
                    <div className="editCmt" hidden={hidden}>
                      <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      ></input>
                      <button onClick={() => handleEdit(item?.id, content)}>
                        Gửi
                      </button>
                    </div>
                  ) : null}
                  <div>
                    <img src={like} alt="react" />
                    <img src={haha} alt="react" />
                    <span>{count}</span>
                  </div>
                </div>
                <div className="comment-react">
                  <ReactCmt parentCallback={ReactCMT} />
                  <span onClick={handleClick}>Bình luận</span>
                  <span className="time">{item?.createdAt}</span>
                </div>
              </div>
            </div>
            <div className="active">
              <i className="fas fa-ellipsis-h">
                <ul>
                  <li onClick={() => deleteComment(item?.id)}>Xóa</li>
                  <li
                    onClick={() => showEditCmt(item?.id, item?.content)}
                    key={item?.id}
                  >
                    Sửa
                  </li>
                </ul>
              </i>
            </div>
          </div>
        ))}
      </Drawer>
    </>
  );
};
export default DrawerComment;
