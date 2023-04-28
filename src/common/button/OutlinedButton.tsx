import { Button as AntdButton } from "antd";
import React from "react";
import styled from "styled-components";

const OutlinedButton = (props: any) => {
  const { text, ...otherProps } = props;

  return <AntdButton {...otherProps}>{text}</AntdButton>;
};

export default OutlinedButton;
