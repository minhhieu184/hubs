import React from "react";
import { Modal } from "../modal/Modal";
import styles from "./QuestionModal.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CloseButton } from "../input/CloseButton";
import { List, ListItem } from "../layout/List";
import { Button } from "../input/Button";

// 5 english questions
const questions = [
  {
    question: "What is your name?",
    options: ["My name is John", "My name is Peter", "My name is Mary", "My name is Jane"]
  },
  {
    question: "What is your age?",
    options: ["I am 18 years old", "I am 20 years old", "I am 22 years old", "I am 24 years old"]
  },
  {
    question: "What is your job?",
    options: ["I am a student", "I am a teacher", "I am a doctor", "I am a lawyer"]
  },
  {
    question: "Where do you live?",
    options: ["I live in New York", "I live in London", "I live in Paris", "I live in Tokyo"]
  },
  {
    question: "What is your hobby?",
    options: [
      "I like to play football",
      "I like to play basketball",
      "I like to play tennis",
      "I like to play baseball"
    ]
  }
];

const QuestionItem = ({ question, options }) => {
  return (
    <ListItem key={question}>
      <div className={classNames(styles.questionItem)}>
        <p>{question}</p>
        <div>
          <Button>1Start</Button>
          <Button>1Stop</Button>
          <Button>1Result</Button>
        </div>
      </div>
    </ListItem>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array
};

const QuestionList = () => {
  return (
    <List>
      {questions.map(({ question, options }) => (
        <QuestionItem key={question} question={question} options={options} />
      ))}
    </List>
  );
};

export const QuestionModal = ({ visible, onClose }) => {
  return (
    <Modal
      titleNode={"Question"}
      beforeTitle={<CloseButton onClick={onClose} />}
      className={classNames(styles.questionModal, visible || styles.hide)}
    >
      <QuestionList />
    </Modal>
  );
};

QuestionModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};
