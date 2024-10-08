import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://sdn-asm1-oz51.onrender.com/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://sdn-asm1-oz51.onrender.com/questions/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Xóa thành công, cập nhật danh sách để phản ánh sự thay đổi này
        setQuestions(questions.filter(question => question.id !== id));
      } else {
        throw new Error('Failed to delete the item.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Could not delete the item due to an error.'); // Hiển thị thông báo lỗi
    }
  };
  

  return (
    <div>
      <h2>List of Questions</h2>
      <Link to="/questions/new" className="btn btn-success mb-3">Create New Question</Link>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.text}</td>
              <td>
                <Link to={`/questions/${question.id}/edit`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button onClick={() => {handleDelete(question.id)}} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
