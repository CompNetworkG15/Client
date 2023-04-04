import React from "react";
import { Row, Col, Form } from "antd";
import styled from "styled-components";
import theme from "@/utils/theme";
import { NamePath } from "antd/es/form/interface";
import { Rule } from "antd/es/form";

const TextBox = styled.div<{ width: number | string; fontSize: number }>`
  font-weight: bold;
  font-size: 0.9rem;
  word-wrap: break-word;
  width: ${(props) => props.width};
  margin-right: 10px;
  ${theme.media.mobile} {
    font-size: 0.8rem;
  }

  ${theme.media.tablet} {
    font-size: 0.8rem;
  }
`;

type FormInputProps = {
  title: string;
  name: string;
  isRequired?: boolean;
  textWidth?: number | string;
  inputWidth?: number;
  isSubForm?: boolean;
  fontSize?: number;
  children: JSX.Element;
  rules?: Rule[];
  dependencies?: NamePath[];
};

const FormInput: React.FC<FormInputProps> = ({
  title,
  name,
  isRequired = false,
  textWidth = "100%",
  inputWidth = "100%",
  isSubForm = true,
  fontSize = 14,
  children,
  rules = [{ required: false }],
  dependencies = [],
}) => {
  const marginBottom: number = isSubForm ? 24 : 0;

  return (
    <div style={{ width: "100%" }}>
      <Row>
        <Col style={{ width: "35%" }}>
          <TextBox width={textWidth} fontSize={fontSize}>
            {title}{" "}
            {isRequired ? (
              <span style={{ color: theme.color.red }}>*</span>
            ) : (
              ""
            )}
          </TextBox>
        </Col>

        <Col style={{ width: "65%" }}>
          <Form.Item
            style={{
              minWidth: 50,
              maxWidth: 400,
              width: inputWidth,
              marginBottom: marginBottom,
            }}
            name={name}
            rules={rules}
            dependencies={dependencies}
          >
            {children}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default FormInput;