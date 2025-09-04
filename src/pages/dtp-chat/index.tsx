import React, { useEffect, useRef, useState } from "react";
import { Script } from "gatsby";
import { SEO } from "layouts/SEO/SEO";
import { Box, Container } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import cx from "clsx";

import { GEMINI_API_URL } from "constants/api";
import { MSG_SENDER, TRAINNING_DATA } from "constants/trainned.constant";

import * as classes from "./dtp-chat.module.css";

export const Head: React.FC = () => (
  <SEO title={"Phil DTP Chat - Ask the PHIL Team"}>
    <meta
      name="description"
      content={
        "Ask the PHIL Team - Your AI Assistant for Direct to Patient Solutions. Get instant answers about our services, features, and support. Chat now!"
      }
    />
    <Script
      async
      defer
      strategy="idle"
      charSet="utf-8"
      type="text/javascript"
      src="//js.hsforms.net/forms/embed/v2.js"
    ></Script>
  </SEO>
);

type Message = {
  sender: MSG_SENDER;
  text: string;
};

const DptChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: MSG_SENDER.AI,
      text: "Hello! I'm an AI assistant. How can I help you!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const container = chatHistoryRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question) return;

    // Add user message
    const newMessages = [
      ...messages,
      { sender: MSG_SENDER.USER, text: question },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiUrl = GEMINI_API_URL;
      const payload = {
        contents: [{ parts: [{ text: question }] }],
        systemInstruction: {
          parts: [{ text: TRAINNING_DATA }],
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const candidate = result?.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;

      setIsLoading(false);

      let aiResponse;
      if (text && text.trim() === "INSUFFICIENT_INFO") {
        aiResponse =
          "Get in touch with the PHIL team for more information at www.phil.us/demo";
      } else if (text) {
        aiResponse = text;
      } else {
        aiResponse =
          "Sorry, I couldn't generate a response. Please try again later.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: MSG_SENDER.AI, text: aiResponse },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: MSG_SENDER.AI,
          text: "There was an error processing your request. Please try again.",
        },
      ]);
    }
  };

  const LoadingDots = () => (
    <div className="ai-message message-bubble p-4 rounded-2xl self-start mr-auto text-left">
      <span className="inline-block animate-pulse">Thinking</span>
      <span className="animate-bounce inline-block ml-1">.</span>
      <span className="animate-bounce inline-block ml-1 delay-100">.</span>
      <span className="animate-bounce inline-block ml-1 delay-200">.</span>
    </div>
  );

  return (
    <Container className={classes.dptChat}>
      <section className={classes.section}>
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col">
          <Box className={classes.top}>
            <h1 className={classes.title}>Ask the PHIL Team</h1>
            <h3 className={classes.subTitle}>
              I am an AI assistant trained on PHIL's Direct To Patient. Ask me
              anything!
            </h3>
          </Box>

          <div className={classes.chatHistory} ref={chatHistoryRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cx(classes.messageBubble, {
                  [classes.userMessage]: message.sender === MSG_SENDER.USER,
                  [classes.aiMessage]: message.sender !== MSG_SENDER.USER,
                })}
              >
                {message.text}
              </div>
            ))}
            {isLoading && <LoadingDots />}
          </div>

          <div className={classes.inputArea}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me a question..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={classes.sendBtn}
              >
                <IconArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default DptChat;
