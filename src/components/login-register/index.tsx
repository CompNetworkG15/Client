import { ContainedButton } from "@/common/button";
import useProfileStore from "@/hooks/useProfileStore";
import theme from "@/utils/theme";
import { Input, Typography, message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

type LoginRegisterContentProps = {
  sendFlag: () => void;
  setLogin: (isLogin: boolean) => void;
};

const { Title, Text } = Typography;

const LoginRegisterContent: React.FC<LoginRegisterContentProps> = ({
  sendFlag,
  setLogin,
}) => {
  const { login, signup } = useProfileStore();
  const [isRegister, setRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [nickname, setNickname] = useState<string>();

  const onRegister = async () => {
    try {
      if (email && email !== "" && nickname && nickname !== "") {
        await signup(email, nickname);
        sendFlag();
        setLogin(false);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const onLogin = async () => {
    try {
      if (email && email !== "") {
        await login(email);
        sendFlag();
        setLogin(false);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return isRegister ? (
    <LoginContainer>
      <div>
        <Title>Register</Title>
      </div>
      <InputRow>
        <Title level={5}>Email</Title>
        <Input value={email} onChange={(e: any) => setEmail(e.target.value)} />
      </InputRow>
      <InputRow>
        <Title level={5}>Nickname</Title>
        <Input
          value={nickname}
          onChange={(e: any) => setNickname(e.target.value)}
        />
      </InputRow>
      <div>
        <Text>Already had an account? </Text>
        <LinkText onClick={() => setRegister(false)}>Log In</LinkText>
      </div>
      <ContainedButton text="Sign Up" onClick={onRegister} />
    </LoginContainer>
  ) : (
    <LoginContainer>
      <div>
        <Title>Login</Title>
      </div>
      <InputRow>
        <Title level={5}>Email</Title>
        <Input value={email} onChange={(e: any) => setEmail(e.target.value)} />
      </InputRow>
      <div>
        <Text>Have no account? </Text>
        <LinkText onClick={() => setRegister(true)}>Sign up</LinkText>
      </div>
      <ContainedButton text="Log In" onClick={onLogin} />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

const LinkText = styled(Text)`
  &:hover {
    cursor: pointer;
    color: ${theme.color.primary};
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  .ant-typography {
    margin: 0;
  }
`;

export default LoginRegisterContent;
