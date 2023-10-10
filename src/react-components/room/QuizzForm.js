import React, { useEffect } from "react";
import styles from "./QuizzForm.scss";
import PropTypes from "prop-types";
import { Button, QuestionImage, QuizzLayout, QuizzRadioInput } from "../ui-components";
import { Typography } from "../ui-components";
import { FormattedMessage } from "react-intl";
import { ResultInfo } from "./ResultInfo";
import { useForm } from "react-hook-form";
import { socket } from "../socket";

const NoQuestion = () => {
  return (
    <div className={styles.noQuestion}>
      <div></div>
    </div>
  );
};

export const QuizzForm = ({ assignQuestion, roomId, memberId }) => {
  console.log("QuizzForm ~ assignQuestion:", assignQuestion);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { answer: null }
  });
  const currentAnswer = watch("answer");

  const onSubmit = data => {
    console.log("onSubmit ~ data:", data);
    console.log("AnswerQuestion ~ memberId:", memberId);
    // socket.emit("answerQuestion", { ...assignQuestion, answer: data.answer, memberId, roomId });
    socket.emit("answerQuestion", { ...assignQuestion, answers: { [memberId]: data.answer }, roomId });
  };

  useEffect(() => {
    setValue("answer", assignQuestion?.answers[memberId] || null);
  }, [assignQuestion, setValue, memberId]);

  const question = (
    <Typography size={24} weight="semiBold">
      {assignQuestion?.question}
    </Typography>
  );
  const errorMessages = (
    <Typography size={14} className={styles.errorMessage}>
      <FormattedMessage id="errorMsg" defaultMessage="Please select an answer" />
    </Typography>
  );

  return (
    <QuizzLayout centerHeader={<QuestionImage />}>
      {assignQuestion ? (
        <>
          <ResultInfo index={1} total={10} question={question} className={styles.resultInfo} />
          {errors.answer && errorMessages}
          <form className={styles.quizzForm}>
            {assignQuestion.options.map((option, index) => (
              <QuizzRadioInput
                key={option}
                ref={register({ required: true })}
                active={currentAnswer == index}
                index={index}
                id={index + ""}
                name="answer"
                label={option}
                value={index}
              />
            ))}
            <Button onClick={handleSubmit(onSubmit)} content="Submit" variant="safe" type="submit" />
          </form>
        </>
      ) : (
        <NoQuestion />
      )}
    </QuizzLayout>
  );
};

QuizzForm.propTypes = {
  roomId: PropTypes.string,
  memberId: PropTypes.string,
  assignQuestion: PropTypes.object
};
