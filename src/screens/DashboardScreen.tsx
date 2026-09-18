import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import {
  RefreshCw,
  Activity,
  Bell,
  Building,
  Database,
  CircleCheckBig,
  TriangleAlert,
  Power,
  Zap,
  Settings,
  SquarePlus,
  DoorClosed,
  Server,
  Wrench,
  LayoutGrid,
  TrendingUp,
  FileText,
  ClipboardList,
} from 'lucide-react-native';
import { AppShell } from '../components/AppShell';
import { SectionCard, CardHeaderButton } from '../components/SectionCard';
import { MetricCard } from '../components/MetricCard';
import { DataTable, Column } from '../components/DataTable';
import { AlarmTable } from '../components/AlarmTable';
import { DonutChart } from '../components/DonutChart';
import { QuickActionButton } from '../components/QuickActionButton';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useScreenNavigate } from '../navigation/useScreenNavigate';
import {
  kpiCards,
  systemHealthByCategory,
  SystemHealthRow,
  activeAlarms,
  activeAlarmsTotal,
  siteHealthOverview,
  SiteHealthRow,
  regionalHealth,
  alarmTrend,
  systemAvailability,
  maintenanceDue,
  quickActions,
  lastUpdated,
} from '../data/dashboardData';

const CATEGORY_ICON: Record<string, { icon: React.ComponentType<any>; color: string }> = {
  'Electrical Systems': { icon: Zap, color: colors.sectionElectrical },
  'Mechanical Systems': { icon: Settings, color: colors.sectionMechanical },
  'Medical Equipment': { icon: SquarePlus, color: colors.sectionMedical },
  'Building Technology': { icon: DoorClosed, color: colors.sectionBuildingTech },
  'IT Infrastructure': { icon: Server, color: colors.sectionITInfra },
};

const QUICK_ACTION_ICON: Record<string, React.ComponentType<any>> = {
  bell: Bell,
  grid: LayoutGrid,
  building: Building,
  trend: TrendingUp,
  report: FileText,
  maintenance: ClipboardList,
  settings: Settings,
};

function healthColor(pct: number) {
  if (pct >= 95) return colors.success;
  if (pct >= 90) return colors.warning;
  return colors.danger;
}

