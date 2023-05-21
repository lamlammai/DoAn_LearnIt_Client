/* eslint-disable no-unused-vars */
// thay doi
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { sendGet, sendPut } from "../../../utils/api/index";
import { message, Skeleton } from "antd";

import Report from "./Report";
function BlogItemTopic({ item }) {
  console.log(`item`, item);
  const [save, setSave] = useState([]);
  const [active, setActive] = useState(false);
  const [, setCopied] = useState(false);
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
      console.log(res.data);
    } else {
      message.error("K lưu được!");
    }
  };

  return (
    <>
      {/* <InfiniteScroll
        dataLength={data.length}
        next={listBlog}
        hasMore={data.length < 10}
        loader={<Skeleton active />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! Bạn đang ở cuối trang!</b>
          </p>
        }
      > */}
      <div className="Blog-item">
        <div className="Blog-header">
          <div className="Blog-author">
            <img alt="blog" src={item?.author?.avatar} />
            <span>{item?.author?.username}</span>
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
            <Link to={`/blog/${item?.id}`}>
              <h3>{item?.title}</h3>
            </Link>
            <p
              className="sub-title"
              dangerouslySetInnerHTML={{ __html: item?.currentContent }}
            />
            <div className="Blog-time">
              <span>
                <i class="far fa-calendar-alt"></i>
                {item?.createdAt}
              </span>
              <span>
                <i class="fas fa-hourglass-half"></i>
                {item?.time}
              </span>
            </div>
          </div>
          <Link to={`/blog/${item?.id}`}>
            <div
              className="Blog-img"
              style={{ backgroundImage: `url(${item?.img})` }}
            ></div>
          </Link>
        </div>
      </div>
      {/* </InfiniteScroll> */}
    </>
  );
}

export default BlogItemTopic;
