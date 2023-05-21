/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useRouteMatch } from "react-router-dom";
import { sendGet, sendPut } from "../../../utils/api/index";
import { message, Skeleton } from "antd";
import Report from "./Report";
import { avt } from "../../../constants/images";
function BlogItem({ item }) {
  let match = useRouteMatch();
  const [, setSave] = useState([]);
  const [active, setActive] = useState(false);
  const [, setCopied] = useState(false);

  // thay doi
  const formatterDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formatterTime = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "numeric",
  });
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

  const Savepost = async (values) => {
    const res = await sendPut(`api/user/store`, { postId: values });
    setActive(!active);
    if (res.status === 200) {
      message.success("Lưu thành công!");
      setSave(res.data);
    } else {
      message.error("K lưu được!");
    }
  };
  return (
    <>
      <div className="Blog-item">
        <div className="Blog-header">
          <div className="Blog-author">
            <img
              alt="blog"
              src={item?.author?.avatar ? item?.author?.avatar : avt}
            />
            <span>
              {item?.author?.username ? item?.author?.username : "Author"}
            </span>
          </div>
          <div className="Blog-action">
            <i
              className={
                active ? "fas fa-bookmark bgColor" : "fas fa-bookmark "
              }
              onClick={() => Savepost(item?.id)}
            ></i>
            <i className="fas fa-ellipsis-h">
              <ul>
                <li>
                  <a
                    href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to&su=Tiêu đề &body=http://localhost:3000/learn/reactjs4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i class="fas fa-envelope"></i>Chia sẻ tới Email
                  </a>
                </li>
                <li onClick={copy}>
                  <i class="fas fa-link"></i>Sao chép liên kết
                </li>
                <Report />
              </ul>
            </i>
          </div>
        </div>
        <div className="Blog-content">
          <div className="Blog-info">
            <Link to={`${match.url}/${item?.id}`}>
              <h3>{item?.title}</h3>
            </Link>
            <p
              className="sub-title"
              dangerouslySetInnerHTML={{ __html: item?.currentContent }}
            />
            <div className="Blog-time">
              <span>
                <i class="far fa-calendar-alt"></i>
                {formatterDate.format(Date.parse(item?.createdAt))}
              </span>
              <span>
                <i class="fas fa-hourglass-half"></i>
                {formatterTime.format(Date.parse(item?.createdAt))}
              </span>
            </div>
          </div>
          <Link to={`${match.url}/${item?.id}`}>
            <div
              className="Blog-img"
              style={{ backgroundImage: `url(${item?.image})` }}
            ></div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BlogItem;
