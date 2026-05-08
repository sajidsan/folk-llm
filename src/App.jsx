import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme'
import WelcomeScreen from './components/WelcomeScreen'
import QuizCard from './components/QuizCard'
import ResultsScreen from './components/ResultsScreen'
import { questions } from './data/questions'

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  function handleStart() {
    setCurrentIndex(0)
    setAnswers([])
    setScreen('quiz')
  }

  function handleAnswer(userAnswer) {
    const q = questions[currentIndex]
    setAnswers(prev => [...prev, { questionId: q.id, userAnswer, correct: userAnswer === q.answer }])
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setScreen('results')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {screen === 'welcome' && <WelcomeScreen onStart={handleStart} total={questions.length} />}
      {screen === 'quiz' && (
        <QuizCard
          question={questions[currentIndex]}
          index={currentIndex}
          total={questions.length}
          userAnswer={answers[currentIndex]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onExit={() => setScreen('welcome')}
          onSkipToEnd={() => setScreen('results')}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          answers={answers}
          questions={questions}
          onRestart={() => setScreen('welcome')}
        />
      )}
    </ThemeProvider>
  )
}
