export const theme = {
  colors: {
    primary: '#F4A9B8',
    secondary: '#A8D8C9',
    background: '#FFF8F3',
    surface: '#FFFFFF',
    text: '#4A4038',
    error: '#E27D7D',
    success: '#8FBF9F',
  },
  fonts: {
    heading: "'Quicksand', sans-serif",
    body: "'Nunito Sans', sans-serif",
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '20px',
    pill: '999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },
  shadows: {
    sm: '0 2px 8px rgba(74, 40, 33, 0.08)',
    md: '0 8px 24px rgba(74, 40, 33, 0.12)',
  },
} as const

export type Theme = typeof theme
