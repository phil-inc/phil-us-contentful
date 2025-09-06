import React from "react";

import { MSG_SENDER } from "constants/trainned.constant";
import cx from "clsx";

import * as classes from "./chatBubble.module.css";

type chatBubbleProps = {
  index: number;
  sender: string;
  message: string;
};

export const ChatBubble: React.FC<chatBubbleProps> = ({
  index,
  sender,
  message,
}) => {
  let formattedMessage = message.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>",
  );
  formattedMessage = formattedMessage.replace(
    /^\* (.*$)/gm,
    '<ul class="list-disc list-inside"><li>$1</li></ul>',
  );
  formattedMessage = formattedMessage.replace(/^# (.*$)/gm, "<h1>$1</h1>");
  formattedMessage = formattedMessage.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  formattedMessage = formattedMessage.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  formattedMessage = formattedMessage.replace(/`([^`]+)`/g, "<code>$1</code>");
  formattedMessage = formattedMessage.replace(
    /```([\s\S]*?)```/g,
    "<pre><code>$1</code></pre>",
  );
  formattedMessage = formattedMessage.replace(
    /^> (.*$)/gm,
    "<blockquote>$1</blockquote>",
  );

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  formattedMessage = formattedMessage.replace(
    urlRegex,
    '<a href="$1" target="_blank" class="text-blue-300 underline">$1</a>',
  );

  const webRegex = /www\.[^\s]+/g;
    formattedMessage = formattedMessage.replace(
    webRegex,
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
        className={cx(classes.messageBoxssage, {
          [classes.userMessage]: sender === MSG_SENDER.USER,
          [classes.aiMessage]: sender !== MSG_SENDER.USER,
        })}
        dangerouslySetInnerHTML={{ __html: formattedMessage }}
      ></div>
    </div>
  );
};

export default ChatBubble;
