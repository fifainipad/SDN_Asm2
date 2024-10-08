import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionForm = () => {
  const [question, setQuestion] = useState({ text: '', options: ['', '', '', ''], correctAnswerIndex: 0 });
  const { id } = useParams(); // id của câu hỏi cho việc cập nhật
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    if (id) {
      // Chỉ tải câu hỏi khi có id, tức là trong trường hợp cập nhật
      fetchQuestion(id);
    }
  }, [id]);

  const fetchQuestion = async (questionId) => {
    try {
      const response = await fetch(`https://sdn-asm1-oz51.onrender.com/questions/${questionId}`);
      const data = await response.json();
      if (data) {
        setQuestion({ ...data, options: data.options || ['', '', '', ''] });
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      alert('Failed to load the question.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `https://sdn-asm1-oz51.onrender.com/questions/${id}` : 'https://sdn-asm1-oz51.onrender.com/questions';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
      });
      if (response.ok) {
        alert('Question saved successfully!');
        navigate('/questions'); // Điều hướng người dùng trở lại danh sách câu hỏi
      } else {
        throw new Error('Failed to save the question.');
      }
    } catch (error) {
      console.error('Error saving question:', error);
      alert(`Failed to save the question: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="questionText" className="form-label">Question Text</label>
        <input
          type="text"
          className="form-control"
          id="questionText"
          value={question.text}
          onChange={e => setQuestion({ ...question, text: e.target.value })}
          required
        />
      </div>
      {question.options.map((option, index) => (
        <div className="mb-3" key={index}>
          <label htmlFor={`option${index}`} className="form-label">Option {index + 1}</label>
          <input
            type="text"
            className="form-control"
            id={`option${index}`}
            value={option}
            onChange={e => {
              let newOptions = [...question.options];
              newOptions[index] = e.target.value;
              setQuestion({ ...question, options: newOptions });
            }}
            required
          />
        </div>
      ))}
      <div className="mb-3">
        <label htmlFor="correctAnswer" className="form-label">Correct Answer Index</label>
        <input
          type="number"
          className="form-control"
          id="correctAnswer"
          value={question.correctAnswerIndex}
          onChange={e => setQuestion({ ...question, correctAnswerIndex: parseInt(e.target.value, 10) })}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">{id ? 'Update Question' : 'Add Question'}</button>
    </form>
  );
};

export default QuestionForm;
