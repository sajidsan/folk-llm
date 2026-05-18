import { useState } from 'react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { Vacation } from 'griddy-icons'
import { theme } from './theme'
import { g } from './theme'
import WelcomeScreen from './components/WelcomeScreen'
import QuizCard from './components/QuizCard'
import MidpointScreen from './components/MidpointScreen'
import ResultsScreen from './components/ResultsScreen'
import { questions } from './data/questions'

const MIDPOINT_INDEX = Math.floor(questions.length / 2) - 1  // show after Q8

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
    if (currentIndex === MIDPOINT_INDEX) {
      setScreen('midpoint')
    } else if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setScreen('results')
    }
  }

  function handleMidpointContinue() {
    setCurrentIndex(MIDPOINT_INDEX + 1)
    setScreen('quiz')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'relative' }}>
        {/* Vacation icon — only on welcome + results, scrolls with page */}
        {screen !== 'quiz' && (
          <Box
            component="a"
            href="https://sajidsan.com"
            sx={{
              position: 'absolute',
              top: { xs: '16px', sm: '24px' },
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
            <Vacation size={18} />
          </Box>
        )}
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
      {screen === 'midpoint' && (
        <MidpointScreen
          answers={answers}
          total={questions.length}
          onContinue={handleMidpointContinue}
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
      </Box>
    </ThemeProvider>
  )
}
