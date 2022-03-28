import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [theQs, updateQs] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((r) => r.json())
      .then((questions) => updateQs(questions));
  }, []);

  function handleNewQ(newQ) {
    updateQs([...theQs, newQ]);
  }

  function handleDeleteQ(theQ) {
    const newQList = theQs.filter((question) => question.id !== theQ.id);
    updateQs(newQList);
  }

  function handleUpdatedQ(theQ) {
    const updatedQList = theQs.map((question) => {
      if (question.id === theQ.id) return theQ;
      else return question;
    });
    updateQs(updatedQList);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQ={handleNewQ} /> : <QuestionList questions={theQs} onDeleteQ={handleDeleteQ} onUpdateQ={handleUpdatedQ} />}
    </main>
  );
}

export default App;
