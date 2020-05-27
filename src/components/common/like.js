import React from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.movie.liked) classes += "-o";
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={() => {
        props.handleLike(props.movie);
      }}
    ></i>
  );
};

export default Like;
