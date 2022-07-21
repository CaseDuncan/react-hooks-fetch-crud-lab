import React, {useState, useEffect} from "react";
import QuestionItem from './QuestionItem'

function QuestionList() {

  const[questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((questions)=> setQuestions(questions))
  }, [])

  const quizes = questions.map((question)=>{
    return <QuestionItem
    
    key={question.id}
    prompt={question.prompt}
    answers={question.answers}
    onHandleDelete={handleDelete}
    onPatch={handlePatch}
    />
  })

  //handle update
  function handlePatch(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({correctIndex})
    })
    .then((response)=> response.json())
    .then((patchedQuestion)=>{
      const modifiedQuestions = questions.map((question)=>{
        if(question.id === patchedQuestion.id) return patchedQuestion
        return question
      })
      setQuestions(modifiedQuestions);
    }
    )
  }

  // handle Delete
  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then((response)=>response.json())
    .then(()=>{
      const modifiedQuestions = questions.filter((question)=>question.id === id)
      setQuestions(modifiedQuestions)
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      
     {quizes}

      </ul>
    </section>
  );
}

export default QuestionList;
 