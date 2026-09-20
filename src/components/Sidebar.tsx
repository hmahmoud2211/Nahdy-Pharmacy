import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import {
  LayoutDashboard,
  Zap,
  PanelsTopLeft,
  BatteryCharging,
  Lightbulb,
  Container,
  Settings,
  AirVent,
  Fan,
  Cylinder,
  ArrowUpDown,
  BellRing,
  Droplet,
  Droplets,
  SquarePlus,
  Refrigerator,
  Wind,
  DoorClosed,
  Cctv,
  Megaphone,
  PhoneCall,
  Server,
  ChevronUp,
  ChevronDown,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { SIDEBAR_WIDTH } from '../theme/spacing';

export type ScreenKey = 'dashboard' | 'mdb' | 'ups' | 'lighting';

interface NavItem {
  key?: ScreenKey;
  label: string;
  icon: React.ComponentType<any>;
}

interface NavSection {
  title: string;
  color: string;
  icon: React.ComponentType<any>;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    title: 'Electrical Systems',
    color: colors.sectionElectrical,
    icon: Zap,
    items: [
      { key: 'mdb', label: 'Power MDB', icon: PanelsTopLeft },
      { key: 'ups', label: 'Building UPS', icon: BatteryCharging },
      { key: 'lighting', label: 'Lighting', icon: Lightbulb },
      { label: 'Generator', icon: Container },
    ],
  },
  {
    title: 'Mechanical Systems',
    color: colors.sectionMechanical,
    icon: Settings,
    items: [
      { label: 'HVAC / Split AC', icon: AirVent },
      { label: 'Fan Exhaust', icon: Fan },
      { label: 'Water Tanks', icon: Cylinder },
      { label: 'Elevator', icon: ArrowUpDown },
      { label: 'Fire Alarm', icon: BellRing },
      { label: 'Fire Pump', icon: Droplet },
      { label: 'Water Softener & RO System', icon: Droplets },
    ],
  },
  {
    title: 'Medical Equipment',
    color: colors.sectionMedical,
    icon: SquarePlus,
    items: [
      { label: 'Fridge TMS', icon: Refrigerator },
      { label: 'Room Pressurization', icon: Wind },
    ],
  },
  {
    title: 'Building Technology',
    color: colors.sectionBuildingTech,
    icon: DoorClosed,
    items: [
      { label: 'Access Control System', icon: DoorClosed },
      { label: 'CCTV System', icon: Cctv },
      { label: 'Public Address System', icon: Megaphone },
      { label: 'Nurse Call System', icon: PhoneCall },
    ],
  },
  {
    title: 'IT Infrastructure',
    color: colors.sectionITInfra,
    icon: Server,
    items: [{ label: 'Smart Rack', icon: Server }],
  },
];

export function Sidebar({ active, onNavigate }: { active: ScreenKey; onNavigate: (k: ScreenKey) => void }) {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  return (
    <ScrollView style={styles.sidebar} contentContainerStyle={{ paddingBottom: 24 }}>
      <Pressable
        style={[styles.dashboardRow, active === 'dashboard' && styles.dashboardRowActive]}
        onPress={() => onNavigate('dashboard')}
      >
        <LayoutDashboard size={13} color={colors.primary} />
        <Text style={[typography.bodyStrong, { marginLeft: 8, color: colors.primary, fontSize: 10.5 }]}>Dashboard</Text>
      </Pressable>

      {SECTIONS.map((section) => {
        const collapsed = collapsedSections[section.title];
        const SectionIcon = section.icon;
        return (
          <View key={section.title}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => setCollapsedSections((s) => ({ ...s, [section.title]: !s[section.title] }))}
            >
              <SectionIcon size={12.5} color={section.color} />
              <Text style={[typography.bodyStrong, { marginLeft: 8, color: section.color, fontSize: 10, flex: 1 }]}>
                {section.title}
              </Text>
              {collapsed ? (
                <ChevronDown size={12} color={section.color} />
              ) : (
                <ChevronUp size={12} color={section.color} />
              )}
            </Pressable>
            {!collapsed &&
              section.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.key && item.key === active;
                const isEnabled = item.key === 'mdb';
                return (
                  <Pressable
                    key={item.label}
                    disabled={!isEnabled}
                    style={[
                      styles.itemRow,
                      isActive && styles.itemRowActive,
                      !isEnabled && styles.itemRowDisabled,
                    ]}
                    onPress={() => isEnabled && item.key && onNavigate(item.key)}
                  >
                    <Icon size={12} color={section.color} />
                    <Text
                      style={[
                        typography.body,
                        {
                          marginLeft: 8,
                          color: section.color,
                          fontSize: 9.5,
                          fontFamily: isActive ? 'Inter_600SemiBold' : 'Inter_500Medium',
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            <View style={styles.sectionDivider} />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: SIDEBAR_WIDTH,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: SIDEBAR_WIDTH,
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  dashboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    marginTop: 6,
    borderRadius: 5,
  },
  dashboardRowActive: {
    backgroundColor: colors.primaryLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 3,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    borderRadius: 5,
  },
  itemRowActive: {
    backgroundColor: colors.primaryLight,
  },
  itemRowDisabled: {
    opacity: 0.4,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 8,
    marginHorizontal: 12,
  },
});
