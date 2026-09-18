// Static mock data transcribed from BMS Graphics.v3.pdf, page 5 (Lighting / Floor 01 - Lighting Status).

export const lightingPanel = {
  id: 'LP-01',
  mainBreaker: { value: 'OFF', sub: 'By Schedule' },
  dimmingLevelFloor: '0 %',
  bmsControl: 'Enabled',
  schedule: 'Active',
  nextOn: '06:00 AM',
  faults: 0,
};

export const bulb = {
  normal: { pct: 70, label: 'NORMAL LIGHTING', state: 'Available', annotation: 'OFF BY SCHEDULE', sub: 'Floor Lighting' },
  emergency: {
    pct: 30,
    label: 'EMERGENCY LIGHTING',
    state: 'Available',
    annotation: 'ON / AVAILABLE',
    sub: 'Emergency Lighting',
    subDetail: '(Stairs, Electrical Rooms, Exit)',
  },
};

export const systemInformationLighting = [
  { label: 'System Type', value: 'Lighting Control System' },
  { label: 'Lighting Panels', value: '3 (One per Floor)' },
  { label: 'Control', value: 'Main Breaker ON/OFF (Dry Contact)' },
  { label: 'Dimming', value: 'Floor Level Dimming' },
  { label: 'Normal Lighting', value: 'Supplied from Lighting Panel' },
  { label: 'Emergency Lighting', value: '~30% of fixtures' },
  { label: 'Emergency Supply', value: 'EDP → EMDB → ATS → MDB / Generator' },
  { label: 'BMS Schedule', value: 'Daily (OFF at 10:00 PM, ON at 06:00 AM)' },
];

export const normalLightingPath = [
  { title: 'MDB', sub: 'Utility Supply', status: 'NORMAL' },
  { title: 'LP-01', sub: 'By Schedule', status: 'OFF' },
  { title: 'NORMAL LIGHTING', sub: 'By Schedule (~70% Fixtures)', status: 'OFF' },
];
export const normalLightingNote = 'Normal lighting is OFF by schedule (10:00 PM).\nNext ON at 06:00 AM.';

export const emergencyPowerPath = [
  { title: 'MDB', sub: 'Utility Supply', status: 'NORMAL' },
  { title: 'ATS', sub: 'Automatic Transfer Switch', status: 'NORMAL' },
  { title: 'EMDB', sub: 'Emergency MDB', status: 'NORMAL' },
  { title: 'EDP', sub: 'Emergency Distribution Panel', status: 'NORMAL' },
  { title: 'EMERGENCY LIGHTING', sub: 'Corridors + Stairs, Electrical Rooms, Exit (~30% Fixtures)', status: 'NORMAL' },
];
export const emergencyLightingAvailable = 'EMERGENCY LIGHTING AVAILABLE';
export const emergencyNote = 'Emergency power path is healthy.\nEmergency lighting system is ready.';

export interface PanelSummaryRow {
  panel: string;
  location: string;
  circuits: number;
  circuitsOn: string;
  circuitsOff: string;
  loadKw: number;
  status: string;
}

export const panelSummary: PanelSummaryRow[] = [
  { panel: 'PANEL – GF', location: 'Ground Floor', circuits: 16, circuitsOn: '15 (79%)', circuitsOff: '4 (21%)', loadKw: 8.2, status: 'Normal' },
  { panel: 'PANEL – 1F', location: 'First Floor', circuits: 16, circuitsOn: '12 (75%)', circuitsOff: '4 (25%)', loadKw: 8.5, status: 'Normal' },
  { panel: 'PANEL – 2F', location: 'Second Floor', circuits: 16, circuitsOn: '11 (85%)', circuitsOff: '2 (15%)', loadKw: 8.3, status: 'Normal' },
];

// Reproduced exactly as displayed in the PDF, including totals that don't cleanly
// recompute from the rows above (e.g. circuit on/off percentages) - do not "correct" these.
export const panelSummaryTotal = {
  panel: 'Total',
  circuits: 48,
  circuitsOn: '38 (79%)',
  circuitsOff: '10 (21%)',
  loadKw: 25.0,
  status: 'Normal',
};

export const lightingAsOf = '10:25 AM';
