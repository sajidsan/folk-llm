import { useState } from 'react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { Home } from 'griddy-icons'
import { theme } from './theme'
import { g } from './theme'
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
      {/* Home link — top-right on desktop, top-left on mobile */}
      <Box
        component="a"
        href="https://sajidsan.com"
        sx={{
          position: 'fixed',
          top: { xs: '16px', sm: '24px' },
          left: 'auto',
          right: { xs: '16px', sm: '24px' },
          color: g.onBgDimmer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          textDecoration: 'none',
          transition: 'color 0.15s',
          '&:hover': { color: g.onBgDim },
        }}
      >
        <Home size={18} />
      </Box>
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
