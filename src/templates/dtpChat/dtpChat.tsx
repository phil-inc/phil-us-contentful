import { Box, Container } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React, { JSX, useEffect, useRef, useState } from "react";
import cx from "clsx";

import { MSG_SENDER } from "constants/trainned.constant";
import { CALL_GEMINI_API_URL } from "constants/api";

import * as classes from "./dtpChat.module.css";

type Props = {
  pageContext: {
    title: string;
    id: string;
  };
};

type Message = {
  sender: MSG_SENDER;
  text: string;
};

const DTPChat: React.FC<Props> = ({ pageContext }) => {
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
      const response = await fetch(CALL_GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
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
          "Get in touch with the PHIL team for more information at https://www.phil.us/demo";
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

  const ChatBubble = ({
    index,
    sender,
    message,
  }: {
    index: number;
    sender: string;
    message: string;
  }): JSX.Element => {
    let formattedMessage = message.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>",
    );
    formattedMessage = formattedMessage.replace(
      /^\* (.*$)/gm,
      '<ul class="list-disc list-inside"><li>$1</li></ul>',
    );
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    formattedMessage = formattedMessage.replace(
      urlRegex,
      '<a href="$1" target="_blank" class="text-blue-300 underline">$1</a>',
    );

    return (
      <div
        key={index}
        className={cx(classes.messageBubble, {
          [classes.userMessageBubble]: sender === MSG_SENDER.USER,
          [classes.aiMessage.bubble]: sender !== MSG_SENDER.USER,
        })}
      >
        <div
          className={cx(classes.memessageBoxssage, {
            [classes.userMessage]: sender === MSG_SENDER.USER,
            [classes.aiMessage]: sender !== MSG_SENDER.USER,
          })}
          dangerouslySetInnerHTML={{ __html: formattedMessage }}
        ></div>
      </div>
    );
  };

  return (
    <>
      <Container className={classes.dptChat}>
        <section className={classes.section}>
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <Box className={classes.top}>
              <div>
                <h1 className={classes.title}>
                  Ask About Direct-to-Patient Strategy
                </h1>
                <h3 className={classes.subTitle}>
                  This AI will answer questions based on PHIL's thought
                  leadership.
                </h3>
              </div>
              <a
                href="https://www.phil.us/demo"
                target="_blank"
                className="text-xl font-bold text-teal-600"
              >
                PHIL
              </a>
            </Box>

            <div className={classes.chatHistory} ref={chatHistoryRef}>
              {messages.map((message, index) => (
                <ChatBubble
                  index={index}
                  sender={message.sender}
                  message={message.text}
                />
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
    </>
  );
};

export default DTPChat;
