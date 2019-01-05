import React from "react";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`;
const SpinnerContent = styled.div`
  & {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: darkorange;
    background: -moz-linear-gradient(
      left,
      darkorange 10%,
      rgba(255, 128, 0, 0) 42%
    );
    background: -webkit-linear-gradient(
      left,
      darkorange 10%,
      rgba(255, 128, 0, 0) 42%
    );
    background: -o-linear-gradient(
      left,
      darkorange 10%,
      rgba(255, 128, 0, 0) 42%
    );
    background: -ms-linear-gradient(
      left,
      darkorange 10%,
      rgba(255, 128, 0, 0) 42%
    );
    background: linear-gradient(
      to right,
      darkorange 10%,
      rgba(255, 128, 0, 0) 42%
    );
    position: relative;
    -webkit-animation: load3 0.8s infinite linear;
    animation: load3 0.8s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  &:before {
    width: 50%;
    height: 50%;
    background: darkorange;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  &:after {
    background: #7a7a7a;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => (
  <SpinnerWrapper>
    <SpinnerContent />
  </SpinnerWrapper>
);

export default Spinner;
