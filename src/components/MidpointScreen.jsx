import { Box, Typography, Button, Container } from '@mui/material'
import { ArrowRight, Cleaver } from 'griddy-icons'
import { g } from '../theme'

function getQuip(score, total) {
  const pct = score / total
  if (pct >= 0.875) return "Nice, near perfect so far. You ready for the back half?"
  if (pct >= 0.625) return "Strong first half. Ready to keep going?"
  if (pct >= 0.375) return "Solid start! This stuff is tough and you're actually tracking with most people. Ready to keep going?"
  return "It looks like you're not quite finding your footing yet. Ready for the back half?"
}

export default function MidpointScreen({ answers, total, onContinue, onSkipToEnd }) {
  const halfTotal = answers.length
  const score     = answers.filter(a => a.correct).length

  return (
    <Container maxWidth="xs">
      <Box sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2.5,
        py: 6,
      }}>

        <Typography sx={{
          fontSize: '0.62rem',
          fontFamily: '"Space Mono", monospace',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: g.onBgDimmer,
        }}>
          Halfway there
        </Typography>

        <Box>
          <Typography sx={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: 'clamp(2rem, 8vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: g.onBg,
          }}>
            {score} / {halfTotal}
          </Typography>
          <Typography sx={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.72rem',
            color: g.onBgDimmer,
            mt: 0.5,
            letterSpacing: '0.06em',
          }}>
            correct so far
          </Typography>
        </Box>

        <Typography sx={{
          fontFamily: '"Newsreader", Georgia, serif',
          fontSize: '1.125rem',
          lineHeight: 1.65,
          color: g.onBgDim,
          maxWidth: 320,
        }}>
          {getQuip(score, halfTotal)}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onContinue}
            endIcon={<ArrowRight size={20} />}
          >
            Continue
          </Button>

          <Box
            component="button"
            onClick={onSkipToEnd}
            sx={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: '"Poppins", sans-serif', fontSize: '0.8rem',
              fontWeight: 500, color: g.onBgDimmer,
              py: 0.5, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '7px', width: '100%',
              letterSpacing: '0.01em',
              '&:hover': { color: g.onBgDim },
            }}
          >
            <Cleaver size={18} />
            Cut it Short and Jump to the End
          </Box>
        </Box>

      </Box>
    </Container>
  )
}
