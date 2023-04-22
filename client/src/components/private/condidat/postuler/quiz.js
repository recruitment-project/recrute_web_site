import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import SidebarCandidat from '../../../layout/sidebarCondidat';
import Header from '../../../layout/header.js';
import toast, { Toaster } from 'react-hot-toast';
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { id } = useParams("");
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get(`/api/questionsByOffre/${id}`);
      setQuestions(res.data);
      
    };
    fetchQuestions();
  }, []);
  const handleAnswerOptionClick = (Answer) => {
    if (questions[currentQuestion]?.correctAnswer==Answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const ajoutScore = async (e) => {
    e.preventDefault();
    try {
      
      await axios.put(`http://localhost:8080/api/ajoutScore/${id}`, {
        score,
        questions,
      });
      
     
      toast.success('Votre demande à été envoyer!');
  
    
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <div className='displ flex'>
    <div>
   <SidebarCandidat/>
    </div>
    <div className='layout'>
    <Header/>
   
    <div className='cardformation'>
    <div className="cardTitlequiz">
            <p id='textF' className=" text-3xl font-bold">Quiz</p>
           
      </div>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
         
      <div className='quiz'>
      {showScore ? (
        <div >
          <p className=" text-3xl font-bold">Vous avez obtenu {score} sur {questions.length} questions.</p>
          <button className='btnpost' onClick={ajoutScore}>
                Envoyer une demande
              </button>
        </div>
      ) : (
        <>
          <div className=''>
            <div className=" text-3xl">
            <h1><span>Question {currentQuestion + 1}</span> of {questions.length}</h1>
            
            </div>
            <div className='question'><h3>{currentQuestion+1}-{questions[currentQuestion]?.question}</h3></div>
          </div>
          <div className='flex answer'>
      <div>
              <button className='AnswerButton' onClick={() => handleAnswerOptionClick(questions[currentQuestion]?.options0)}>
                {questions[currentQuestion]?.options0}
              </button>
              </div>
              <div>
              <button className='AnswerButton' onClick={() => handleAnswerOptionClick(questions[currentQuestion]?.options1)}>
                {questions[currentQuestion]?.options1}
              </button>
              </div>
              <div>
              <button className='AnswerButton' onClick={() => handleAnswerOptionClick(questions[currentQuestion]?.options2)}>
                {questions[currentQuestion]?.options2}
              </button>
              </div>
           
          </div>
        </>
      )}
    </div>
    </div>
    </div>
    </div>
  );
};
export default Quiz

