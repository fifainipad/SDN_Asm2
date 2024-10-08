import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('https://sdn-asm1-oz51.onrender.com/quizzes')
      .then(response => response.json())
      .then(data => setQuizzes(data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`https://sdn-asm1-oz51.onrender.com/quizzes/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
      setQuizzes(updatedQuizzes); // Update state after deletion
    } else {
      alert('Failed to delete the quiz. Please try again.');
    }
  };

  return (
    <div>
      <h2>List of Quizzes</h2>
      <Link to="/quizzes/new" className="btn btn-success mb-3">Create New Quiz</Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz.id}>
              <td>{quiz.title}</td>
              <td>{quiz.description}</td>
              <td>
                <Link to={`/quizzes/${quiz.id}`} className="btn btn-info btn-sm">View</Link>
                <Link to={`/quizzes/${quiz.id}/edit`} className="btn btn-primary btn-sm">Edit</Link>
                <button onClick={() => handleDelete(quiz.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizList;
