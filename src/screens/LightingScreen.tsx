import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  TriangleAlert,
  CircleCheckBig,
  Zap,
  PanelsTopLeft,
  Lightbulb,
  ArrowLeftRight,
  ShieldCheck,
} from 'lucide-react-native';
import { AppShell } from '../components/AppShell';
import { SectionCard } from '../components/SectionCard';
import { InfoRow } from '../components/InfoRow';
import { LightBulb } from '../components/LightBulb';
import { PowerPathNode } from '../components/PowerPathNode';
import { DataTable, Column } from '../components/DataTable';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useScreenNavigate } from '../navigation/useScreenNavigate';
import {
  lightingPanel,
  bulb,
  systemInformationLighting,
  normalLightingPath,
  normalLightingNote,
  emergencyPowerPath,
  emergencyLightingAvailable,
  emergencyNote,
  panelSummary,
  panelSummaryTotal,
  PanelSummaryRow,
  lightingAsOf,
} from '../data/lightingData';

export function LightingScreen() {
  const navigate = useScreenNavigate();

  const panelColumns: Column<PanelSummaryRow>[] = [
    { key: 'panel', label: 'Panel', flex: 1.1, render: (r) => <Text style={typography.bodyStrong}>{r.panel}</Text> },
    { key: 'location', label: 'Location', flex: 1.1, render: (r) => <Text style={typography.tableCell}>{r.location}</Text> },
    { key: 'circuits', label: 'Circuits', align: 'center', render: (r) => <Text style={[typography.tableCell, { textAlign: 'center' }]}>{r.circuits}</Text> },
    { key: 'on', label: 'Circuits ON', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.success, textAlign: 'center' }]}>{r.circuitsOn}</Text> },
    { key: 'off', label: 'Circuits OFF', align: 'center', render: (r) => <Text style={[typography.tableCell, { color: colors.textMuted, textAlign: 'center' }]}>{r.circuitsOff}</Text> },
    { key: 'load', label: 'Load (kW)', align: 'center', render: (r) => <Text style={[typography.tableCell, { textAlign: 'center' }]}>{r.loadKw.toFixed(1)}</Text> },
    {
      key: 'status',
      label: 'Status',
      align: 'right',
      render: (r) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.success }} />
          <Text style={[typography.tableCell, { color: colors.success }]}>{r.status}</Text>
        </View>
      ),
    },
  ];

  return (
    <AppShell active="lighting" onNavigate={navigate}>
      <View style={styles.pageHeaderRow}>
        <Text style={typography.pageTitle}>FLOOR 01 – LIGHTING STATUS</Text>
        <Text style={typography.caption}>(AT {lightingAsOf})</Text>
      </View>

      <View style={styles.threeCol}>
        {/* LEFT: Lighting Panel */}
        <View style={styles.leftCol}>
          <SectionCard bare title="LIGHTING PANEL (LP-01)">
            <View style={styles.panelRow}>
              <View style={styles.panelIcon}>
                <PanelsTopLeft size={22} color={colors.textSecondary} />
                <TriangleAlert size={11} color={colors.warning} style={{ position: 'absolute', bottom: -2, right: -2 }} />
              </View>
              <View style={{ flex: 1 }}>
                <InfoRow label="Main Breaker" value={lightingPanel.mainBreaker.value} dotKind="disabled" />
                <Text style={[typography.caption, { textAlign: 'right', marginTop: -4 }]}>{lightingPanel.mainBreaker.sub}</Text>
              </View>
            </View>
            <InfoRow label="Dimming Level (Floor)" value={lightingPanel.dimmingLevelFloor} />
            <InfoRow label="BMS Control" value={lightingPanel.bmsControl} dotKind="success" />
            <InfoRow label="Schedule" value={lightingPanel.schedule} dotKind="success" />
            <InfoRow label="Next ON" value={lightingPanel.nextOn} />
            <View style={styles.faultsRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <TriangleAlert size={13} color={colors.warning} />
                <Text style={typography.bodyStrong}>Faults / Alarms</Text>
              </View>
              <Text style={typography.bodyStrong}>{lightingPanel.faults}</Text>
            </View>
          </SectionCard>
        </View>

        {/* CENTER: Bulb visualization */}
        <View style={styles.centerCol}>
          <View style={styles.bulbRow}>
            <LightBulb />
            <View style={styles.bulbAnnotations}>
              <View style={[styles.annotation, { top: 30 }]}>
                <View style={styles.annotationDot} />
                <View>
                  <Text style={[typography.bodyStrong, { fontSize: 11 }]}>{bulb.normal.annotation}</Text>
                  <Text style={typography.caption}>{bulb.normal.sub}</Text>
                </View>
              </View>
              <View style={[styles.annotation, { top: 150 }]}>
                <View style={[styles.annotationDot, { backgroundColor: colors.info }]} />
                <View>
                  <Text style={[typography.bodyStrong, { fontSize: 11 }]}>{bulb.emergency.annotation}</Text>
                  <Text style={typography.caption}>{bulb.emergency.sub}</Text>
                  <Text style={typography.caption}>{bulb.emergency.subDetail}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* RIGHT: System Information + Active Alarms */}
        <View style={styles.rightCol}>
          <SectionCard bare title="SYSTEM INFORMATION" showInfoIcon>
            {systemInformationLighting.map((r) => (
              <InfoRow key={r.label} label={r.label} value={r.value} />
            ))}
          </SectionCard>

          <SectionCard bare title="ACTIVE ALARMS (0)" right={<Text style={[typography.bodyStrong, { color: colors.primary, fontSize: 11 }]}>View All</Text>}>
            <View style={styles.alarmHeaderRow}>
              <Text style={[typography.tableHeader, { flex: 1 }]}>Time</Text>
              <Text style={[typography.tableHeader, { flex: 1.3 }]}>Zones / Circuit</Text>
              <Text style={[typography.tableHeader, { flex: 1 }]}>Alarm</Text>
              <Text style={[typography.tableHeader, { flex: 0.8 }]}>Priority</Text>
            </View>
            <View style={styles.emptyState}>
              <CircleCheckBig size={38} color={colors.success} />
              <Text style={[typography.bodyStrong, { marginTop: 8 }]}>No Active Alarms</Text>
            </View>
          </SectionCard>
        </View>
      </View>

      {/* Normal Lighting Power Path */}
      <SectionCard bare title="NORMAL LIGHTING POWER PATH" showInfoIcon>
        <View style={styles.pathRow}>
          <PowerPathNode icon={<Zap size={16} color={colors.primary} />} title={normalLightingPath[0].title} sub={normalLightingPath[0].sub} status={normalLightingPath[0].status} />
          <PowerPathNode icon={<PanelsTopLeft size={16} color={colors.textSecondary} />} title={normalLightingPath[1].title} sub={normalLightingPath[1].sub} status={normalLightingPath[1].status} />
          <PowerPathNode icon={<Lightbulb size={16} color={colors.textSecondary} />} title={normalLightingPath[2].title} sub={normalLightingPath[2].sub} status={normalLightingPath[2].status} last wide />
        </View>
        <View style={styles.noteBox}>
          <Text style={typography.caption}>{normalLightingNote}</Text>
        </View>
      </SectionCard>

      {/* Emergency Power Path */}
      <SectionCard bare title="EMERGENCY POWER PATH">
        <View style={styles.pathRow}>
          <PowerPathNode icon={<Zap size={16} color={colors.success} />} title={emergencyPowerPath[0].title} sub={emergencyPowerPath[0].sub} status={emergencyPowerPath[0].status} />
          <PowerPathNode icon={<ArrowLeftRight size={16} color={colors.success} />} title={emergencyPowerPath[1].title} sub={emergencyPowerPath[1].sub} status={emergencyPowerPath[1].status} />
          <PowerPathNode icon={<PanelsTopLeft size={16} color={colors.success} />} title={emergencyPowerPath[2].title} sub={emergencyPowerPath[2].sub} status={emergencyPowerPath[2].status} />
          <PowerPathNode icon={<PanelsTopLeft size={16} color={colors.success} />} title={emergencyPowerPath[3].title} sub={emergencyPowerPath[3].sub} status={emergencyPowerPath[3].status} />
          <PowerPathNode icon={<Lightbulb size={16} color={colors.success} />} title={emergencyPowerPath[4].title} sub={emergencyPowerPath[4].sub} status={emergencyPowerPath[4].status} wide />
          <View style={styles.arrowSpacer}><Text style={{ color: colors.textMuted }}>{'→'}</Text></View>
          <View style={[styles.availableBox]}>
            <ShieldCheck size={20} color={colors.success} />
            <Text style={[typography.bodyStrong, { color: colors.success, fontSize: 11, textAlign: 'center', marginTop: 4 }]}>
              {emergencyLightingAvailable}
            </Text>
          </View>
        </View>
        <View style={[styles.noteBox, { backgroundColor: colors.successBg, borderColor: colors.success }]}>
          <Text style={[typography.caption, { color: colors.textPrimary }]}>{emergencyNote}</Text>
        </View>
      </SectionCard>

      {/* Panel Summary */}
      <SectionCard bare title="PANEL SUMMARY" showInfoIcon>
        <DataTable columns={panelColumns} data={panelSummary} keyExtractor={(r) => r.panel} />
        <View style={styles.totalRow}>
          <Text style={[typography.bodyStrong, { flex: 1.1 }]}>{panelSummaryTotal.panel}</Text>
          <Text style={{ flex: 1.1 }} />
          <Text style={[typography.bodyStrong, { flex: 1, textAlign: 'center' }]}>{panelSummaryTotal.circuits}</Text>
          <Text style={[typography.bodyStrong, { flex: 1, textAlign: 'center', color: colors.success }]}>{panelSummaryTotal.circuitsOn}</Text>
          <Text style={[typography.bodyStrong, { flex: 1, textAlign: 'center', color: colors.textMuted }]}>{panelSummaryTotal.circuitsOff}</Text>
          <Text style={[typography.bodyStrong, { flex: 1, textAlign: 'center' }]}>{panelSummaryTotal.loadKw.toFixed(1)}</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 5 }}>
            <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.success }} />
            <Text style={[typography.bodyStrong, { color: colors.success }]}>{panelSummaryTotal.status}</Text>
          </View>
        </View>
      </SectionCard>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  pageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  threeCol: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  leftCol: {
    width: 260,
  },
  centerCol: {
    flex: 1,
    minWidth: 0,
    minHeight: 340,
  },
  rightCol: {
    width: 300,
    gap: 12,
  },
  panelRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  panelIcon: {
    width: 44,
    height: 44,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  faultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bulbRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bulbAnnotations: {
    marginLeft: 20,
    position: 'relative',
    height: 280,
    justifyContent: 'center',
  },
  annotation: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    maxWidth: 180,
  },
  annotationDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.success,
    marginTop: 4,
  },
  alarmHeaderRow: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 26,
  },
  pathRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  noteBox: {
    marginTop: 10,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 10,
  },
  arrowSpacer: {
    paddingHorizontal: 6,
  },
  availableBox: {
    width: 130,
    borderWidth: 1,
    borderColor: colors.success,
    backgroundColor: colors.successBg,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 9,
    marginTop: 2,
    borderTopWidth: 1.5,
    borderTopColor: colors.borderStrong,
  },
});
