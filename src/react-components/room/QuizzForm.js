import React from "react";
import styles from "./QuizzForm.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button, QuestionImage, QuizzLayout, QuizzRadioInput } from "../ui-components";
import { Typography } from "../ui-components";
import { FormattedMessage } from "react-intl";
import { ResultInfo } from "./ResultInfo";
import { useForm } from "react-hook-form";

export const QuizzForm = ({ assignQuestion, roomId, memberId }) => {
  const { register, watch, handleSubmit } = useForm();
  const currentAnswer = watch("answer");
  console.log("QuizzForm ~ currentAnswer:", currentAnswer);

  const onSubmit = data => {
    console.log("onSubmit ~ data:", data);
    // console.log("AnswerQuestion ~ memberId:", memberId);
    // socket.emit("answerQuestion", { ...assignQuestion, answers: { [memberId]: data.answer }, roomId });
    // setCurrentAnswer(data.answer);
  };

  if (!assignQuestion) return null;

  const question = (
    <Typography size={24} weight="semiBold">
      <FormattedMessage id="resultList.question" defaultMessage="What is your name?" />
    </Typography>
  );

  return (
    <QuizzLayout centerHeader={<QuestionImage />}>
      <ResultInfo index={1} total={10} question={question} className={styles.resultInfo} />
      <form className={styles.quizzForm}>
        {assignQuestion.options.map((option, index) => (
          <QuizzRadioInput
            key={option}
            ref={register}
            active={currentAnswer == index}
            index={index}
            id={index}
            name="answer"
            label={option}
            value={index}
          />
        ))}
        <Button content="Submit" type="safe" state="default" />
      </form>
    </QuizzLayout>
  );
};

QuizzForm.propTypes = {
  roomId: PropTypes.string,
  memberId: PropTypes.string,
  assignQuestion: PropTypes.object
};
