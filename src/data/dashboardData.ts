// Static mock data transcribed from BMS Graphics.v3.pdf, page 2 (Dashboard Overview).
// Values must not be "corrected" even where they look inconsistent - see project brief.

export const kpiCards = {
  overallHealth: { value: 94, label: 'Good' },
  activeAlarms: { value: 17, red: 5, orange: 9, yellow: 3 },
  totalSites: { value: 24, sub: 'Across 5 Cities' },
  totalSystems: { value: 326, sub: 'All Categories' },
  systemsNormal: { value: 286, pct: 87 },
  systemsAttention: { value: 37, pct: 11 },
  systemsOffline: { value: 3, pct: 0.9 },
};

export interface SystemHealthRow {
  category: string;
  normal: number;
  warning: number;
  alarm: number;
  offline: number;
  health: number;
}

export const systemHealthByCategory: SystemHealthRow[] = [
  { category: 'Electrical Systems', normal: 95, warning: 3, alarm: 1, offline: 0, health: 95 },
  { category: 'Mechanical Systems', normal: 88, warning: 5, alarm: 2, offline: 1, health: 91 },
  { category: 'Medical Equipment', normal: 97, warning: 1, alarm: 1, offline: 0, health: 96 },
  { category: 'Building Technology', normal: 92, warning: 4, alarm: 2, offline: 1, health: 92 },
  { category: 'IT Infrastructure', normal: 98, warning: 1, alarm: 0, offline: 0, health: 99 },
];

export interface ActiveAlarmRow {
  time: string;
  city: string;
  site: string;
  system: string;
  asset: string;
  alarm: string;
  priority: 'High' | 'Medium' | 'Low';
}

export const activeAlarms: ActiveAlarmRow[] = [
  {
    time: '10:21 AM',
    city: 'Jeddah',
    site: 'Alsamer Clinics C03JED',
    system: 'UPS',
    asset: 'UPS-01',
    alarm: 'Battery High Temperature',
    priority: 'High',
  },
  {
    time: '10:15 AM',
    city: 'Riyadh',
    site: 'Munisyah Clinics',
    system: 'HVAC / Split AC',
    asset: 'AC-TR03',
    alarm: 'Room Temperature High',
    priority: 'High',
  },
  {
    time: '09:58 AM',
    city: 'Dammam',
    site: 'Istishfa Clinics',
    system: 'Power MDB',
    asset: 'MDB-01 / Fdr-07',
    alarm: 'Feeder Overload',
    priority: 'Medium',
  },
  {
    time: '09:42 AM',
    city: 'Jeddah',
    site: 'Alsamer Clinics C03JED',
    system: 'Fridges TMS',
    asset: 'MR-01',
    alarm: 'Temperature High',
    priority: 'Medium',
  },
  {
    time: '09:33 AM',
    city: 'Makkah',
    site: 'Makkayah Clinics',
    system: 'CCTV System',
    asset: 'NVR-02',
    alarm: 'Storage Usage High',
    priority: 'Medium',
  },
];
export const activeAlarmsTotal = 17;

export interface SiteHealthRow {
  site: string;
  city: string;
  normal: number;
  warning: number;
  alarm: number;
  offline: number;
  health: number;
}

export const siteHealthOverview: SiteHealthRow[] = [
  { site: 'Alsamer Clinics C03JED', city: 'Jeddah', normal: 45, warning: 2, alarm: 1, offline: 0, health: 94 },
  { site: 'Munisyah Clinics', city: 'Riyadh', normal: 38, warning: 3, alarm: 0, offline: 1, health: 92 },
  { site: 'Istishfa Clinics', city: 'Dammam', normal: 41, warning: 1, alarm: 2, offline: 0, health: 90 },
  { site: 'Makkayah Clinics', city: 'Makkah', normal: 39, warning: 0, alarm: 0, offline: 0, health: 100 },
  { site: 'Jazan Clinics', city: 'Jazan', normal: 33, warning: 1, alarm: 1, offline: 0, health: 94 },
];

export const regionalHealth = [
  { city: 'Jeddah', pct: 96 },
  { city: 'Riyadh', pct: 93 },
  { city: 'Dammam', pct: 91 },
  { city: 'Makkah', pct: 98 },
  { city: 'Jazan', pct: 95 },
];

export interface AlarmTrendDay {
  date: string;
  high: number;
  medium: number;
  low: number;
  total: number;
}

// The PDF chart only renders two visually distinct fill colors per bar (red top / orange
// rest) - measured directly from the source pixels the red segment is a consistent ~42%
// of each bar's height. High/Medium below are derived from that measured ratio scaled to
// the PDF's printed total for each day (so each pair sums exactly to the visible total);
// there is no separate "Low" band actually drawn in the source, so it is kept at 0 here
// rather than invented, while the Low legend swatch is still rendered to match the PDF legend.
export const alarmTrend: AlarmTrendDay[] = [
  { date: '17 Feb', high: 15, medium: 20, low: 0, total: 35 },
  { date: '18 Feb', high: 12, medium: 17, low: 0, total: 29 },
  { date: '19 Feb', high: 9, medium: 13, low: 0, total: 22 },
  { date: '20 Feb', high: 7, medium: 11, low: 0, total: 18 },
  { date: '21 Feb', high: 10, medium: 14, low: 0, total: 24 },
  { date: '22 Feb', high: 7, medium: 9, low: 0, total: 16 },
  { date: '23 Feb', high: 8, medium: 9, low: 0, total: 17 },
];

export const systemAvailability = {
  available: 98.7,
  unavailable: 0.9,
  degraded: 0.3,
  maintenance: 0.1,
};

export interface MaintenanceRow {
  title: string;
  site: string;
  date: string;
  dueIn: string;
}

export const maintenanceDue: MaintenanceRow[] = [
  { title: 'HVAC Preventive Maintenance', site: 'Munisyah Clinics', date: '25 Feb 2026', dueIn: 'Due in 2 days' },
  { title: 'UPS Battery Test', site: 'Istishfa Clinics', date: '27 Feb 2026', dueIn: 'Due in 4 days' },
  { title: 'Generator Service', site: 'Makkayah Clinics', date: '01 Mar 2026', dueIn: 'Due in 6 days' },
  { title: 'TMS Calibration', site: 'Alsamer Clinics C03JED', date: '05 Mar 2026', dueIn: 'Due in 10 days' },
];

export interface QuickAction {
  title: string;
  subtitle: string;
  icon: 'bell' | 'grid' | 'building' | 'trend' | 'report' | 'maintenance' | 'settings';
}

export const quickActions: QuickAction[] = [
  { title: 'All Alarms', subtitle: 'View All Active Alarms', icon: 'bell' },
  { title: 'System Summary', subtitle: 'View All Systems Status', icon: 'grid' },
  { title: 'Site Overview', subtitle: 'View All Sites Status', icon: 'building' },
  { title: 'Trend Analysis', subtitle: 'View Trends & Reports', icon: 'trend' },
  { title: 'Reports', subtitle: 'Generate Reports', icon: 'report' },
  { title: 'Maintenance', subtitle: 'Maintenance Schedule', icon: 'maintenance' },
  { title: 'Settings', subtitle: 'Dashboard Settings', icon: 'settings' },
];

export const lastUpdated = '10:25 AM';
