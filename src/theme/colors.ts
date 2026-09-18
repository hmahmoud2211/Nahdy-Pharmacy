// Palette sampled directly from BMS Graphics.v3.pdf (pages 2-5 + shared chrome).
export const colors = {
  // Core brand / primary teal (headers, home button, dashboard/electrical accents)
  primary: '#0E4B5A',
  primaryDark: '#0A3A46',
  primaryLight: '#E6F3F3',

  // Surfaces
  background: '#F5F6F7',
  surface: '#FFFFFF',
  surfaceAlt: '#FAFBFB',
  border: '#E7EAEC',
  borderStrong: '#D7DCDF',

  // Text
  textPrimary: '#122B33',
  textSecondary: '#5B6B70',
  textMuted: '#8A979B',
  textInverse: '#FFFFFF',

  // Status semantics
  success: '#1F9D55',
  successBg: '#E7F6ED',
  danger: '#D9342B',
  dangerBg: '#FBE8E6',
  warning: '#E8720C',
  warningBg: '#FDECDD',
  warningLight: '#F2B705',
  warningLightBg: '#FCF3D6',
  info: '#2255A4',
  infoBg: '#E9EFF9',
  disabled: '#9AA0A6',
  disabledBg: '#EFF0F1',

  // Sidebar section colors
  sectionElectrical: '#0E4B5A',
  sectionMechanical: '#1E8A63',
  sectionMedical: '#6A4C93',
  sectionBuildingTech: '#E8720C',
  sectionITInfra: '#2A4F9E',

  // Charts
  chartHigh: '#D9342B',
  chartMedium: '#E8720C',
  chartLow: '#F2B705',
  chartAvailable: '#1F9D55',
  chartUnavailable: '#D9342B',
  chartDegraded: '#E8720C',
  chartMaintenance: '#B9BEC2',

  gaugeTrack: '#EAEDEE',
  gaugeTeal: '#0E4B5A',
  gaugeBlue: '#2255A4',
} as const;

export type ColorToken = keyof typeof colors;
