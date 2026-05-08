import { Box, Typography, Button, Container } from '@mui/material'
import { Robot } from 'griddy-icons'
import { g } from '../theme'

// Griddy-style ticket cell
function TicketCell({ label, value, borderRight }) {
  return (
    <Box sx={{
      flex: 1,
      p: 1.5,
      borderRight: borderRight ? `1px solid ${g.ticketBorder}` : 'none',
    }}>
      <Typography sx={{
        fontSize: '0.58rem',
        fontWeight: 400,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: g.onTicketDim,
        mb: 0.4,
        fontFamily: '"Space Mono", monospace',
      }}>
        {label}
      </Typography>
      <Typography sx={{
        fontSize: '0.9rem',
        fontWeight: 700,
        color: g.onTicket,
        fontFamily: '"Space Mono", monospace',
        lineHeight: 1.2,
      }}>
        {value}
      </Typography>
    </Box>
  )
}

export default function WelcomeScreen({ onStart, total }) {
  return (
    <Container maxWidth="xs">
      <Box sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 6,
        gap: 3,
      }}>

        {/* Eyebrow */}
        <Typography sx={{
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: g.onBgDimmer,
        }}>
          Version 1.0
        </Typography>

        {/* Title block */}
        <Box sx={{ mt: '-4px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            {/* Robot icon with floating speech bubble */}
            <Box sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
              {/* Speech bubble — sits just above robot box, tail overlaps into it */}
              <Box sx={{
                position: 'absolute',
                bottom: 'calc(100% - 6px)',
                left: 'calc(50% + 8px)',
                transform: 'translateX(-18%)',
                bgcolor: g.bg,
                border: `1px solid ${g.borderMid}`,
                borderRadius: g.shapeSm,
                px: 1, py: 0.35,
                whiteSpace: 'nowrap',
                zIndex: 2,
                // Outer triangle (border colour)
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '100%',
                  left: '14px',
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: `6px solid ${g.borderMid}`,
                },
                // Inner triangle (app bg colour — makes it look hollow)
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 'calc(100% - 1px)',
                  left: '15px',
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: `5px solid ${g.bg}`,
                  zIndex: 3,
                },
              }}>
                <Typography sx={{
                  fontSize: '0.6rem',
                  fontFamily: '"Space Mono", monospace',
                  fontStyle: 'italic',
                  color: g.onBgDimmer,
                  lineHeight: 1,
                }}>
                  sometimes i lie!
                </Typography>
              </Box>
              {/* Robot icon box */}
              <Box sx={{
                width: 40, height: 40,
                border: `1px solid ${g.border}`,
                borderRadius: g.shapeSm,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: g.accent,
              }}>
                <Robot size={20} />
              </Box>
            </Box>
            <Typography sx={{
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: g.onBgDim,
            }}>
              Folk LLM
            </Typography>
          </Box>

          <Typography sx={{
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 700,
            lineHeight: 1.2,
            color: g.onBg,
            letterSpacing: '-0.02em',
            mb: 1.5,
          }}>
            Folk LLM is a quiz on common misconceptions about how AI models actually work
          </Typography>

          <Typography sx={{
            fontSize: '0.9rem',
            fontFamily: '"Newsreader", Georgia, serif',
            lineHeight: 1.75,
            color: g.onBgDim,
          }}>
            You use AI every day. But how much of what you think you know is
            folk wisdom, and how much is grounded in how these systems actually work?
          </Typography>
        </Box>

        {/* Griddy-style ticket info card */}
        <Box sx={{
          bgcolor: g.ticketBg,
          border: `1px solid ${g.ticketBorder}`,
          borderRadius: g.shapeMd,
          overflow: 'hidden',
        }}>
          <Box sx={{ display: 'flex', borderBottom: `1px solid ${g.ticketBorder}` }}>
            <TicketCell label="Quiz type"   value="True / False"    borderRight />
            <TicketCell label="Questions"   value={`${total}`} />
          </Box>
          <Box sx={{ display: 'flex', borderBottom: `1px solid ${g.ticketBorder}` }}>
            <TicketCell label="Est. time"   value="~5 min"          borderRight />
            <TicketCell label="Topics"      value="7 categories" />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TicketCell label="Difficulty"  value="For daily users"  borderRight />
            <TicketCell label="Source"       value="Research-backed" />
          </Box>
        </Box>

        {/* CTA */}
        <Button
          variant="contained"
          size="large"
          onClick={onStart}
          sx={{ alignSelf: 'flex-start', px: 4 }}
        >
          Start Quiz →
        </Button>

      </Box>
    </Container>
  )
}
