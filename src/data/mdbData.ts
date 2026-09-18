// Static mock data transcribed from BMS Graphics.v3.pdf, page 3 (Power MDB / MDB Single Line Diagram).

export const mdbStatus = {
  overall: 'Normal',
  incomingSupply: 'Normal',
  busbar: 'Normal',
  totalActiveLoadPct: 68,
  powerQuality: 'Normal',
  systemAlarms: 1,
};

export const totalActiveLoad = {
  pct: 68,
  sub: '1,224 kW / 1,800 kVA',
};

export const mdbMetricCards = {
  apparentPower: '1,800 kVA',
  activeEnergyToday: '8,452 kWh',
  powerQuality: { status: 'Normal', thd: '2.1%', pf: '0.98' },
};

export const mdbLiveMetrics = [
  { label: 'Max Demand', value: '1,310 kW' },
  { label: 'Peak Demand Time', value: '09:15 AM' },
  { label: 'Load Factor', value: '0.78' },
  { label: 'Neutral Current', value: '48 A' },
  { label: 'Frequency', value: '50.0 Hz' },
  { label: 'Average Voltage', value: '414 V' },
];

export const mdbMeterStatus = [
  { label: 'Meter Status', value: 'Online' },
  { label: 'Last Sync', value: '10:25 AM' },
  { label: 'Data Quality', value: 'Normal' },
  { label: 'Connected Meters', value: '12 / 12' },
];

export const incomingSupply = {
  status: 'NORMAL',
  vll: '380 V',
  i: '872 A',
  p: '648 kW',
  pf: '0.98',
  freq: '50.0 Hz',
};

export const acb2 = {
  vll: '415 V',
  i: '1,707 A',
  pf: '0.98',
};

export type FeederStatus = 'Closed' | 'Open' | 'Trip';

export interface Feeder {
  id: string;
  name: string;
  status: FeederStatus;
  i: string;
  p: string;
  pf: string;
  icon: 'hvac' | 'lighting' | 'power' | 'lifts' | 'pump' | 'spare' | 'critical';
  selected?: boolean;
}

export const feeders: Feeder[] = [
  { id: 'FEEDER-1', name: 'HVAC', status: 'Closed', i: '320 A', p: '205 kW', pf: '0.96', icon: 'hvac' },
  { id: 'FEEDER-2', name: 'LIGHTING', status: 'Closed', i: '120 A', p: '55 kW', pf: '0.94', icon: 'lighting' },
  { id: 'FEEDER-3', name: 'POWER', status: 'Closed', i: '280 A', p: '185 kW', pf: '0.94', icon: 'power' },
  { id: 'FEEDER-4', name: 'LIFTS', status: 'Closed', i: '160 A', p: '110 kW', pf: '0.95', icon: 'lifts', selected: true },
  { id: 'FEEDER-5', name: 'PUMP ROOM', status: 'Closed', i: '180 A', p: '125 kW', pf: '0.95', icon: 'pump' },
  { id: 'FEEDER-6', name: 'SPARE', status: 'Open', i: '0 A', p: '0 kW', pf: '--', icon: 'spare' },
  { id: 'FEEDER-7', name: 'CRITICAL', status: 'Trip', i: '38 A', p: '18 kW', pf: '0.90', icon: 'critical' },
];

export const systemInformation = [
  { label: 'System Type', value: 'Main Distribution Board (MDB)' },
  { label: 'Manufacturer', value: 'Schneider Electric' },
  { label: 'Model', value: 'PrismaSeT P' },
  { label: 'Rated Voltage', value: '415 V, 50 Hz' },
  { label: 'Busbar Rating', value: '2500 A' },
  { label: 'Short Circuit Rating', value: '65 kA' },
  { label: 'Installation Date', value: '15 Feb 2024' },
  { label: 'Location', value: 'Electrical Room (First Floor)' },
];

export const selectedFeederDetails = [
  { label: 'Feeder ID', value: 'FEEDER-4' },
  { label: 'Feeder Name', value: 'LIFTS' },
  { label: 'Breaker ID', value: 'ACB-04' },
  { label: 'Breaker Rating', value: '400 A' },
  { label: 'Status', value: 'Closed', highlight: 'success' as const },
  { label: 'Load', value: '69% (110 kW)' },
  { label: 'Voltage (L-L)', value: '414 V' },
  { label: 'Current', value: '160 A' },
  { label: 'Power Factor', value: '0.95' },
  { label: 'Energy (Today)', value: '1,024 kWh' },
  { label: 'Connected To', value: 'Lift Panel LP-01' },
];

export const mdbActiveAlarm = {
  time: '10:21 AM',
  site: 'Alsamer C03JED',
  system: 'MDB',
  alarm: 'Feeder-7 Trip',
  priority: 'High' as const,
};

export const mdbAlarmOverview = [
  { label: 'Active Alarms', value: '1' },
];

export const voltageSummary = [
  { label: 'L1-L2', value: '414 V' },
  { label: 'L2-L3', value: '415 V' },
  { label: 'L3-L1', value: '413 V' },
  { label: 'L-N (Avg)', value: '239 V' },
];

export const currentSummary = [
  { label: 'L1', value: '1,725 A' },
  { label: 'L2', value: '1,707 A' },
  { label: 'L3', value: '1,698 A' },
  { label: 'Neutral', value: '48 A' },
];

export const powerSummary = [
  { label: 'Active Power', value: '1,224 kW' },
  { label: 'Apparent Power', value: '1,800 kVA' },
  { label: 'Reactive Power', value: '1,320 kVAr' },
  { label: 'Power Factor', value: '0.98' },
];

export const energySummary = [
  { label: 'Active Energy', value: '8,452 kWh' },
  { label: 'Reactive Energy', value: '6,105 kVArh' },
  { label: 'Apparent Energy', value: '10,285 kVAh' },
];

export const demandSummary = [
  { label: 'Max Demand', value: '1,310 kW' },
  { label: 'At', value: '09:15 AM' },
  { label: 'Load Factor', value: '0.78' },
];

export const quickActionsMdb = ['Open All Feeders', 'Close All Feeders', 'Reset Alarms', 'Sync Energy Meters', 'Export Report'];

export const sopNote =
  'BMS can monitor and control MDB breakers.\nEnsure all operations are performed as per\napproved SOP and safety procedures.';
