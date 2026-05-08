import { useEffect } from 'react'
import { Box, Typography, Button, Container, Fade, Divider, Link } from '@mui/material'
import { Sun, HalloweenSkull, Check, Close, RefreshCw, ChatCircle, ArrowUpRight, AiFlow, Chip, Database, FolderLocked, LightbulbOn, Robot, CodeSquare } from 'griddy-icons'
import { g } from '../theme'

const CATEGORY_META = {
  Memory:       { Icon: Database    },
  Reasoning:    { Icon: AiFlow      },
  Architecture: { Icon: Chip        },
  Behavior:     { Icon: Robot       },
  Security:     { Icon: FolderLocked},
  Tokenization: { Icon: CodeSquare  },
  Training:     { Icon: LightbulbOn },
}

function getTier(pct) {
  if (pct === 100) return { label: 'Perfect score',    sub: 'You actually know how these things work.',         color: g.correctText }
  if (pct >= 80)  return { label: 'Sharp intuition',   sub: "You've cut through most of the folk wisdom.",      color: '#7ab8e8' }
  if (pct >= 60)  return { label: 'Mixed signals',     sub: 'Half real knowledge, half inherited assumptions.', color: g.onBgDim   }
  if (pct >= 40)  return { label: 'Folk believer',     sub: "A lot of common myths got you. That's normal.",    color: g.amberText }
  return                  { label: 'Deep folk country', sub: 'The gap between folk knowledge and reality is wide.', color: g.wrongText }
}

// Bolds the first sentence of body copy
function BoldFirst({ text, sx }) {
  const match = text.match(/^(.+?[.!?])(\s+[\s\S]*)?$/)
  if (!match) return <Typography sx={sx}>{text}</Typography>
  const [, first, rest] = match
  return (
    <Typography sx={sx}>
      <Box component="span" sx={{ fontWeight: 600 }}>{first}</Box>
      {rest || ''}
    </Typography>
  )
}

