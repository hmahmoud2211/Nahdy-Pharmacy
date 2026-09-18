export const spacing = {
  xs: 3,
  sm: 5,
  md: 8,
  lg: 11,
  xl: 14,
  xxl: 18,
} as const;

export const radii = {
  sm: 4,
  md: 6,
  lg: 8,
  pill: 999,
} as const;

export const borders = {
  hairline: 1,
};

// Reference design width the whole dashboard is laid out against (sidebar + content).
// Matches the PDF's landscape composition; screens scale/scroll from this on smaller viewports.
export const REFERENCE_WIDTH = 1440;
export const SIDEBAR_WIDTH = 210;
export const HEADER_HEIGHT = 48;
