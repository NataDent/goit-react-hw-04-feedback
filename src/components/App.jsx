import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const options = ['good', 'neutral', 'bad'];

  const onLeaveFeedback = e => {
    setFeedback(prevState => [...prevState, ...feedback]);
  };
  const countTotalFeedback = () =>
    Object.values(feedback).reduce((acc, el) => acc + el, 0);

  const countPositivePercentage = Math.round(
    (feedback.good / countTotalFeedback()) * 100
  );

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback > 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback}
            positivePercentage={countPositivePercentage}
          />
        ) : (
          <Notification text="There is no feedback" />
        )}
      </Section>
    </>
  );
};