export default function ResultsScreen({ answers, questions, onRestart }) {
  const answered   = answers.length
  const isComplete = answered === questions.length
  const score      = answers.filter(a => a.correct).length
  const pct        = answered > 0 ? Math.round((score / answered) * 100) : 0
  const tier       = getTier(pct)
  // Scroll to top whenever the results screen mounts
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  const wrongItems = answers
    .map((a, i) => ({ ...a, question: questions[i] }))
    .filter(a => !a.correct)

  return (
    <Container maxWidth="sm">
      <Fade in timeout={300}>
        <Box sx={{ py: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* Score ticket */}
          <Box sx={{
            bgcolor: g.ticketBg,
            border: `1px solid ${g.ticketBorder}`,
            borderRadius: g.shapeMd,
            overflow: 'hidden',
          }}>
            {/* Header */}
            <Box sx={{
              px: 2.5, py: 2,
              borderBottom: `1px solid ${g.ticketBorder}`,
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 2,
            }}>
              <Box>
                <Typography sx={{
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: g.onTicketDim,
                  mb: 0.5,
                }}>
                  {isComplete ? 'Final score' : 'Final score (incomplete)'}
                </Typography>
                <Typography sx={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: tier.color,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontFamily: '"Poppins", sans-serif',
                }}>
                  {score}<span style={{ fontSize: '1.2rem', color: g.onTicketDim, fontWeight: 400, fontFamily: '"Space Mono", monospace' }}> / {answered}</span>
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: g.onTicketDim,
                  mb: 0.5,
                }}>
                  Verdict
                </Typography>
                <Typography sx={{
                  fontSize: '0.9375rem',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 700,
                  color: tier.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {tier.label}
                </Typography>
                <Typography sx={{
                  fontSize: '0.9375rem',
                  fontFamily: '"Newsreader", Georgia, serif',
                  color: g.onTicketMid,
                  mt: 0.25,
                }}>
                  {tier.sub}
                </Typography>
              </Box>
            </Box>

            {/* Score bar row */}
            <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                flex: 1,
                height: 4,
                bgcolor: g.ticketBorder,
                borderRadius: 0,
                overflow: 'hidden',
              }}>
                <Box sx={{
                  height: '100%',
                  width: `${pct}%`,
                  bgcolor: tier.color,
                  transition: 'width 1s ease',
                }} />
              </Box>
              <Typography sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: g.onTicketDim,
                fontVariantNumeric: 'tabular-nums',
                minWidth: '3ch',
              }}>
                {pct}%
              </Typography>
            </Box>
          </Box>

          {/* Wrong answers */}
          {wrongItems.length > 0 && (
            <Box>
              <Typography sx={{
                fontSize: '0.58rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: g.onBgDimmer,
                mb: 1.5,
              }}>
                Where folk wisdom got you
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {wrongItems.map(({ question }) => {
                  const meta = CATEGORY_META[question.category] || { Icon: Robot }
                  const { Icon: CatIcon } = meta
                  return (
                    <Box
                      key={question.id}
                      sx={{
                        bgcolor: g.ticketBg,
                        border: `1px solid ${g.ticketBorder}`,
                        borderRadius: g.shapeMd,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Card header */}
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                        py: 1.25,
                        borderBottom: `1px solid ${g.ticketBorder}`,
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <CatIcon size={12} color={g.onTicketDim} />
                          <Typography sx={{
                            fontSize: '0.58rem',
                            fontWeight: 700,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: g.onTicketDim,
                          }}>
                            {question.category}
                          </Typography>
                        </Box>
                        <Box sx={{
                          display: 'inline-flex', alignItems: 'center', gap: 0.4,
                          fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em',
                          textTransform: 'uppercase', fontFamily: '"Space Mono", monospace',
                          color: g.onTicketMid,
                          border: `1px solid ${g.ticketBorder}`,
                          borderRadius: g.shapeXs, px: 0.9, py: 0.25,
                        }}>
                          {question.answer ? <Sun size={9} /> : <HalloweenSkull size={9} />}
                          {question.answer ? 'True' : 'False'}
                        </Box>
                      </Box>

                      <Box sx={{ px: 2, pt: 1.75, pb: 1.5 }}>
                        <Typography sx={{
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: g.onTicket,
                          lineHeight: 1.5,
                          mb: 1,
                        }}>
                          {question.title}
                        </Typography>
                        <Typography sx={{
                          fontSize: '0.8rem',
                          color: g.onTicketMid,
                          lineHeight: 1.7,
                          mb: 1.5,
                        }}>
                          {question.explanation}
                        </Typography>

                        <Typography sx={{
                          fontSize: '1rem',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 600,
                          color: g.onTicket,
                          mt: 1.25,
                          mb: 0.5,
                        }}>
                          How to use this
                        </Typography>
                        <BoldFirst text={question.takeaway} sx={{
                          fontSize: '0.875rem',
                          fontFamily: '"Newsreader", Georgia, serif',
                          color: g.onTicketMid,
                          lineHeight: 1.7,
                          mb: 1.25,
                        }} />

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                          <Link
                            href={question.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              display: 'inline-flex', alignItems: 'center', gap: 0.5,
                              fontSize: '0.7rem', color: g.onTicketDim, textDecoration: 'none',
                              border: `1px solid ${g.ticketBorder}`,
                              borderRadius: g.shapeXs, px: 1.1, py: 0.4,
                              fontFamily: '"Space Mono", monospace',
                              bgcolor: 'rgba(0,0,0,0.04)',
                              '&:hover': { color: g.onTicket, bgcolor: 'rgba(0,0,0,0.1)' },
                            }}
                          >
                            <ArrowUpRight size={11} /> {question.source}
                          </Link>
                          {question.learnMore?.map(({ label, url }) => (
                            <Link
                              key={url} href={url} target="_blank" rel="noopener noreferrer"
                              sx={{
                                display: 'inline-flex', alignItems: 'center', gap: 0.5,
                                fontSize: '0.7rem', color: g.onTicketMid, textDecoration: 'none',
                                border: `1px solid ${g.ticketBorder}`,
                                borderRadius: g.shapeXs, px: 1.1, py: 0.4,
                                fontFamily: '"Space Mono", monospace',
                                bgcolor: 'rgba(0,0,0,0.04)',
                                '&:hover': { color: g.onTicket, bgcolor: 'rgba(0,0,0,0.1)' },
                              }}
                            >
                              <ArrowUpRight size={11} /> {label}
                            </Link>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={onRestart}
              endIcon={<RefreshCw size={20} />}
            >
              Try Again
            </Button>
            <Button
              variant="outlined"
              size="large"
              component="a"
              href="https://sajidsan.com"
              endIcon={<ChatCircle size={20} color={g.onBgDim} />}
              sx={{
                borderColor: g.borderMid,
                color: g.onBgDim,
                textDecoration: 'none',
                '&:hover': { borderColor: g.borderStrong, bgcolor: 'transparent' },
              }}
            >
              Say Hi
            </Button>
          </Box>

        </Box>
      </Fade>
    </Container>
  )
}
