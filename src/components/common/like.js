import React from "react";

const Like = ({movie, handleLike}) => {
  let classes = "fa fa-heart";
  if (!movie.liked) classes += "-o";
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={() => {
        handleLike(movie);
      }}
    ></i>
  );
};

export default Like;
