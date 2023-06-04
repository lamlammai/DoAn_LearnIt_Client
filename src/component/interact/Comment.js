import { message } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { sendGet, sendPost } from "../../utils/api";
import "./interact.scss";
import { avt } from "../../constants/images";
function Comment({ listComment, text }) {
  const params = useParams();
  const [show, setShow] = useState(true);
  // thay doi
  const [content, setContent] = useState("");

  const handleSubmit = async (values) => {
    try {
      const data = {
        content: content,
        // parrentCommentId: 1,
        postId: parseInt(params.link),
      };
      const res = await sendPost(`/comments`, data);
      if (res.statusCode === 200) {
        await listComment();
        setContent("");
      } else {
        message.error("Không thể đăng bình luận");
      }
    } catch (error) {
      message.error("Không thể đăng bình luận");
    }
  };
  return (
    <>
      <div className="comment-user">
        <div className="comment-text">
          <img alt="ảnh avt" src={avt} />
          <input
            onClick={() => setShow(false)}
            placeholder={text}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={show ? "comment-btn" : "comment-btn show"}>
          {/* <i class="fas fa-code">
            <span>Chèn code</span>
          </i> */}
          <div>
            <button className="cancel" onClick={() => setShow(true)}>
              Hủy
            </button>
            <button className="submit" onClick={handleSubmit}>
              Bình luận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
