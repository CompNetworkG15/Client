import { Message } from "@/types";
import React from "react";
import styled from "styled-components";

type MessageBoxProps = {
  key: any;
  message: Message;
};

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  return (
    <Box>
      <div>Image</div>
      <div>Text</div>
      <div>Time</div>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  gap: 10px;
  color: black;
`;

export default MessageBox;
