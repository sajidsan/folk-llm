import { createTheme } from '@mui/material/styles'

// Griddy-inspired light palette — warm paper background, steel-blue ticket
export const g = {
  // Backgrounds
  bg:             '#f0ebe0',  // warm cream paper
  surfaceLow:     '#ece5d8',
  surface:        '#ffffff',
  surfaceHigh:    '#faf6f0',

  // Borders
  border:         '#d8d0c0',
  borderMid:      '#bdb5a5',
  borderStrong:   '#a09888',

  // Text on light — all values pass WCAG AA (4.5:1) on g.bg
  onBg:           '#1a1810',  // ~17:1
  onBgDim:        '#4a4038',  // ~8:1  — body text, detail copy
  onBgDimmer:     '#6a6458',  // ~4.6:1 — labels, counters, secondary UI

  // Griddy red accent
  accent:         '#e63928',
  accentHover:    '#c82e1e',
  onAccent:       '#ffffff',

  // Ticket / reveal card — warm neutral white
  ticketBg:       '#faf7f2',
  ticketBorder:   '#d8d0c0',
  onTicket:       '#1a1810',  // ~19:1 on ticketBg
  onTicketMid:    '#48403a',  // ~8.9:1
  onTicketDim:    '#5e5248',  // ~6.2:1 — was #786860 at borderline 4.5:1

  // Correct / wrong — question card tint
  correctText:    '#1a7035',
  correctBg:      '#eaf5ee',
  wrongText:      '#c83018',
  wrongBg:        '#fdf0ee',

  // Verdict header row — solid fills, readable on the steel-blue ticket
  correctHeaderBg:    '#c8ecd4',
  correctHeaderText:  '#14522a',
  wrongHeaderBg:      '#f8d8d2',
  wrongHeaderText:    '#9e1e0e',

  // Amber — "how to use this" (kept for any remaining uses)
  amberText:      '#8a5810',

  // False card — matches ticket false-header tone and ticket border
  tombstoneBg:     '#f0ede8',   // ticketBg + ~4% black overlay
  tombstoneBorder: '#d8d0c0',   // same as ticketBorder

  // Shape scale — utilitarian, minimal radius
  shapeNone:  '0px',
  shapeXs:    '3px',
  shapeSm:    '5px',
  shapeMd:    '8px',
  shapeLg:    '12px',
  shapeFull:  '9999px',
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: g.accent,        contrastText: g.onAccent },
    background: { default: g.bg,         paper: g.surface },
    text:       { primary: g.onBg,       secondary: g.onBgDim },
    divider:    g.border,
    error:      { main: g.wrongText },
  },
  shape: { borderRadius: 5 },
  typography: {
    // Newsreader is the default for body copy
    fontFamily: '"Newsreader", Georgia, serif',
    // Poppins for all display / heading sizes
    h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    // Space Mono for buttons and UI chrome
    button: {
      fontFamily: '"Poppins", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: g.bg, color: g.onBg } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: g.shapeSm,
          textTransform: 'none',
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 600,
          letterSpacing: '0.01em',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
          '&:active': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: g.accent,
          '&:hover': { backgroundColor: g.accentHover },
        },
        sizeLarge: { padding: '13px 28px', fontSize: '0.9375rem' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: g.shapeMd,
          border: `1px solid ${g.border}`,
          boxShadow: 'none',
          backgroundImage: 'none',
          backgroundColor: g.surface,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: g.shapeXs,
          fontFamily: '"Space Mono", monospace',
          fontWeight: 700,
          fontSize: '0.62rem',
          letterSpacing: '0.08em',
          height: 22,
          textTransform: 'uppercase',
        },
        label: { paddingLeft: 8, paddingRight: 8 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: 2,
          backgroundColor: g.border,
        },
        bar: { borderRadius: 0, backgroundColor: g.accent },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: g.border } },
    },
  },
})
