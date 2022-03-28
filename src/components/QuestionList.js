import React from "react";

function QuestionList({questions, onDeleteQ, onUpdateQ}) {
  const theQs = questions.map((question) => (
    <li key={`${question.id}${Math.random()}`}>
      {question.prompt}
      <label>
        Correct Answer
        <select onChange={(e) => handleCorrectChange(e, question.id)} value={question.correctIndex}>
          {question.answers.map((answer, index) => (
            <option key={`${question.id}${answer}`} value={index}>{answer}</option>
          ))}
        </select>
      </label>
      <button onClick={() => handleDelete(question)}>Delete Question</button>
    </li>
  ));

  function handleDelete(question) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE'
    })
      .then(() => onDeleteQ(question));
  }

  function handleCorrectChange(e, ID) {
    fetch(`http://localhost:4000/questions/${ID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'correctIndex': e.target.value
      })
    })
      .then((r) => r.json())
      .then((updatedQ) => {
        onUpdateQ(updatedQ);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{theQs}</ul>
    </section>
  );
}

export default QuestionList;
