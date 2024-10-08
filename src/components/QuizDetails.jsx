import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const QuizDetails = () => {
  const [quiz, setQuiz] = useState({ title: '', description: '', questions: [] }); // Khởi tạo mảng questions là mảng rỗng
  const { id } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`https://sdn-asm1-oz51.onrender.com/quizzes/${id}`);
        const data = await response.json();
        if (data.questions && Array.isArray(data.questions)) { // Kiểm tra nếu questions tồn tại và là một mảng
          setQuiz(data);
        } else {
          setQuiz({ ...data, questions: [] }); // Nếu không phải mảng, set questions là mảng rỗng
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };
    fetchQuiz();
  }, [id]);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Quiz Details</h3>
      </div>
      <div className="card-body">
        <h4 className="card-title">{quiz.title}</h4>
        <p className="card-text">{quiz.description}</p>
        <h5>Questions:</h5>
        <ul>
          {quiz.questions.map((question, index) => (
            <li key={index}>{question.text}</li> // Sử dụng map trên một mảng đã được đảm bảo là tồn tại
          ))}
        </ul>
        <Link to={`/quizzes/${id}/edit`} className="btn btn-primary">Edit Quiz</Link>
      </div>
    </div>
  );
};

export default QuizDetails;
