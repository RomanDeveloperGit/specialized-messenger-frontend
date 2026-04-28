import { createTheme, type MantineColorsTuple } from '@mantine/core';

const green: MantineColorsTuple = [
  '#e8f5ee',
  '#c5e6d3',
  '#9dd4b5',
  '#6ec295',
  '#4caf6f', // [4] — основной
  '#3a8a56',
  '#2e6e44',
  '#215233',
  '#163824',
  '#0b1f14',
];

export const THEME = createTheme({
  primaryColor: 'green',
  primaryShade: { light: 4, dark: 4 },
  colors: { green },
  white: '#e8e8ea',
  black: '#1c1c1e',
  fontSizes: {
    xs: '11px',
    sm: '13px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  },
  defaultRadius: 'md',
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '20px',
  },
  spacing: {
    xs: '6px',
    sm: '10px',
    md: '14px',
    lg: '20px',
    xl: '28px',
  },
  shadows: {
    xs: '0 1px 4px rgba(0,0,0,0.4)',
    sm: '0 2px 8px rgba(0,0,0,0.45)',
    md: '0 4px 16px rgba(0,0,0,0.5)',
    lg: '0 8px 32px rgba(0,0,0,0.55)',
    xl: '0 16px 48px rgba(0,0,0,0.6)',
  },
  cursorType: 'pointer',
  components: {
    Button: {
      defaultProps: { radius: 'md' },
      styles: {
        root: {
          fontWeight: 500,
          letterSpacing: '0.01em',
        },
      },
    },
    Input: {
      styles: {
        input: {
          'backgroundColor': '#2c2c2e',
          'borderColor': 'rgba(255,255,255,0.08)',
          'color': '#e8e8ea',
          '&:focus': {
            borderColor: '#4caf6f',
          },
          '&::placeholder': {
            color: '#8e8e93',
          },
        },
      },
    },
    Paper: {
      defaultProps: { radius: 'lg' },
      styles: {
        root: {
          backgroundColor: '#242426',
          border: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    NavLink: {
      styles: {
        root: {
          'borderRadius': '8px',
          '&[data-active]': {
            backgroundColor: '#2c2c2e',
            color: '#4caf6f',
          },
        },
      },
    },
    Badge: {
      styles: {
        root: { fontWeight: 500, letterSpacing: '0.02em' },
      },
    },
    Tooltip: {
      defaultProps: {
        color: 'dark',
        withArrow: true,
      },
    },
    Modal: {
      styles: {
        content: { backgroundColor: '#242426' },
        header: {
          backgroundColor: '#242426',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
  },
});
