import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import QuestionForm from './components/QuestionForm';
import QuizList from './components/QuizList';
import QuizForm from './components/QuizForm';
import QuizDetails from './components/QuizDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="container my-4">
        <h1 className="text-center mb-4">Question Bank Management Application</h1>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <Link className="navbar-brand" to="/">QBMA</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/questions">Questions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/quizzes">Quizzes</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/questions" element={<QuestionList />} />
          <Route path="/questions/new" element={<QuestionForm />} />
          <Route path="/questions/:id/edit" element={<QuestionForm />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quizzes/new" element={<QuizForm />} />
          <Route path="/quizzes/:id" element={<QuizDetails />} />
          <Route path="/quizzes/:id/edit" element={<QuizForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
