import { Button as AntdButton } from "antd";
import React from "react";
import styled from "styled-components";

type ContainedButtonProps = any;

const ContainedButton: React.FC<ContainedButtonProps> = (props: any) => {
  const { text, ...otherProps } = props;

  return (
    <AntdButton type="primary" {...otherProps}>
      {text}
    </AntdButton>
  );
};

export default ContainedButton;
