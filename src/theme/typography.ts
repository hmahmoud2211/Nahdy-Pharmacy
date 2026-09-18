import { TextStyle } from 'react-native';
import { colors } from './colors';

const base = (overrides: TextStyle): TextStyle => ({
  fontFamily: 'Inter_400Regular',
  color: colors.textPrimary,
  ...overrides,
});

export const typography = {
  pageTitle: base({ fontFamily: 'Inter_700Bold', fontSize: 16.5, letterSpacing: 0.2 }),
  sectionTitle: base({
    fontFamily: 'Inter_700Bold',
    fontSize: 11.5,
    letterSpacing: 0.3,
    color: colors.textPrimary,
  }),
  cardTitle: base({ fontFamily: 'Inter_600SemiBold', fontSize: 10.5, letterSpacing: 0.2 }),
  metricLarge: base({ fontFamily: 'Inter_700Bold', fontSize: 23 }),
  metricMedium: base({ fontFamily: 'Inter_700Bold', fontSize: 16 }),
  label: base({ fontFamily: 'Inter_600SemiBold', fontSize: 9.5, letterSpacing: 0.25, color: colors.textSecondary }),
  body: base({ fontSize: 10.5 }),
  bodyStrong: base({ fontFamily: 'Inter_600SemiBold', fontSize: 10.5 }),
  tableHeader: base({
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9.5,
    color: colors.textSecondary,
    letterSpacing: 0.15,
  }),
  tableCell: base({ fontSize: 10 }),
  caption: base({ fontSize: 9, color: colors.textMuted }),
} as const;
