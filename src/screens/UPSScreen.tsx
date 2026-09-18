import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Battery, Clock, Activity, Play, BellOff, RotateCcw, Ellipsis } from 'lucide-react-native';
import { AppShell } from '../components/AppShell';
import { SectionCard } from '../components/SectionCard';
import { InfoRow } from '../components/InfoRow';
import { Gauge } from '../components/Gauge';
import { UPSDiagram } from '../components/UPSDiagram';
import { AlarmTable } from '../components/AlarmTable';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useScreenNavigate } from '../navigation/useScreenNavigate';
import {
  upsStatus,
  systemTemperature,
  loadMetric,
  batteryMetric,
  runtimeMetric,
  outputStatusMetric,
  upsInformation,
  upsActiveAlarms,
  inputDetails,
  batteryDetails,
  outputDetails,
  environment,
  quickActionsUps,
  sopNoteUps,
} from '../data/upsData';

export function UPSScreen() {
  const navigate = useScreenNavigate();

  return (
    <AppShell active="ups" onNavigate={navigate}>
      <View style={styles.threeCol}>
        {/* LEFT */}
        <View style={styles.leftCol}>
          <SectionCard bare title="STATUS">
            {upsStatus.map((r) => (
              <InfoRow key={r.label} label={r.label} value={r.value} dotKind="success" />
            ))}
            <InfoRow label="System Temperature" value={systemTemperature} />
          </SectionCard>

          <SectionCard bare title="LOAD" contentStyle={{ alignItems: 'center' }}>
            <Gauge pct={loadMetric.pct} color={colors.gaugeBlue} />
            <Text style={[typography.caption, { marginTop: 4 }]}>{loadMetric.sub}</Text>
          </SectionCard>

          <SectionCard bare title="BATTERY STATUS">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Battery size={26} color={colors.success} />
              <View>
                <Text style={[typography.metricMedium, { color: colors.success }]}>{batteryMetric.pct} %</Text>
                <Text style={typography.caption}>{batteryMetric.sub}</Text>
              </View>
            </View>
          </SectionCard>

          <SectionCard bare title="RUNTIME REMAINING">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Clock size={26} color={colors.warning} />
              <View>
                <Text style={[typography.metricMedium, { color: colors.warning }]}>{runtimeMetric.value}</Text>
                <Text style={typography.caption}>{runtimeMetric.sub}</Text>
              </View>
            </View>
          </SectionCard>

          <SectionCard bare title="OUTPUT STATUS">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Activity size={26} color={colors.info} />
              <View>
                <Text style={[typography.metricMedium, { color: colors.info }]}>{outputStatusMetric.value}</Text>
                <Text style={typography.caption}>{outputStatusMetric.sub}</Text>
              </View>
            </View>
          </SectionCard>
        </View>

        {/* CENTER */}
        <View style={styles.centerCol}>
          <SectionCard title="UPS SYSTEM OVERVIEW" contentStyle={{ padding: 9 }}>
            <UPSDiagram />
          </SectionCard>
        </View>

        {/* RIGHT */}
        <View style={styles.rightCol}>
          <SectionCard bare title="UPS INFORMATION" showInfoIcon>
            {upsInformation.map((r) => (
              <InfoRow key={r.label} label={r.label} value={r.value} />
            ))}
          </SectionCard>

          <SectionCard bare title="ACTIVE ALARMS" right={<Text style={[typography.metricMedium, { color: colors.danger, fontSize: 15 }]}>{upsActiveAlarms.length}</Text>}>
            <AlarmTable
              columns={[
                { key: 'time', label: 'Time', flex: 1 },
                { key: 'alarm', label: 'Alarm', flex: 1.6 },
                { key: 'priority', label: 'Priority', flex: 0.8 },
              ]}
              rows={upsActiveAlarms as any}
            />
            <View style={styles.viewAllBtn}>
              <Text style={[typography.bodyStrong, { color: colors.primary, fontSize: 11 }]}>VIEW ALL ALARMS</Text>
            </View>
          </SectionCard>

          <SectionCard bare title="INPUT DETAILS">
            {inputDetails.map((r) => (
              <InfoRow key={r.label} label={r.label} value={r.value} />
            ))}
          </SectionCard>

          <SectionCard bare title="BATTERY DETAILS">
            {batteryDetails.map((r) => (
              <InfoRow key={r.label} label={r.label} value={r.value} />
            ))}
          </SectionCard>

          <SectionCard bare title="OUTPUT DETAILS">
            {outputDetails.map((r) => (
              <InfoRow key={r.label} label={r.label} value={r.value} />
            ))}
          </SectionCard>

          <SectionCard bare title="ENVIRONMENT">
            <InfoRow label="UPS Room Temp" value={environment.roomTemp} />
            <InfoRow label="UPS Room Humidity" value={environment.roomHumidity} />
            <InfoRow label="Status" value={environment.status} dotKind="success" />
          </SectionCard>
        </View>
      </View>

      {/* Quick actions + SOP note */}
      <View style={styles.quickRow}>
        <SectionCard bare title="QUICK ACTIONS (UPS CONTROL)" style={{ flex: 1 }} contentStyle={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
          <QuickBtn icon={<Play size={16} color={colors.success} />} label={quickActionsUps[0]} />
          <QuickBtn icon={<BellOff size={16} color={colors.danger} />} label={quickActionsUps[1]} />
          <QuickBtn icon={<RotateCcw size={16} color={colors.info} />} label={quickActionsUps[2]} />
          <QuickBtn icon={<Ellipsis size={16} color={colors.textSecondary} />} label={quickActionsUps[3]} />
        </SectionCard>
        <View style={styles.sopBox}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>{sopNoteUps}</Text>
        </View>
      </View>
    </AppShell>
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
    gap: 8,
    alignItems: 'flex-start',
  },
  leftCol: {
    width: 230,
    gap: 7,
  },
  centerCol: {
    flex: 1,
    minWidth: 0,
  },
  rightCol: {
    width: 280,
    gap: 7,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 8,
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
});
