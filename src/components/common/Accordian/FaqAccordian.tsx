import React from "react";
import { Accordion } from "@mantine/core";

const faqQuestions = [
  {
    heading: "General",
    questions: [
      {
        question: "What is the purpose of this site?",
        answer:
          "The purpose of this site is to provide information about the company and its products.",
      },
      {
        question: "How do I contact the company?",
        answer: "You can contact the company by phone or email.",
      },
    ],
  },
  {
    heading: "Common",
    questions: [
      {
        question: "What is the purpose of this site?",
        answer:
          "The purpose of this site is to provide information about the company and its products.",
      },
      {
        question: "How do I contact the company?",
        answer: "You can contact the company by phone or email.",
      },
    ],
  },
  {
    heading: "Not so common",
    questions: [
      {
        question: "What is the purpose of this site?",
        answer:
          "The purpose of this site is to provide information about the company and its products.",
      },
      {
        question: "How do I contact the company?",
        answer: "You can contact the company by phone or email.",
      },
    ],
  },
];

const items = faqQuestions.map((faq, index) => {
  return (
    <Accordion.Item key={index} value={faq.heading}>
      <Accordion.Control>{faq.heading}</Accordion.Control>
      <Accordion.Panel>
        {faq.questions.map((question, index) => {
          return (
            <Accordion>
              <Accordion.Item key={index} value={question.question}>
                <Accordion.Control>{question.question}</Accordion.Control>
                <Accordion.Panel>{question.answer}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </Accordion.Panel>
    </Accordion.Item>
  );
});
export const FaqAccordian = () => {
  return <Accordion>{items}</Accordion>;
};
