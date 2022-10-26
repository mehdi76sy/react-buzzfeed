import Title from "./components/Title";
import QuestionBlock from "./components/QuestionBlock";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";
import { useState, useEffect } from "react";
import { isContentEditable } from "@testing-library/user-event/dist/utils";


const App = () => {
  const [quiz, setQuiz] = useState(null)
  const [ chosenAnswerItems, setChosenAnswerItems ] = useState([])
  const [ unansweredQuestionIds, setUnansweredQuestionIds ] = useState(null)
  const[showAnswer, setShowAnswer] = useState(false)

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



useEffect(() => {
  if (unansweredQuestionIds) {
    if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {

      setShowAnswer(true)
      const answerBlock = document.getElementById('answer-block')
      answerBlock?.scrollIntoView({ behavior: "smooth" })
    }
    
    const highestId = Math.min(...unansweredQuestionIds)
    const highestElement = document.getElementById(highestId)
    highestElement?.scrollIntoView({ behavior: "smooth" })

  }
}, [unansweredQuestionIds, showAnswer, chosenAnswerItems])




  return (
    <div className="app">
      <Title 
      title={quiz?.title} 
      subtitle={quiz?.subtitle}

      />

      {quiz?.content?.map(contentItem => (
        <QuestionsBlock 
          key={contentItem.id}
          quizItem={contentItem} 
          setChosenAnswerItems={setChosenAnswerItems}
          chosenAnswerItems={chosenAnswerItems}
          unansweredQuestionIds={unansweredQuestionIds}
          setUnansweredQuestionIds={setUnansweredQuestionIds}
          />

        ))}
        {showAnswer && (
          <AnswerBlock
            answerOptions={quiz?.anwers}
            chosenAnswers={chosenAnswerItems}
          />
        )}
    </div>
  );
}

export default App;
