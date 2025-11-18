import React, { useEffect, useRef, useState } from "react";
import { Box, Image, Loader } from "@mantine/core";

import { MSG_SENDER } from "constants/trainned.constant";
import { CALL_GEMINI_API_URL } from "constants/api";
import { INITIAL_PROMPT_QUESTION } from "constants/global.constant";

import ChatBubble from "templates/dtpChat/chatBubble/chatBubble";

import * as classes from "./dtpChat.module.css";

import { SEO } from "layouts/SEO/SEO";
import SuggestionBox from "templates/dtpChat/suggestionBox/suggestionBox";

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

export type suggestionItem = {
  title: string;
  func: () => void;
};

export const Head: React.FC = () => (
  <SEO title={"PHIL AI"}>
    <meta name="description" content={"PHIL chat bot."} />
    <meta name="robots" content="noindex,nofollow" />
  </SEO>
);

const DTPChat: React.FC<Props> = ({ pageContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: MSG_SENDER.AI,
      text: "Hello! Ask me anything about Direct-to-Patient strategies.",
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canShowSuggestionBox, setCanShowSuggestionBox] =
    useState<boolean>(true);
  const chatHistoryRef = useRef<HTMLDivElement | null>(null);
  const initialSuggestions: suggestionItem[] = [
    {
      title: INITIAL_PROMPT_QUESTION.PROMPT1,
      func: () => handleSendMessage(INITIAL_PROMPT_QUESTION.PROMPT1),
    },
    {
      title: INITIAL_PROMPT_QUESTION.PROMPT2,
      func: () => handleSendMessage(INITIAL_PROMPT_QUESTION.PROMPT2),
    },
    {
      title: INITIAL_PROMPT_QUESTION.PROMPT3,
      func: () => handleSendMessage(INITIAL_PROMPT_QUESTION.PROMPT3),
    },
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const container = chatHistoryRef.current;
    if (container && messages.length > 1) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (question: string) => {
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
      setCanShowSuggestionBox(false);

      let aiResponse;
      if (text && text.trim() === "INSUFFICIENT_INFO") {
        aiResponse =
          "Get in touch with the PHIL team for more information at https://www.phil.us/demo";
      } else if (text) {
        aiResponse = text;
      } else {
        aiResponse = "Sorry, I encountered an error. Please try again.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: MSG_SENDER.AI, text: aiResponse },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setIsLoading(false);
      setCanShowSuggestionBox(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: MSG_SENDER.AI,
          text: "There was an error processing your request. Please try again.",
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question) return;
    handleSendMessage(question);
  };

  return (
    <>
      <section id={pageContext.id} className={classes.dptChatSection}>
        <div className={classes.chatContainer}>
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
            <div className={classes.logoContainer}>
              <a href="https://www.phil.us/demo" target="_blank">
                <Image
                  className={classes.logo}
                  src="https://images.ctfassets.net/2h91ja0efsni/2fqDgv1rXvEaIvGmf57rFc/d37f4c6b6a1165743aea1cd10ca56e62/PhilLogoGreen.svg"
                  alt="PHIL Logo"
                />
              </a>
            </div>
          </Box>

          <div className={classes.chatHistory} ref={chatHistoryRef}>
            {messages.map((message, index) => (
              <ChatBubble
                index={index}
                sender={message.sender}
                message={message.text}
              />
            ))}
            {messages.length <= 1 && canShowSuggestionBox && (
              <SuggestionBox suggestions={initialSuggestions} />
            )}
          </div>

          <div className={classes.bottomInputArea}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={classes.sendBtn}
              >
                {isLoading ? (
                  <Loader size="sm" color="white" />
                ) : (
                  <span>Send</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default DTPChat;
