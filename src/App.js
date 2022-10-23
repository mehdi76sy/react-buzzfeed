import Title from "./components/Title";
import QuestionBlock from "./components/QuestionBlock";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";
import { useState, useEffect } from "react";
import { isContentEditable } from "@testing-library/user-event/dist/utils";


const App = () => {
  const [quiz, setQuiz] = useState(false)
  const [ chosenAnswerItems, setChosenAnswerItems ] = useState([])
  const [ unansweredQuestionIds, setUnansweredQuestionIds ] = useState([])


  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost/3500')
      const json = response.json()
      setQuiz(json)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const unansweredIds = quiz?.content.map(({id}) => id)
    setUnansweredQuestionIds(unansweredIds)
}, [quiz])


  return (
    <div className="app">
      <Title 
      title={quiz?.title} 
      subtitle={quiz?.subtitle}

      />

      {quiz && quiz?.content.map(contentItem => (
        <QuestionsBlock 
          key={contentItem.id}
          quizItem={contentItem} 
          setChosenAnswerItems={setChosenAnswerItems}
          chosenAnswerItems={chosenAnswerItems}
          unansweredQuestionIds={unansweredQuestionIds}
          setUnansweredQuestionIds={setUnansweredQuestionIds}
          />

        ))}
    </div>
  );
}

export default App;
