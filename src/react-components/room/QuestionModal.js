import React, { useEffect, useState } from "react";
import { Modal } from "../modal/Modal";
import styles from "./QuestionModal.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CloseButton } from "../input/CloseButton";
import { List, ListItem } from "../layout/List";
import { Button } from "../input/Button";
import { useForm } from "react-hook-form";
import { socket } from "../socket";
import { FormattedMessage } from "react-intl";
import { BackButton } from "../input/BackButton";
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

const optionNames = ["A.", "B.", "C.", "D."];

const QuestionItem = ({
  question: { question, options, id },
  label,
  selected,
  onClick,
  startQuestion,
  stopQuestion,
  showResult
}) => {
  const stopPropagation = (e, cb) => {
    e.stopPropagation();
    cb();
  };
  return (
    <>
      <ListItem key={id} onClick={onClick} className={classNames(styles.questionItem)}>
        <p>
          <span>{label + ". "}</span>
          {question}
        </p>
        <div>
          <Button onClick={e => stopPropagation(e, startQuestion)}>
            <FormattedMessage id="1Start" defaultMessage="Start" />
          </Button>
          <Button onClick={e => stopPropagation(e, stopQuestion)}>
            <FormattedMessage id="1Stop" defaultMessage="Stop" />
          </Button>
          <Button onClick={e => stopPropagation(e, showResult)}>
            <FormattedMessage id="1Result" defaultMessage="Result" />
          </Button>
        </div>
      </ListItem>
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
    </>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.object,
  label: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  startQuestion: PropTypes.func,
  stopQuestion: PropTypes.func,
  showResult: PropTypes.func
};

const QuestionList = ({ roomId, questions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(-1);
  const [selectedResult, setSelectedResult] = useState(-1);

  if (selectedResult !== -1)
    return (
      <div style={{ padding: "16px 24px" }}>
        <BackButton onClick={() => setSelectedResult(-1)} style={{ marginBottom: "16px" }} />
        {Object.entries(questions[selectedResult].answers).map(([key, value]) => (
          <div key={key} className={classNames(styles.questionResult)}>
            <p>{key}</p>
            <span>{optionNames[value].slice(0, -1)}</span>
          </div>
        ))}
      </div>
    );

  return (
    <List className={classNames(styles.questionList)}>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          label={index + 1}
          onClick={() => setSelectedQuestion(prev => (prev === index ? -1 : index))}
          startQuestion={() => {
            socket.emit("startQuestion", { ...question, roomId });
            localStorage.setItem("assignQuestionId", JSON.stringify(question.id));
          }}
          stopQuestion={() => {
            socket.emit("stopQuestion", { ...question, roomId });
            localStorage.removeItem("assignQuestionId");
          }}
          showResult={() => setSelectedResult(index)}
          question={question}
          selected={selectedQuestion === index}
        />
      ))}
    </List>
  );
};

QuestionList.propTypes = {
  roomId: PropTypes.string,
  questions: PropTypes.array
};

const AnswerQuestion = ({ assignQuestion, memberId, roomId }) => {
  console.log("AnswerQuestion ~ assignQuestion:", assignQuestion);
  const [currentAnswer, setCurrentAnswer] = useState(assignQuestion?.answers[memberId]);

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log("onSubmit ~ data:", data);
    console.log("AnswerQuestion ~ memberId:", memberId);
    socket.emit("answerQuestion", { ...assignQuestion, answers: { [memberId]: data.answer }, roomId });
    setCurrentAnswer(data.answer);
  };

  useEffect(() => {
    setCurrentAnswer(assignQuestion?.answers[memberId]);
  }, [assignQuestion, memberId]);

  if (!assignQuestion) return null;

  const currentAnswerText = currentAnswer ? (
    <p style={{ marginTop: "16px" }}>{"Your answer: " + optionNames[currentAnswer].slice(0, -1)}</p>
  ) : null;

  return (
    <div className={classNames(styles.answerQuestion)}>
      <p>{"Question: " + assignQuestion.question}</p>
      <form>
        {assignQuestion.options.map((option, index) => (
          <div key={option} className={classNames(styles.answerOption)}>
            <input ref={register} name="answer" id={index} type="radio" value={index} />
            <span style={{ margin: "0 4px 0 12px" }}>{optionNames[index]}</span>
            <label htmlFor={index}>{option}</label>
          </div>
        ))}
        <Button onClick={handleSubmit(onSubmit)} preset="accept">
          <FormattedMessage id="1Submit" defaultMessage="Submit" />
        </Button>
      </form>
      {currentAnswerText}
    </div>
  );
};

AnswerQuestion.propTypes = {
  assignQuestion: PropTypes.object,
  memberId: PropTypes.string,
  roomId: PropTypes.string
};

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
        newQuestions[index].answers = { ...newQuestions[index].answers, ...payload.answers };
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
    <Modal
      // titleNode={"Question"}
      // beforeTitle={<CloseButton onClick={toggle} />}
      className={classNames(styles.questionModal, visible || styles.hide)}
    >
      {isCreator ? (
        // <QuestionList roomId={roomId} questions={questions} />
        <QuizzList roomId={roomId} questions={questions} onClose={toggle} />
      ) : (
        // <AnswerQuestion assignQuestion={assignQuestion} memberId={memberId} roomId={roomId} />
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
