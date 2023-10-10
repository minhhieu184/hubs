import React, { useEffect, useState } from "react";
import { Modal } from "../modal/Modal";
import styles from "./QuestionModal.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { socket } from "../socket";
import { QuizzList } from "./QuizzList";
import { QuizzForm } from "./QuizzForm";

// 5 english questions
const _questions = [
  {
    id: 1,
    question: "What is your name?",
    options: ["My name is John", "My name is Peter", "My name is Mary", "My name is Jane"],
    answers: {}
  },
  {
    id: 2,
    question: "What is your age?",
    options: ["I am 18 years old", "I am 20 years old", "I am 22 years old", "I am 24 years old"],
    answers: {}
  },
  {
    id: 3,
    question: "What is your job?",
    options: ["I am a student", "I am a teacher", "I am a doctor", "I am a lawyer"],
    answers: {}
  },
  {
    id: 4,
    question: "Where do you live?",
    options: ["I live in New York", "I live in London", "I live in Paris", "I live in Tokyo"],
    answers: {}
  },
  {
    id: 5,
    question: "What is your hobby?",
    options: [
      "I like to play football",
      "I like to play basketball",
      "I like to play tennis",
      "I like to play baseball"
    ],
    answers: {}
  }
];

export const QuestionModal = ({ store, hubChannel, visible, toggle }) => {
  console.log("QuestionModal ~ visible:", visible);
  const isCreator = hubChannel.canOrWillIfCreator("update_hub");

  const memberId = store.state.credentials.email || store.state.profile.displayName;
  const roomId = hubChannel.hubId;

  const [assignQuestion, setAssignQuestion] = useState(null);
  const [questions, setQuestions] = useState(_questions);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("joinRoom", roomId, data => {
        console.log("socket.emit ~ data:", data);
      });
    });

    function onStartQuestion(payload) {
      console.log("socket.on ~ payload:", payload);
      setAssignQuestion(payload);
      if (!visible) toggle();
    }
    socket.on("startQuestion", onStartQuestion);

    function onStopQuestion(payload) {
      console.log("socket.on ~ payload:", payload);
      setAssignQuestion(null);
      if (visible) toggle();
    }
    socket.on("stopQuestion", onStopQuestion);

    function onAnswerQuestion(payload) {
      console.log("socket.on ~ payload:", payload);
      setQuestions(prev => {
        const index = prev.findIndex(question => question.id === payload.id);
        const newQuestions = [...prev];
        newQuestions[index] = {
          ...newQuestions[index],
          answers: {
            ...newQuestions[index].answers,
            ...payload.answers
          }
        };
        console.log("onAnswerQuestion ~ newQuestions:", newQuestions);
        return newQuestions;
      });
    }
    if (isCreator) {
      socket.on("answerQuestion", onAnswerQuestion);
    }
    socket.connect();
    return () => {
      console.log("socket.off ~ onStartQuestion:");
      socket.off("connect");
      socket.off("startQuestion", onStartQuestion);
      socket.off("stopQuestion", onStopQuestion);
      isCreator && socket.off("answerQuestion", onAnswerQuestion);
    };
  }, [roomId, isCreator, toggle, visible]);

  useEffect(() => {
    function onStartingQuestion() {
      const assignQuestionId = localStorage.getItem("assignQuestionId")
        ? JSON.parse(localStorage.getItem("assignQuestionId"))
        : null;
      if (!assignQuestionId) return;
      const question = questions.find(question => question.id === assignQuestionId);
      socket.emit("startQuestion", { ...question, roomId });
    }
    if (isCreator) {
      socket.on("startingQuestion", onStartingQuestion);
    }
    return () => {
      if (isCreator) {
        socket.off("startingQuestion", onStartingQuestion);
      }
    };
  }, [isCreator, questions, roomId]);

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <Modal className={classNames(styles.questionModal, visible || styles.hide)}>
      {isCreator ? (
        <QuizzList roomId={roomId} questions={questions} onClose={toggle} />
      ) : (
        <QuizzForm assignQuestion={assignQuestion} memberId={memberId} roomId={roomId} qu />
      )}
    </Modal>
  );
};

QuestionModal.propTypes = {
  hubChannel: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  toggle: PropTypes.func
};
