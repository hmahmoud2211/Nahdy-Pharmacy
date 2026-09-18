import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Snowflake, Lightbulb, Zap, ArrowUpDown, Droplet, CircleSlash, TriangleAlert } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { HLine, VLine, TowerIcon, BreakerGlyph, StatusPill, ValueRow, LineKind } from './DiagramPrimitives';
import { Feeder, incomingSupply, acb2, mdbStatus, totalActiveLoad, demandSummary } from '../data/mdbData';

const FEEDER_ICON: Record<Feeder['icon'], React.ComponentType<any>> = {
  hvac: Snowflake,
  lighting: Lightbulb,
  power: Zap,
  lifts: ArrowUpDown,
  pump: Droplet,
  spare: CircleSlash,
  critical: TriangleAlert,
};

function feederLineKind(status: Feeder['status']): LineKind {
  if (status === 'Trip') return 'alarm';
  if (status === 'Open') return 'open';
  return 'normal';
}

function FeederNode({ feeder }: { feeder: Feeder }) {
  const Icon = FEEDER_ICON[feeder.icon];
  const iconColor =
    feeder.status === 'Trip' ? colors.danger : feeder.status === 'Open' ? colors.disabled : colors.info;
  return (
    <View style={styles.feederCol}>
      <VLine kind={feederLineKind(feeder.status)} height={18} topDot />
      <View style={[styles.feederBox, feeder.selected && styles.feederBoxSelected]}>
        <Text style={[typography.caption, { fontFamily: 'Inter_700Bold', fontSize: 10, color: colors.textPrimary }]}>
          {feeder.id}
        </Text>
        <Text style={[typography.caption, { fontSize: 9.5 }]}>{feeder.name}</Text>
        <View style={{ marginVertical: 3 }}>
          <BreakerGlyph size={28} status={feeder.status} />
        </View>
        <StatusPill status={feeder.status} />
        <View style={{ marginTop: 5, gap: 1, width: '100%' }}>
          <View style={styles.miniRow}>
            <Text style={styles.miniLabel}>I</Text>
            <Text style={styles.miniValue}>{feeder.i}</Text>
          </View>
          <View style={styles.miniRow}>
            <Text style={styles.miniLabel}>P</Text>
            <Text style={styles.miniValue}>{feeder.p}</Text>
          </View>
          <View style={styles.miniRow}>
            <Text style={styles.miniLabel}>PF</Text>
            <Text style={styles.miniValue}>{feeder.pf}</Text>
          </View>
        </View>
        <View style={styles.feederTypeIcon}>
          <Icon size={14} color={iconColor} />
        </View>
      </View>
    </View>
  );
}

export function MDBDiagram({ feeders }: { feeders: Feeder[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.livePanel}>
        <Text style={styles.livePanelTitle}>LIVE POWER</Text>
        <ValueRow label="Load" value={`${mdbStatus.totalActiveLoadPct}%`} />
        <ValueRow label="Active" value={totalActiveLoad.sub.split(' / ')[0]} />
        <ValueRow label="Peak" value={demandSummary[0].value} />
        <ValueRow label="PF" value={incomingSupply.pf} />
      </View>

      {/* Incoming supply -> ACB-1 */}
      <View style={styles.row}>
        <View style={styles.towerCol}>
          <TowerIcon size={32} />
          <Text style={[typography.caption, { fontFamily: 'Inter_700Bold', fontSize: 9.5, marginTop: 2 }]}>
            INCOMING SUPPLY
          </Text>
          <View style={{ marginTop: 3 }}>
            <StatusPill status="Normal" />
          </View>
        </View>
        <View style={styles.connectorShort}>
          <HLine kind="normal" />
        </View>
        <View style={styles.breakerCol}>
          <BreakerGlyph size={36} status="Closed" />
          <Text style={[typography.caption, { fontFamily: 'Inter_700Bold', fontSize: 10, marginTop: 3 }]}>ACB-1</Text>
          <StatusPill status="Closed" />
        </View>
        <View style={styles.infoBlock}>
          <ValueRow label="V L-L" value={incomingSupply.vll} />
          <ValueRow label="I" value={incomingSupply.i} />
          <ValueRow label="P" value={incomingSupply.p} />
          <ValueRow label="PF" value={incomingSupply.pf} />
          <ValueRow label="FREQ" value={incomingSupply.freq} />
        </View>
      </View>

      {/* connector ACB-1 -> ACB-2 */}
      <View style={styles.row}>
        <View style={[styles.towerCol, { opacity: 0 }]} />
        <View style={styles.connectorShort} />
        <View style={styles.vconnectorCol}>
          <VLine kind="normal" height={22} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.towerCol, { opacity: 0 }]} />
        <View style={styles.connectorShort} />
        <View style={styles.breakerCol}>
          <BreakerGlyph size={36} status="Closed" />
          <Text style={[typography.caption, { fontFamily: 'Inter_700Bold', fontSize: 10, marginTop: 3 }]}>ACB-2</Text>
          <StatusPill status="Closed" />
        </View>
        <View style={styles.infoBlock}>
          <ValueRow label="V L-L" value={acb2.vll} />
          <ValueRow label="I" value={acb2.i} />
          <ValueRow label="PF" value={acb2.pf} />
        </View>
      </View>

      {/* connector to busbar */}
      <View style={styles.row}>
        <View style={[styles.towerCol, { opacity: 0 }]} />
        <View style={styles.connectorShort} />
        <View style={styles.vconnectorCol}>
          <VLine kind="normal" height={18} topDot />
        </View>
      </View>

      {/* Busbar */}
      <View style={styles.busbarRow}>
        <HLine kind="normal" height={4} />
      </View>

      {/* Feeders */}
      <View style={styles.feederRow}>
        {feeders.map((f) => (
          <FeederNode key={f.id} feeder={f} />
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <LegendItem kind="normal" label="Normal / Closed" />
        <LegendItem kind="warning" label="Warning" />
        <LegendItem kind="alarm" label="Alarm / Trip" />
        <LegendItem kind="open" label="Open / Offline" />
      </View>
    </View>
  );
}

function LegendItem({ kind, label }: { kind: LineKind; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <View style={{ width: 22 }}>
        <HLine kind={kind} height={2.5} />
      </View>
      <Text style={typography.caption}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  livePanel: {
    position: 'absolute',
    top: 6,
    right: 0,
    width: 142,
    padding: 7,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    backgroundColor: colors.surfaceAlt,
  },
  livePanelTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9.5,
    color: colors.primary,
    marginBottom: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  towerCol: {
    width: 80,
    alignItems: 'center',
  },
  connectorShort: {
    width: 26,
  },
  breakerCol: {
    width: 62,
    alignItems: 'center',
  },
  vconnectorCol: {
    width: 62,
    alignItems: 'center',
  },
  infoBlock: {
    marginLeft: 10,
    gap: 3,
  },
  busbarRow: {
    marginLeft: 106,
    marginRight: 6,
    marginVertical: 2,
  },
  feederRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginTop: 0,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexWrap: 'wrap',
  },
  feederCol: {
    alignItems: 'center',
    width: 92,
  },
  feederBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 5,
    alignItems: 'center',
    width: 86,
  },
  feederBoxSelected: {
    borderColor: colors.warningLight,
    backgroundColor: '#FFFDF3',
    borderWidth: 1.5,
  },
  feederTypeIcon: {
    marginTop: 6,
  },
  miniRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  miniLabel: {
    fontSize: 9.5,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  miniValue: {
    fontSize: 9.5,
    color: colors.textPrimary,
    fontFamily: 'Inter_600SemiBold',
  },
});
