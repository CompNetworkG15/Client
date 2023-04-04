import React from "react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const Home = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:2000");
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    const messageListener = (message: string) => {
      setMessages((messages) => [...messages, message]);
    };
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [socket]);

  const send = (value: string) => {
    socket?.emit("message", value);
  };
  return <></>;
};

export default Home;
