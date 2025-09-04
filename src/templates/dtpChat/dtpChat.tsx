import { Box, Container } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React, { useEffect, useRef, useState } from "react";
import cx from "clsx";
import * as classes from "./dtpChat.module.css";
import { MSG_SENDER } from "constants/trainned.constant";
import {
  ChatSyncCommand,
  ChatSyncCommandInput,
  CreateAnonymousWebExperienceUrlCommand,
  CreateAnonymousWebExperienceUrlCommandInput,
  CreateWebExperienceCommand,
  CreateWebExperienceCommandInput,
  QBusinessClient,
} from "@aws-sdk/client-qbusiness";

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

      const applicationId = "b55eaa79-31ed-4fbc-8486-bd32f096bc8d"; // amazonQ application id
      const client = new QBusinessClient({
        region: process.env.GATSBY_AWS_REGION || "us-east-1",
        credentials: {
          accessKeyId: process.env.GATSBY_AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.GATSBY_AWS_SECRET_ACCESS_KEY || "",
        },
      });

      // Create Web Experience
      const webExperienceInput: CreateWebExperienceCommandInput = {
        applicationId,
        title: "My Web Chat Experience",
        subtitle: "Anonymous Chat",
        welcomeMessage: "Welcome! How can I help you?",
        origins: ["*"], // Allow all origins, change as needed
        samplePromptsControlMode: "ENABLED",
      };

      const webExperienceCommand = new CreateWebExperienceCommand(
        webExperienceInput,
      );
      const webExperienceResponse = await client.send(webExperienceCommand);
      const webExperienceId = webExperienceResponse.webExperienceId;

      if (!webExperienceId) {
        throw new Error("Failed to create web experience.");
      }

      // Create Anonymous Web Experience URL
      const anonymousUrlInput: CreateAnonymousWebExperienceUrlCommandInput = {
        applicationId,
        webExperienceId,
        // Optional: sessionLengthInMinutes: 60
      };

      const anonymousUrlCommand = new CreateAnonymousWebExperienceUrlCommand(
        anonymousUrlInput,
      );
      const anonymousUrlResponse = await client.send(anonymousUrlCommand);

      const webExperienceUrl =
        (anonymousUrlResponse as any).webExperienceUrlWithAuth ||
        (anonymousUrlResponse as any).webExperienceUrl ||
        "";

      if (!webExperienceUrl) {
        throw new Error("Failed to create anonymous web experience URL.");
      }

      //Anonymous Chat
      const chatInput: ChatSyncCommandInput = {
        applicationId,
        userMessage: question,
        };

      const chatCommand = new ChatSyncCommand(chatInput);
      const chatResponse = await client.send(chatCommand);

      const answer = chatResponse.systemMessage || "";

      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { sender: MSG_SENDER.AI, text: answer },
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
    <>
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
    </>
  );
};

export default DTPChat;
