import React, { useState } from "react";
import "./interact.scss";
import { haha, like, sad, angry, wow, heart } from "../../constants/images";
function ReactCmt(props) {
  const [active, setActive] = useState(false);
  const handleReact = (i) => {
    setActive((oldState) => !oldState);
    {
      const newLocal = props.count - 1;
      active
        ? props.parentCallback(newLocal)
        : props.parentCallback(props.count);
    }
    // setActiveIndex(i);
  };

  return (
    <>
      <span className="feeling">
        Thích
        <div className="active-react">
          <img onClick={handleReact} src={like} alt="react" title="like" />
          <img onClick={handleReact} src={heart} alt="react" title="heart" />
          <img onClick={handleReact} src={haha} alt="react" title="haha" />
          <img onClick={handleReact} src={wow} alt="react" title="wow" />
          <img onClick={handleReact} src={sad} alt="react" title="sad" />
          <img onClick={handleReact} src={angry} alt="react" title="angry" />
        </div>
      </span>
    </>
  );
}

export default ReactCmt;
