import { Box, Card, CardContent, Typography, LinearProgress, Button, Fade, Divider, Link, Tooltip } from '@mui/material'
import { Sun, HalloweenSkull, Cleaver, ArrowRight, ArrowUpRight, AiFlow, Chip, Database, FolderLocked, LightbulbOn, Robot, CodeSquare, Check, Close } from 'griddy-icons'
import { g } from '../theme'

const CATEGORY_META = {
  Memory:       { Icon: Database,     label: 'Memory'       },
  Reasoning:    { Icon: AiFlow,       label: 'Reasoning'    },
  Architecture: { Icon: Chip,         label: 'Architecture' },
  Behavior:     { Icon: Robot,        label: 'Behavior'     },
  Security:     { Icon: FolderLocked, label: 'Security'     },
  Tokenization: { Icon: CodeSquare,   label: 'Tokenization' },
  Training:     { Icon: LightbulbOn,  label: 'Training'     },
}

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

function AnswerButton({ label, Icon, onClick }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        flex: 1, position: 'relative', overflow: 'hidden',
        bgcolor: g.surfaceHigh, color: g.onBgDim,
        border: `1px solid ${g.borderMid}`, borderRadius: g.shapeSm,
        py: '16px', px: 2, fontSize: '0.9rem', fontWeight: 600,
        fontFamily: '"Poppins", sans-serif', letterSpacing: '0.01em',
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '10px',
        userSelect: 'none', WebkitTapHighlightColor: 'transparent',
        '&::before': {
          content: '""', position: 'absolute', inset: 0,
          bgcolor: 'currentColor', opacity: 0, transition: 'opacity 0.15s',
        },
        '&:hover::before':  { opacity: 0.06 },
        '&:active::before': { opacity: 0.1 },
      }}
    >
      <Icon size={16} />{label}
    </Box>
  )
}

