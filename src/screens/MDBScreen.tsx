import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Maximize2, ChevronDown, LockOpen, Lock, BellOff, RefreshCw as RefreshCwIcon, FileDown, CircleX } from 'lucide-react-native';
import { AppShell } from '../components/AppShell';
import { SectionCard } from '../components/SectionCard';
import { InfoRow } from '../components/InfoRow';
import { Gauge } from '../components/Gauge';
import { MDBDiagram } from '../components/MDBDiagram';
import { AlarmTable } from '../components/AlarmTable';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useScreenNavigate } from '../navigation/useScreenNavigate';
import {
  mdbStatus,
  totalActiveLoad,
  mdbMetricCards,
  mdbLiveMetrics,
  feeders,
  systemInformation,
  selectedFeederDetails,
  mdbActiveAlarm,
  mdbAlarmOverview,
  voltageSummary,
  currentSummary,
  powerSummary,
  energySummary,
  demandSummary,
  quickActionsMdb,
  sopNote,
} from '../data/mdbData';

export function MDBScreen() {
  const navigate = useScreenNavigate();

  return (
    <AppShell active="mdb" onNavigate={navigate}>
      <View style={styles.threeCol}>
        {/* LEFT */}
        <View style={styles.leftCol}>
          <SectionCard compact bare title="MDB STATUS">
            <InfoRow compact label="MDB Overall Status" value={mdbStatus.overall} dotKind="success" />
            <InfoRow compact label="Incoming Supply" value={mdbStatus.incomingSupply} dotKind="success" />
            <InfoRow compact label="Busbar Status" value={mdbStatus.busbar} dotKind="success" />
            <InfoRow compact label="Total Active Load" value={`${mdbStatus.totalActiveLoadPct}%`} />
            <InfoRow compact label="Power Quality" value={mdbStatus.powerQuality} dotKind="success" />
            <InfoRow compact label="System Alarms" value={`${mdbStatus.systemAlarms}`} valueColor={colors.danger} bold />
          </SectionCard>

          <SectionCard compact bare title="TOTAL ACTIVE LOAD" contentStyle={{ alignItems: 'center' }}>
            <Gauge pct={totalActiveLoad.pct} color={colors.gaugeTeal} />
            <Text style={[typography.caption, { marginTop: 4 }]}>{totalActiveLoad.sub}</Text>
          </SectionCard>

          <SectionCard compact bare title="TOTAL APPARENT POWER">
            <Text style={typography.metricMedium}>{mdbMetricCards.apparentPower}</Text>
          </SectionCard>

          <SectionCard compact bare title="TOTAL ACTIVE ENERGY TODAY">
            <Text style={typography.metricMedium}>{mdbMetricCards.activeEnergyToday}</Text>
          </SectionCard>

          <SectionCard compact bare title="POWER QUALITY">
            <Text style={[typography.bodyStrong, { color: colors.success, fontSize: 11 }]}>
              {mdbMetricCards.powerQuality.status}
            </Text>
            <Text style={typography.caption}>
              THD: {mdbMetricCards.powerQuality.thd} | PF: {mdbMetricCards.powerQuality.pf}
            </Text>
          </SectionCard>

          <SectionCard
            compact
            bare
            title="MDB LIVE METRICS"
          >
            {mdbLiveMetrics.map((metric) => (
              <InfoRow compact key={metric.label} label={metric.label} value={metric.value} />
            ))}
          </SectionCard>
        </View>

        {/* CENTER */}
        <View style={styles.centerCol}>
          <SectionCard
            compact
            title="MDB SINGLE LINE DIAGRAM"
            showInfoIcon
            right={
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={[typography.caption, { color: colors.textInverse, opacity: 0.85 }]}>View:</Text>
                  <Text style={[typography.bodyStrong, { color: colors.textInverse, fontSize: 11 }]}>Single Line</Text>
                  <ChevronDown size={13} color={colors.textInverse} />
                </View>
                <Maximize2 size={14} color={colors.textInverse} />
              </View>
            }
            contentStyle={{ padding: 9 }}
          >
            <MDBDiagram feeders={feeders} />
          </SectionCard>
          <SectionCard compact bare title="LIVE POWER FLOW" style={styles.centerDataCard}>
            {powerSummary.map((metric) => (
              <InfoRow compact key={metric.label} label={metric.label} value={metric.value} />
            ))}
            <InfoRow compact label="Energy Today" value={energySummary[0].value} />
          </SectionCard>
        </View>

        {/* RIGHT */}
        <View style={styles.rightCol}>
          <SectionCard compact bare title="SYSTEM INFORMATION" showInfoIcon>
            {systemInformation.map((r) => (
              <InfoRow compact key={r.label} label={r.label} value={r.value} />
            ))}
          </SectionCard>

          <SectionCard compact bare title="SELECTED FEEDER DETAILS" right={<CircleX size={14} color={colors.textMuted} />}>
            {selectedFeederDetails.map((r) => (
              <InfoRow
                compact
                key={r.label}
                label={r.label}
                value={r.value}
                valueColor={r.highlight === 'success' ? colors.success : undefined}
                bold={r.highlight === 'success'}
              />
            ))}
          </SectionCard>

          <SectionCard
            compact
            bare
            title="ACTIVE ALARMS (1)"
            style={{ flex: 1 }}
            contentStyle={{ flex: 1 }}
          >
            <AlarmTable
              columns={[
                { key: 'time', label: 'Time', flex: 0.8 },
                { key: 'site', label: 'Site', flex: 1 },
                { key: 'system', label: 'System', flex: 0.8 },
                { key: 'alarm', label: 'Alarm', flex: 1.1 },
                { key: 'priority', label: 'Priority', flex: 0.7 },
              ]}
              rows={[
                {
                  time: mdbActiveAlarm.time,
                  site: mdbActiveAlarm.site,
                  system: mdbActiveAlarm.system,
                  alarm: mdbActiveAlarm.alarm,
                  priority: mdbActiveAlarm.priority,
                },
              ]}
            />
            <View style={styles.alarmOverview}>
              {mdbAlarmOverview.map((metric) => (
                <InfoRow compact key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </View>
            <View style={styles.viewAllBtn}>
              <Text style={[typography.bodyStrong, { color: colors.primary, fontSize: 11 }]}>VIEW ALL ALARMS</Text>
            </View>
          </SectionCard>
        </View>
      </View>

      {/* Bottom summary row */}
      <View style={styles.summaryRow}>
        <SummaryCard title="VOLTAGE SUMMARY (AVG)" rows={voltageSummary} />
        <SummaryCard title="CURRENT SUMMARY (TOTAL)" rows={currentSummary} />
        <SummaryCard title="POWER SUMMARY (TOTAL)" rows={powerSummary} />
        <SummaryCard title="ENERGY SUMMARY (TODAY)" rows={energySummary} />
        <SummaryCard title="DEMAND SUMMARY" rows={demandSummary} />
      </View>

      {/* Quick actions + SOP note */}
      <View style={styles.quickRow}>
        <SectionCard compact bare title="QUICK ACTIONS (BMS CONTROL)" style={{ flex: 1 }} contentStyle={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <QuickBtn icon={<LockOpen size={15} color={colors.success} />} label="Open All Feeders" />
          <QuickBtn icon={<Lock size={15} color={colors.danger} />} label="Close All Feeders" />
          <QuickBtn icon={<BellOff size={15} color={colors.warning} />} label="Reset Alarms" />
          <QuickBtn icon={<RefreshCwIcon size={15} color={colors.info} />} label="Sync Energy Meters" />
          <QuickBtn icon={<FileDown size={15} color={colors.textSecondary} />} label="Export Report" />
        </SectionCard>
        <View style={styles.sopBox}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>{sopNote}</Text>
        </View>
      </View>
    </AppShell>
  );
}

function SummaryCard({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <SectionCard compact bare title={title} style={{ flex: 1, minWidth: 0 }}>
      {rows.map((r) => (
        <InfoRow compact key={r.label} label={r.label} value={r.value} />
      ))}
    </SectionCard>
  );
}

function QuickBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={styles.quickBtn}>
      {icon}
      <Text style={[typography.bodyStrong, { fontSize: 11 }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  threeCol: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'stretch',
  },
  leftCol: {
    width: 236,
    gap: 4,
  },
  centerCol: {
    flex: 1,
    minWidth: 0,
  },
  rightCol: {
    width: 280,
    gap: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'nowrap',
    width: '100%',
  },
  centerDataCard: {
    width: '100%',
    alignSelf: 'stretch',
    marginTop: 5,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 5,
  },
  sopBox: {
    width: 260,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    justifyContent: 'center',
  },
  quickBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 9,
    alignItems: 'center',
    gap: 5,
    flex: 1,
    minWidth: 100,
  },
  viewAllBtn: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  alarmOverview: {
    marginTop: 8,
  },
});