export function DashboardScreen() {
  const navigate = useScreenNavigate();

  const healthColumns: Column<SystemHealthRow>[] = [
    {
      key: 'category',
      label: '',
      flex: 2.2,
      render: (r) => {
        const meta = CATEGORY_ICON[r.category];
        const Icon = meta.icon;
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <Icon size={13} color={meta.color} />
            <Text style={[typography.bodyStrong, { fontSize: 10.5, flexShrink: 1 }]} numberOfLines={1}>
              {r.category}
            </Text>
          </View>
        );
      },
    },
    { key: 'normal', label: 'Normal', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.success, textAlign: 'center' }]}>{r.normal}</Text> },
    { key: 'warning', label: 'Warning', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.warning, textAlign: 'center' }]}>{r.warning}</Text> },
    { key: 'alarm', label: 'Alarm', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.danger, textAlign: 'center' }]}>{r.alarm}</Text> },
    { key: 'offline', label: 'Offline', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.disabled, textAlign: 'center' }]}>{r.offline}</Text> },
    { key: 'health', label: 'Health', align: 'right', render: (r) => <Text style={[typography.bodyStrong, { color: healthColor(r.health), fontSize: 10.5 }]}>{r.health}%</Text> },
  ];

  const siteColumns: Column<SiteHealthRow>[] = [
    { key: 'site', label: 'Site', flex: 1.8, render: (r) => <Text style={[typography.bodyStrong, { color: colors.primary, fontSize: 10 }]} numberOfLines={1}>{r.site}</Text> },
    { key: 'city', label: 'City', flex: 1.1, render: (r) => <Text style={typography.tableCell}>{r.city}</Text> },
    { key: 'normal', label: 'Normal', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.success, textAlign: 'center' }]}>{r.normal}</Text> },
    { key: 'warning', label: 'Warning', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.warning, textAlign: 'center' }]}>{r.warning}</Text> },
    { key: 'alarm', label: 'Alarm', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.danger, textAlign: 'center' }]}>{r.alarm}</Text> },
    { key: 'offline', label: 'Offline', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.disabled, textAlign: 'center' }]}>{r.offline}</Text> },
    { key: 'health', label: 'Health', align: 'right', render: (r) => <Text style={[typography.bodyStrong, { color: healthColor(r.health), fontSize: 10.5 }]}>{r.health}%</Text> },
  ];

  const alarmRows = activeAlarms.map((a) => ({
    time: a.time,
    city: a.city,
    site: a.site,
    system: a.system,
    asset: a.asset,
    alarm: a.alarm,
    priority: a.priority,
  }));

  const maxTrend = Math.max(...alarmTrend.map((d) => d.total));
  const chartW = 260;
  const chartH = 115;
  const barW = 18;
  const gap = (chartW - barW * alarmTrend.length) / (alarmTrend.length + 1);

  return (
    <AppShell active="dashboard" onNavigate={navigate}>
      {/* Content header */}
      <View style={styles.pageHeaderRow}>
        <Text style={typography.pageTitle}>DASHBOARD OVERVIEW</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={typography.caption}>Last Updated: {lastUpdated}</Text>
          <RefreshCw size={18} color={colors.primary} />
        </View>
      </View>

      {/* KPI row */}
      <View style={styles.kpiRow}>
        <MetricCard
          style={{ flex: 1, minWidth: 155 }}
          icon={<Activity size={18} color={colors.primary} />}
          iconBg={colors.primaryLight}
          label="OVERALL BMS HEALTH"
          value={`${kpiCards.overallHealth.value}%`}
          sub={<Text style={[typography.bodyStrong, { color: colors.success, fontSize: 10.5 }]}>{kpiCards.overallHealth.label}</Text>}
        />
        <MetricCard
          style={{ flex: 1, minWidth: 155 }}
          icon={<Bell size={18} color={colors.danger} />}
          iconBg={colors.dangerBg}
          label="ACTIVE ALARMS"
          value={`${kpiCards.activeAlarms.value}`}
          sub={
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 2 }}>
              <View style={styles.dotRow}><View style={[styles.smallDot, { backgroundColor: colors.danger }]} /><Text style={typography.caption}>{kpiCards.activeAlarms.red}</Text></View>
              <View style={styles.dotRow}><View style={[styles.smallDot, { backgroundColor: colors.warning }]} /><Text style={typography.caption}>{kpiCards.activeAlarms.orange}</Text></View>
              <View style={styles.dotRow}><View style={[styles.smallDot, { backgroundColor: colors.warningLight }]} /><Text style={typography.caption}>{kpiCards.activeAlarms.yellow}</Text></View>
            </View>
          }
        />
        <MetricCard
          style={{ flex: 1, minWidth: 155 }}
          icon={<Building size={18} color={colors.info} />}
          iconBg={colors.infoBg}
          label="TOTAL SITES MONITORED"
          value={`${kpiCards.totalSites.value}`}
          sub={<Text style={typography.caption}>{kpiCards.totalSites.sub}</Text>}
        />
        <MetricCard
          style={{ flex: 1, minWidth: 155 }}
          icon={<Database size={18} color={colors.sectionMedical} />}
          iconBg={'#EFE9F6'}
          label="TOTAL SYSTEMS"
          value={`${kpiCards.totalSystems.value}`}
          sub={<Text style={typography.caption}>{kpiCards.totalSystems.sub}</Text>}
        />
        <MetricCard
          style={{ flex: 1, minWidth: 155 }}
          icon={<CircleCheckBig size={18} color={colors.success} />}
          iconBg={colors.successBg}
          label="SYSTEMS NORMAL"
          value={`${kpiCards.systemsNormal.value}`}
          sub={<Text style={typography.caption}>{kpiCards.systemsNormal.pct}%</Text>}
        />
        <MetricCard
          style={{ flex: 1, minWidth: 155 }}
          icon={<TriangleAlert size={18} color={colors.warning} />}
          iconBg={colors.warningBg}
          label="SYSTEMS ATTENTION"
          value={`${kpiCards.systemsAttention.value}`}
          sub={<Text style={typography.caption}>{kpiCards.systemsAttention.pct}%</Text>}
        />
        <MetricCard
          style={{ flex: 1, minWidth: 155 }}
          icon={<Power size={18} color={colors.disabled} />}
          iconBg={colors.disabledBg}
          label="SYSTEMS OFFLINE"
          value={`${kpiCards.systemsOffline.value}`}
          sub={<Text style={typography.caption}>{kpiCards.systemsOffline.pct}%</Text>}
        />
      </View>

      {/* Health / Alarms / Sites row */}
      <View style={styles.threeColRow}>
        <SectionCard
          bare
          title="SYSTEM HEALTH BY CATEGORY"
          style={{ flex: 1, minWidth: 260 }}
          contentStyle={{ flex: 1, justifyContent: 'space-between' }}
        >
          <DataTable columns={healthColumns} data={systemHealthByCategory} keyExtractor={(r) => r.category} />
          <CardHeaderButton label="View All Systems" />
        </SectionCard>

        <SectionCard
          bare
          title={`ACTIVE ALARMS (${activeAlarmsTotal})`}
          titleColor={colors.danger}
          right={<CardHeaderButton label="View All Alarms" />}
          style={{ flex: 1.25, minWidth: 300 }}
        >
          <AlarmTable
            columns={[
              { key: 'time', label: 'Time', width: 50 },
              { key: 'city', label: 'City', width: 48 },
              { key: 'site', label: 'Site', width: 90 },
              { key: 'system', label: 'System', width: 74 },
              { key: 'asset', label: 'Asset / Point', width: 74 },
              { key: 'alarm', label: 'Alarm', width: 106 },
              { key: 'priority', label: 'Priority', width: 48 },
            ]}
            rows={alarmRows as any}
            minContentWidth={500}
          />
        </SectionCard>

        <SectionCard bare title="SITE HEALTH OVERVIEW" right={<CardHeaderButton label="View All Sites" />} style={{ flex: 1.1, minWidth: 300 }}>
          <DataTable columns={siteColumns} data={siteHealthOverview} keyExtractor={(r) => r.site} />
        </SectionCard>
      </View>

      {/* Regional health / trend / availability / maintenance row */}
      <View style={styles.fourColRow}>
        <SectionCard bare title="REGIONAL / CITY HEALTH" style={{ flex: 1, minWidth: 190 }} contentStyle={{ flex: 1 }}>
          <Text style={[typography.caption, { alignSelf: 'flex-end', marginBottom: 2 }]}>Health %</Text>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            {regionalHealth.map((r) => (
              <View key={r.city}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={typography.tableCell}>{r.city}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${r.pct}%` }]} />
                  <Text style={styles.barLabel}>{r.pct}%</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.axisRow}>
            <Text style={typography.caption}>0%</Text>
            <Text style={typography.caption}>50%</Text>
            <Text style={typography.caption}>100%</Text>
          </View>
        </SectionCard>

        <SectionCard
          bare
          title="ALARM TREND (LAST 7 DAYS)"
          style={{ flex: 1, minWidth: 230 }}
          contentStyle={{ flex: 1, justifyContent: 'center' }}
        >
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
            <LegendChip color={colors.chartHigh} label="High" />
            <LegendChip color={colors.chartMedium} label="Medium" />
            <LegendChip color={colors.chartLow} label="Low" />
          </View>
          <Svg width={chartW} height={chartH + 18}>
            {alarmTrend.map((d, i) => {
              const x = gap + i * (barW + gap);
              const highH = (d.high / maxTrend) * chartH;
              const medH = (d.medium / maxTrend) * chartH;
              const lowH = (d.low / maxTrend) * chartH;
              const baseY = chartH;
              return (
                <React.Fragment key={d.date}>
                  <SvgText x={x + barW / 2} y={baseY - (highH + medH + lowH) - 4} fontSize={9.5} fontWeight="bold" fill={colors.textPrimary} textAnchor="middle">
                    {d.total}
                  </SvgText>
                  <Rect x={x} y={baseY - highH - medH - lowH} width={barW} height={lowH} fill={colors.chartLow} rx={2} />
                  <Rect x={x} y={baseY - highH - medH} width={barW} height={medH} fill={colors.chartMedium} />
                  <Rect x={x} y={baseY - highH} width={barW} height={highH} fill={colors.chartHigh} rx={2} />
                  <SvgText x={x + barW / 2} y={chartH + 12} fontSize={8.5} fill={colors.textSecondary} textAnchor="middle">
                    {d.date}
                  </SvgText>
                </React.Fragment>
              );
            })}
            <Line x1={0} y1={chartH} x2={chartW} y2={chartH} stroke={colors.border} strokeWidth={1} />
          </Svg>
        </SectionCard>

        <SectionCard
          bare
          title="SYSTEM AVAILABILITY"
          style={{ flex: 1, minWidth: 175, alignItems: 'center' }}
          contentStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <DonutChart
            size={125}
            strokeWidth={16}
            segments={[
              { pct: systemAvailability.available, color: colors.chartAvailable },
              { pct: systemAvailability.unavailable, color: colors.chartUnavailable },
              { pct: systemAvailability.degraded, color: colors.chartDegraded },
              { pct: systemAvailability.maintenance, color: colors.chartMaintenance },
            ]}
            centerValue={`${systemAvailability.available}%`}
            centerLabel="Availability"
          />
          <View style={{ marginTop: 6, width: '100%', gap: 3 }}>
            <LegendRow color={colors.chartAvailable} label="Available" value={`${systemAvailability.available}%`} />
            <LegendRow color={colors.chartUnavailable} label="Unavailable" value={`${systemAvailability.unavailable}%`} />
            <LegendRow color={colors.chartDegraded} label="Degraded" value={`${systemAvailability.degraded}%`} />
            <LegendRow color={colors.chartMaintenance} label="Maintenance" value={`${systemAvailability.maintenance}%`} />
          </View>
        </SectionCard>

        <SectionCard
          bare
          title="MAINTENANCE DUE"
          right={<CardHeaderButton label="View All" />}
          style={{ flex: 1.1, minWidth: 230 }}
          contentStyle={{ flex: 1, justifyContent: 'space-between' }}
        >
          {maintenanceDue.map((m) => (
            <View key={m.title} style={styles.maintRow}>
              <View style={styles.maintIcon}>
                <Wrench size={10.5} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={typography.bodyStrong} numberOfLines={1}>{m.title}</Text>
                <Text style={typography.caption} numberOfLines={1}>{m.site}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={typography.caption}>{m.date}</Text>
                <Text style={[typography.caption, { color: colors.warning, fontFamily: 'Inter_600SemiBold' }]}>{m.dueIn}</Text>
              </View>
            </View>
          ))}
        </SectionCard>
      </View>

      {/* Quick actions */}
      <SectionCard bare title="QUICK ACTIONS" style={{ width: '100%' }} contentStyle={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
        {quickActions.map((qa) => {
          const Icon = QUICK_ACTION_ICON[qa.icon];
          return <QuickActionButton key={qa.title} icon={<Icon size={13} color={colors.primary} />} title={qa.title} subtitle={qa.subtitle} style={{ minWidth: 128 }} />;
        })}
      </SectionCard>
    </AppShell>
  );
}

function LegendChip({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={{ width: 9, height: 9, borderRadius: 2, backgroundColor: color }} />
      <Text style={typography.caption}>{label}</Text>
    </View>
  );
}

function LegendRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <View style={{ width: 9, height: 9, borderRadius: 2, backgroundColor: color }} />
        <Text style={typography.body}>{label}</Text>
      </View>
      <Text style={typography.bodyStrong}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  threeColRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'stretch',
    flexWrap: 'wrap',
    flex: 1.3,
  },
  fourColRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'stretch',
    flexWrap: 'wrap',
    flex: 1,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  smallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  barTrack: {
    height: 11,
    backgroundColor: colors.disabledBg,
    borderRadius: 3,
    justifyContent: 'center',
    marginTop: 2,
  },
  barFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  barLabel: {
    position: 'absolute',
    right: 4,
    fontSize: 8,
    color: colors.textPrimary,
    fontFamily: 'Inter_600SemiBold',
  },
  axisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  maintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  maintIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
