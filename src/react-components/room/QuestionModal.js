import React, { useState } from "react";
import { Modal } from "../modal/Modal";
import styles from "./QuestionModal.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CloseButton } from "../input/CloseButton";
import { List, ListItem } from "../layout/List";
import { Button } from "../input/Button";
import { useForm } from "react-hook-form";

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

const optionNames = ["A.", "B.", "C.", "D."];

const QuestionItem = ({ question, options, selected, onClick }) => {
  return (
    <ListItem key={question} onClick={onClick} className={classNames(styles.questionItem)}>
      <p>{question}</p>
      <div>
        <Button>1Start</Button>
        <Button>1Stop</Button>
        <Button>1Result</Button>
      </div>
      {selected && (
        <List className={classNames(styles.questionList)}>
          {options.map((option, index) => (
            <ListItem key={option}>
              <span style={{ marginRight: "12px" }}>{optionNames[index]}</span>
              <span>{option}</span>
            </ListItem>
          ))}
        </List>
      )}
    </ListItem>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.bool,
  onClick: PropTypes.func
};

const QuestionList = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(-1);

  return (
    <List className={classNames(styles.questionList)}>
      {questions.map(({ question, options }, index) => (
        <QuestionItem
          key={question}
          onClick={() => setSelectedQuestion(prev => (prev === index ? -1 : index))}
          question={question}
          options={options}
          selected={selectedQuestion === index}
        />
      ))}
    </List>
  );
};

const AnswerQuestion = ({ assignQuestion }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <div className={classNames(styles.answerQuestion)}>
      <p>{"Question: " + assignQuestion.question}</p>
      <form>
        {assignQuestion.options.map((option, index) => (
          <div key={option} className={classNames(styles.answerOption)}>
            <input ref={register} name="answer" id={index} type="radio" value={index} />
            <label htmlFor={index}>{option}</label>
          </div>
        ))}
        <Button onClick={handleSubmit(onSubmit)}>1Submit</Button>
      </form>
    </div>
  );
};

AnswerQuestion.propTypes = {
  assignQuestion: PropTypes.object
};

export const QuestionModal = ({ hubChannel, visible, onClose }) => {
  const isCreator = hubChannel.canOrWillIfCreator("update_hub");

  const assignQuestion = {
    question: "What is your name?",
    options: ["My name is John", "My name is Peter", "My name is Mary", "My name is Jane"]
  };
  return (
    <Modal
      titleNode={"Question"}
      beforeTitle={<CloseButton onClick={onClose} />}
      className={classNames(styles.questionModal, visible || styles.hide)}
    >
      {isCreator ? <QuestionList /> : <AnswerQuestion assignQuestion={assignQuestion} />}
    </Modal>
  );
};

QuestionModal.propTypes = {
  hubChannel: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func
};
