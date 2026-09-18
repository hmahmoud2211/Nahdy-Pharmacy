// Static mock data transcribed from BMS Graphics.v3.pdf, page 4 (Building UPS / UPS System Overview).

export const upsStatus = [
  { label: 'UPS Status', value: 'Online' },
  { label: 'Operating Mode', value: 'Normal Mode' },
  { label: 'Bypass Status', value: 'Normal' },
  { label: 'Battery Status', value: 'Normal' },
  { label: 'Rectifier Status', value: 'Normal' },
  { label: 'Inverter Status', value: 'Normal' },
];
export const systemTemperature = '24.5 °C';

export const loadMetric = { pct: 45, sub: '135 kW / 300 kVA' };
export const batteryMetric = { pct: 100, sub: '540 VDC' };
export const runtimeMetric = { value: '45 MIN', sub: 'AT CURRENT LOAD' };
export const outputStatusMetric = { value: 'NORMAL', sub: '230/400 VAC' };

export const utilitySupply = {
  l1l2: '399 V',
  l2l3: '400 V',
  l3l1: '398 V',
  freq: '50.0 Hz',
};

export const inputBreakerStatus = 'CLOSED';
export const dcBus = '540 VDC';
export const outputBreakerStatus = 'CLOSED';
export const batteryBank = { pct: 100, vdc: '540 VDC' };

export const criticalLoad = {
  l1l2: '399 V',
  l2l3: '400 V',
  l3l1: '398 V',
  freq: '50.0 Hz',
  load: '135 kW',
  pf: '0.98',
};

export const upsInformation = [
  { label: 'UPS Manufacturer', value: 'Siemens' },
  { label: 'UPS Model', value: 'SITOP Modular' },
  { label: 'UPS Capacity', value: '200 kVA' },
  { label: 'Serial Number', value: 'UPS-01-2024-001' },
  { label: 'Firmware Version', value: 'V2.3.1' },
  { label: 'Installation Date', value: '15 Feb 2024' },
];

export interface UpsAlarmRow {
  time: string;
  alarm: string;
  priority: 'High' | 'Medium';
}

export const upsActiveAlarms: UpsAlarmRow[] = [
  { time: '10:18:45', alarm: 'Battery High Temperature', priority: 'High' },
  { time: '10:17:12', alarm: 'UPS Overload Warning', priority: 'Medium' },
  { time: '10:15:03', alarm: 'Bypass Input Abnormal', priority: 'Medium' },
];

export const inputDetails = [
  { label: 'Phase Voltage (L1)', value: '230 V' },
  { label: 'Phase Voltage (L2)', value: '231 V' },
  { label: 'Phase Voltage (L3)', value: '230 V' },
  { label: 'Line Frequency', value: '50.0 Hz' },
  { label: 'Input Power', value: '142 kW' },
  { label: 'Input Power Factor', value: '0.99' },
];

export const batteryDetails = [
  { label: 'Battery Voltage', value: '540 VDC' },
  { label: 'Battery Current', value: '12 A' },
  { label: 'Battery Capacity', value: '100 %' },
  { label: 'Temperature', value: '25 °C' },
  { label: 'Charger Status', value: 'Float' },
  { label: 'Health Status', value: 'Good' },
];

export const outputDetails = [
  { label: 'Output Voltage (L1)', value: '230 V' },
  { label: 'Output Voltage (L2)', value: '230 V' },
  { label: 'Output Voltage (L3)', value: '230 V' },
  { label: 'Output Frequency', value: '50.0 Hz' },
  { label: 'Output Power', value: '135 kW' },
  { label: 'Output Power Factor', value: '0.98' },
];

// The PDF leaves "UPS Room Humidity" with no value shown - kept blank intentionally, not invented.
export const environment = {
  roomTemp: '24.5 °C',
  roomHumidity: '',
  status: 'Normal',
};

export const quickActionsUps = ['Test on Battery', 'Alarm Silence', 'Reset Fault', 'More Actions'];

export const sopNoteUps = 'Ensure all operations are performed as per\napproved SOP and safety procedures.';
