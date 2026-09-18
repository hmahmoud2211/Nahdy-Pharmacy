import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Line as SvgLine } from 'react-native-svg';
import { Battery, Building } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { HLine, VLine, TowerIcon, BreakerGlyph, StatusPill, ValueRow } from './DiagramPrimitives';
import {
  utilitySupply,
  inputBreakerStatus,
  dcBus,
  outputBreakerStatus,
  batteryBank,
  criticalLoad,
} from '../data/upsData';

function ConverterGlyph({ acLeft }: { acLeft: boolean }) {
  const sine = (
    <Path d="M2,17 Q8,6 14,17 T26,17" stroke={colors.textPrimary} strokeWidth={1.6} fill="none" />
  );
  const dc = (
    <>
      <SvgLine x1={2} y1={17} x2={26} y2={17} stroke={colors.textPrimary} strokeWidth={1.6} />
      <SvgLine x1={2} y1={11} x2={2} y2={23} stroke={colors.textPrimary} strokeWidth={1.6} />
      <SvgLine x1={14} y1={11} x2={14} y2={23} stroke={colors.textPrimary} strokeWidth={1.6} />
      <SvgLine x1={26} y1={11} x2={26} y2={23} stroke={colors.textPrimary} strokeWidth={1.6} />
    </>
  );
  return (
    <View style={styles.converterBox}>
      <Svg width={20} height={23} viewBox="0 0 30 34">
        {acLeft ? sine : dc}
      </Svg>
      <View style={styles.converterDivider} />
      <Svg width={20} height={23} viewBox="0 0 30 34">
        {acLeft ? dc : sine}
      </Svg>
    </View>
  );
}

export function UPSDiagram() {
  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        {/* Utility supply */}
        <View style={styles.node}>
          <TowerIcon size={28} />
          <Text style={styles.nodeTitle}>UTILITY SUPPLY</Text>
          <View style={{ marginTop: 4, gap: 1 }}>
            <ValueRow label="L1-L2" value={utilitySupply.l1l2} />
            <ValueRow label="L2-L3" value={utilitySupply.l2l3} />
            <ValueRow label="L3-L1" value={utilitySupply.l3l1} />
            <ValueRow label="FREQ" value={utilitySupply.freq} />
          </View>
        </View>

        <View style={styles.hconnector}>
          <HLine kind="normal" />
        </View>

        {/* Input breaker */}
        <View style={styles.node}>
          <Text style={styles.nodeTitle}>INPUT BREAKER</Text>
          <BreakerGlyph size={32} status="Closed" />
          <StatusPill status="Closed" />
        </View>

        <View style={styles.hconnector}>
          <HLine kind="normal" />
        </View>

        {/* Rectifier */}
        <View style={styles.node}>
          <Text style={styles.nodeTitle}>RECTIFIER</Text>
          <ConverterGlyph acLeft />
        </View>

        <View style={styles.hconnector}>
          <HLine kind="normal" />
        </View>

        {/* DC Bus column (with battery hanging below) */}
        <View style={styles.node}>
          <Text style={styles.nodeTitle}>DC BUS</Text>
          <View style={styles.dcBusBox}>
            <Text style={[typography.bodyStrong, { fontSize: 10, color: colors.success }]}>{dcBus}</Text>
          </View>
          <VLine kind="normal" height={20} />
          <View style={styles.batteryBox}>
            <Battery size={16} color={colors.success} />
            <Text style={[typography.bodyStrong, { fontSize: 10, color: colors.success, marginTop: 2 }]}>
              {batteryBank.pct} %
            </Text>
            <Text style={typography.caption}>{batteryBank.vdc}</Text>
          </View>
          <Text style={styles.batteryLabel}>BATTERY BANK</Text>
        </View>

        <View style={styles.hconnector}>
          <HLine kind="normal" />
        </View>

        {/* Inverter */}
        <View style={styles.node}>
          <Text style={styles.nodeTitle}>INVERTER</Text>
          <ConverterGlyph acLeft={false} />
        </View>

        <View style={styles.hconnector}>
          <HLine kind="normal" />
        </View>

        {/* Output breaker */}
        <View style={styles.node}>
          <Text style={styles.nodeTitle}>OUTPUT BREAKER</Text>
          <BreakerGlyph size={32} status="Closed" />
          <StatusPill status="Closed" />
        </View>

        <View style={styles.hconnector}>
          <HLine kind="normal" />
        </View>

        {/* Critical load */}
        <View style={styles.node}>
          <Building size={24} color={colors.textSecondary} />
          <Text style={styles.nodeTitle}>CRITICAL LOAD</Text>
          <View style={{ marginTop: 4, gap: 1 }}>
            <ValueRow label="L1-L2" value={criticalLoad.l1l2} />
            <ValueRow label="L2-L3" value={criticalLoad.l2l3} />
            <ValueRow label="L3-L1" value={criticalLoad.l3l1} />
            <ValueRow label="FREQ" value={criticalLoad.freq} />
            <ValueRow label="LOAD" value={criticalLoad.load} />
            <ValueRow label="PF" value={criticalLoad.pf} />
          </View>
        </View>
      </View>

      {/* Bypass path */}
      <View style={styles.bypassRow}>
        <View style={styles.bypassStub} />
        <View style={{ flex: 1, position: 'relative', justifyContent: 'center' }}>
          <HLine kind="normal" height={2} />
          <View style={styles.bypassLabelWrap}>
            <Text style={styles.bypassLabel}>BYPASS</Text>
          </View>
        </View>
        <View style={styles.bypassStub} />
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <LegendItem color={colors.success} label="Normal Power" />
        <LegendItem color={colors.success} label="Bypass" dashed />
        <LegendItem color={colors.disabled} label="No Power" />
        <LegendItem color={colors.danger} label="Fault" dashed />
      </View>
    </View>
  );
}

function LegendItem({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Svg width={22} height={6}>
        <SvgLine x1={0} y1={3} x2={22} y2={3} stroke={color} strokeWidth={2.5} strokeDasharray={dashed ? '5,3' : undefined} />
      </Svg>
      <Text style={typography.caption}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  node: {
    alignItems: 'center',
    width: 80,
  },
  hconnector: {
    width: 14,
    marginTop: 18,
  },
  nodeTitle: {
    fontSize: 9.5,
    fontFamily: 'Inter_700Bold',
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  converterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 3,
  },
  converterDivider: {
    width: 1,
    height: 22,
    backgroundColor: colors.border,
  },
  dcBusBox: {
    borderWidth: 1.5,
    borderColor: colors.success,
    borderStyle: 'dashed',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  batteryBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    alignItems: 'center',
  },
  batteryLabel: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    color: colors.textSecondary,
    marginTop: 3,
  },
  bypassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    paddingHorizontal: 24,
  },
  bypassStub: {
    width: 2,
    height: 20,
    backgroundColor: colors.success,
  },
  bypassLabelWrap: {
    position: 'absolute',
    alignSelf: 'center',
    top: -9,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
  },
  bypassLabel: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    color: colors.textSecondary,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
    flexWrap: 'wrap',
  },
});
