"use client";
import { useEffect, useState } from "react";
import PromptForm from "@/components/PromptForm";
import MainWrapper from "@/components/MainWrapper";
import styles from "./page.module.css";

export default function Home({ repo }) {
  const [choices, setChoices] = useState([]);
  const [messages, setMessages] = useState([]);

  const onSubmitForm = async (prompt) => {
    const res = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const result = await res.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: prompt },
      { role: "assistant", content: result.choices[0].message.content },
    ]);

    setChoices(result.choices);
  };

  useEffect(() => {
    if (!messages.length) {
      return;
    }
    localStorage.setItem("chat-gpt", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("chat-gpt"));

    if (!!a.length) {
      setMessages([...a]);
    }
  }, []);

  return (
    <MainWrapper className={styles.main}>
      <PromptForm onSubmitForm={onSubmitForm} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <div
              style={{
                padding: 10,
                textAlign: "right",
                borderBottom: "1px solid grey",
              }}
              key={index}
            >
              {msg.content}
            </div>
          ) : (
            <div
              style={{
                borderBottom: "1px solid grey",
                padding: 10,
              }}
              key={index}
            >
              {msg.content}
            </div>
          )
        )}
      </div>
    </MainWrapper>
  );
}
