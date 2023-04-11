import { Button as AntdButton } from "antd";
import React from "react";
import styled from "styled-components";

const OutlinedButton = (props: any) => {
  const { text, ...otherProps } = props;

  return <Button {...otherProps}>{text}</Button>;
};

const Button = styled(AntdButton)`
  border-radius: 8px !important;
`;

export default OutlinedButton;
