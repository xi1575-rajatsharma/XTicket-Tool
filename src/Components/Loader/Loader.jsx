import React from "react";

const Loader = (props) => {
  return (
    <>
      <div
        class="LoaderBalls"
        style={props.margintTop ? { marginTop: props.margintTop } : null}
      >
        <div class="LoaderBalls__item"></div>
        <div class="LoaderBalls__item"></div>
        <div class="LoaderBalls__item"></div>
      </div>
    </>
  );
};

export default Loader;