export default function QuizCard({ question, index, total, userAnswer, onAnswer, onNext, onExit, onSkipToEnd }) {
  const hasAnswered   = userAnswer !== undefined
  const isLast        = index === total - 1
  const correct       = hasAnswered && userAnswer.correct
  const statementTrue = question.answer
  const meta          = CATEGORY_META[question.category] || { Icon: Robot, label: question.category }
  const { Icon: CategoryIcon } = meta
  // Card goes tombstone-grey when answered and statement is false
  const cardBg     = hasAnswered && !statementTrue ? g.tombstoneBg   : g.surface
  const cardBorder = hasAnswered && !statementTrue ? g.tombstoneBorder : g.border

  return (
    <Box sx={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      maxWidth: 600, mx: 'auto', px: { xs: 2, sm: 3 }, py: 3, gap: 2,
    }}>

      {/* App bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
          component="button"
          onClick={onExit}
          sx={{
            background: 'none', border: 'none', cursor: 'pointer', p: 0,
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: g.onBgDimmer,
            fontFamily: '"Space Mono", monospace',
            '&:hover': { color: g.onBg },
          }}
        >
          Folk LLM
        </Box>
        <Tooltip
          title="Exit quiz"
          placement="bottom-end"
          arrow
          slotProps={{
            tooltip: {
              sx: {
                bgcolor: g.onBg, color: g.bg,
                fontSize: '0.68rem', fontFamily: '"Space Mono", monospace',
                letterSpacing: '0.06em',
              },
            },
            arrow: { sx: { color: g.onBg } },
          }}
        >
          <Box
            component="button"
            onClick={onExit}
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              color: g.onBgDimmer, p: 0.5, borderRadius: g.shapeXs,
              '&:hover': { color: g.onBg },
            }}
          >
            <Close size={16} />
          </Box>
        </Tooltip>
      </Box>

      {/* Progress */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <LinearProgress variant="determinate" value={(index / total) * 100} sx={{ flex: 1 }} />
        <Typography sx={{
          fontSize: '0.72rem', color: g.onBgDimmer, fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.04em', minWidth: '3.5rem', textAlign: 'right',
          fontFamily: '"Space Mono", monospace',
        }}>
          {index + 1} / {total}
        </Typography>
      </Box>

      {/* Question card — tombstone grey when statement is false */}
      <Card sx={{
        bgcolor: cardBg, borderColor: cardBorder,
        transition: 'background-color 0.3s, border-color 0.3s',
      }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            px: 2.5, py: 1.5, borderBottom: `1px solid ${g.border}`,
          }}>
            <CategoryIcon size={14} color={g.onBgDimmer} />
            <Typography sx={{
              fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: g.onBgDimmer,
              fontFamily: '"Space Mono", monospace',
            }}>
              {meta.label}
            </Typography>
          </Box>
          <Box sx={{ p: 2.5 }}>
            <Typography sx={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700, lineHeight: 1.45, color: g.onBg, mb: 2, letterSpacing: '-0.01em',
            }}>
              {question.title}
            </Typography>
            <Typography sx={{
              fontSize: '0.9rem', fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 400, lineHeight: 1.8, color: g.onBgDim,
              pl: 1.5, borderLeft: `2px solid ${g.borderMid}`,
            }}>
              {question.statement}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Answer buttons */}
      {!hasAnswered && (
        <Box sx={{ display: 'flex', gap: 1.5, mt: { xs: 'auto', sm: 2 } }}>
          <AnswerButton label="True"  Icon={Check} onClick={() => onAnswer(true)}  />
          <AnswerButton label="False" Icon={Close} onClick={() => onAnswer(false)} />
        </Box>
      )}

      {/* Ticket reveal */}
      {hasAnswered && (
        <Fade in timeout={250}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>

            <Box sx={{
              bgcolor: g.ticketBg, border: `1px solid ${g.ticketBorder}`,
              borderRadius: g.shapeMd, overflow: 'hidden',
            }}>
              {/* Ticket header: mustard bg for true, subtle grey for false */}
              <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                px: 2.5, py: 1.5, borderBottom: `1px solid ${g.ticketBorder}`,
                bgcolor: statementTrue ? 'transparent' : 'rgba(0,0,0,0.04)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: g.onTicketMid }}>
                  <Box sx={{ display: 'flex', position: 'relative', top: '-2px' }}>
                    {statementTrue ? <Sun size={16} /> : <HalloweenSkull size={16} />}
                  </Box>
                  <Typography sx={{
                    fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontFamily: '"Space Mono", monospace',
                    color: g.onTicketMid,
                  }}>
                    {question.answer ? 'This Statement is True' : 'This Statement is False'}
                  </Typography>
                </Box>
                {/* User result chip — only this gets color */}
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.5,
                  px: 1, py: 0.3,
                  bgcolor: correct ? g.correctHeaderBg : g.wrongHeaderBg,
                  border: `1px solid ${correct ? g.correctHeaderText + '55' : g.wrongHeaderText + '55'}`,
                  borderRadius: g.shapeXs,
                  fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', fontFamily: '"Space Mono", monospace',
                  color: correct ? g.correctHeaderText : g.wrongHeaderText,
                }}>
                  {correct ? <Check size={10} /> : <Close size={10} />}
                  {correct ? 'Correct' : 'Missed'}
                </Box>
              </Box>

              {/* Truth section */}
              <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
                <Typography sx={{
                  fontSize: '1rem', fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600, color: g.onTicket, mb: 0.75,
                }}>
                  {statementTrue ? 'How this works' : 'The truth'}
                </Typography>
                <BoldFirst text={question.explanation} sx={{
                  fontSize: '0.9375rem', fontFamily: '"Newsreader", Georgia, serif',
                  fontWeight: 400, lineHeight: 1.75, color: g.onTicketMid,
                }} />
              </Box>

              {/* Takeaway section — no divider, no amber color */}
              <Box sx={{ px: 2.5, pt: 1.5, pb: 1.5 }}>
                <Typography sx={{
                  fontSize: '1rem', fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600, color: g.onTicket, mb: 0.75,
                }}>
                  How to use this
                </Typography>
                <BoldFirst text={question.takeaway} sx={{
                  fontSize: '0.9375rem', fontFamily: '"Newsreader", Georgia, serif',
                  fontWeight: 400, lineHeight: 1.75, color: g.onTicketMid, mb: 1.5,
                }} />
                <Link
                  href={question.sourceUrl} target="_blank" rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.5,
                    fontSize: '0.72rem', color: g.onTicketDim, textDecoration: 'none',
                    fontFamily: '"Space Mono", monospace',
                    '&:hover': { color: g.onTicket, textDecoration: 'underline' },
                  }}
                >
                  <ArrowUpRight size={12} />{question.source}
                </Link>
              </Box>

              {question.learnMore?.length > 0 && (
                <>
                  <Divider sx={{ borderColor: g.ticketBorder, mx: 2.5 }} />
                  <Box sx={{ px: 2.5, pt: 1.5, pb: 2 }}>
                    <Typography sx={{
                      fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: g.onTicketDim, mb: 1,
                      fontFamily: '"Space Mono", monospace',
                    }}>
                      Learn more
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {question.learnMore.map(({ label, url }) => (
                        <Link
                          key={url} href={url} target="_blank" rel="noopener noreferrer"
                          sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 0.5,
                            fontSize: '0.72rem', fontFamily: '"Space Mono", monospace',
                            color: g.onTicketMid, textDecoration: 'none',
                            border: `1px solid ${g.ticketBorder}`, borderRadius: g.shapeXs,
                            px: 1.25, py: 0.5, bgcolor: 'rgba(0,0,0,0.03)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.08)', borderColor: g.onTicketDim },
                          }}
                        >
                          <ArrowUpRight size={11} />{label}
                        </Link>
                      ))}
                    </Box>
                  </Box>
                </>
              )}
            </Box>

            <Button
              variant="contained" fullWidth size="large" onClick={onNext}
              endIcon={<ArrowRight size={16} />}
            >
              {isLast ? 'See Results' : 'Continue'}
            </Button>

            {/* Cut it Short — very secondary ghost text */}
            <Box
              component="button"
              onClick={onSkipToEnd}
              sx={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: '"Poppins", sans-serif', fontSize: '0.8rem',
                fontWeight: 500, color: '#c4bcac',
                py: 0.5, display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '7px', width: '100%',
                letterSpacing: '0.01em',
                '&:hover': { color: '#a89e8e' },
              }}
            >
              <Cleaver size={14} />
              Cut it Short and Jump to the End
            </Box>

          </Box>
        </Fade>
      )}
    </Box>
  )
}
