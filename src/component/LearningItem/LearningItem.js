/* eslint-disable eqeqeq */
import React from "react";
import { Link } from "react-router-dom";
import "./LearningItem.scss";
import { imgErr, logo, pro } from "../../constants/images";
function Course(props) {
  return (
    <>
      <div className={props?.data?.type == 2 ? "Learning-item Learning-item-disable" : "Learning-item"}>
        <Link to={props?.data?.type == 2 ? "#" : `/course/${props?.data?.id}`}>
          <div className="img-item">
            <img
              src={props?.data?.img}
              alt="ảnh khóa học"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${imgErr}`;
              }}
            />
            {props?.data?.type == 2 && (
              <div className="icon-pro">
                <img src={pro} alt="" />
              </div>
            )}
          </div>
        </Link>
        <Link to={props?.data?.type == 2 ? "#" : `/course/${props?.data?.id}`}>
          <h3>{props?.data?.name}</h3>
        </Link>
        {props?.data?.type == 1 && (
          <div class="price">
            <i class="fas fa-donate" style={{ color: "#ea5252", fontSize: '18px' }}></i>
            {props?.data?.price_old && (
              <span class="CourseItem_old-price">
                {props?.data?.price_old} xu
              </span>
            )}
            <span class="CourseItem_main-price">{props?.data?.price} xu</span>
          </div>
        )}
        {props?.data?.type != 2 && (
          <div
            className="popover-course arrow-left"
            style={{ left: "calc(100%)", right: "unset" }}
          >
            <Link to={`/course/${props?.data?._id}`}>
              <h3 className="popover-course__title">{props?.data?.name}</h3>
            </Link>
            <div className="popover-course__sum">
              <div className="author">
                <img src={logo} alt="Learnit" className="author-img" />
                <Link href="/about" className="user-name">
                  LearnIt
                </Link>
              </div>
            </div>
            <p class="course-description">{props?.data?.description}</p>
            <ul className="popover-course__detail-infor">
              <li>
                <p>
                  <i class="fab fa-dribbble"></i> Online
                </p>
              </li>
              <li>
                <p>
                  <i class="far fa-user"></i> 19791 thành viên
                </p>
              </li>
              <li>
                <p>
                  <i class="far fa-clock"></i> Tổng số bài học:
                  <strong>24 bài</strong>
                </p>
              </li>
              <li>
                <p>
                  <i class="fas fa-award"></i> Chứng chỉ hoàn thành khóa học
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Course;
