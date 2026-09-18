import React, { useState } from 'react';
import { View, Text, Image, Pressable, TextInput, StyleSheet } from 'react-native';
import { Home, ChevronDown, Search, User, Calendar } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { HEADER_HEIGHT } from '../theme/spacing';

const nahdiLogo = require('../../assets/logos/nahdi-logo.png');
const siemensLogo = require('../../assets/logos/siemens-logo.png');

function Selector({ label, value, options }: { label: string; value: string; options: string[] }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(value);
  return (
    <View style={{ position: 'relative' }}>
      <Pressable style={styles.selector} onPress={() => setOpen((o) => !o)}>
        <View>
          <Text style={typography.label}>{label}</Text>
          <Text style={[typography.bodyStrong, { color: colors.primary, fontSize: 10 }]}>{current}</Text>
        </View>
        <ChevronDown size={12} color={colors.primary} style={{ marginLeft: 8 }} />
      </Pressable>
      {open && (
        <View style={styles.dropdown}>
          {options.map((opt) => (
            <Pressable
              key={opt}
              style={styles.dropdownItem}
              onPress={() => {
                setCurrent(opt);
                setOpen(false);
              }}
            >
              <Text style={typography.body}>{opt}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export function AppHeader() {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.header}>
      <Image source={nahdiLogo} style={styles.nahdiLogo} resizeMode="contain" />

      <Pressable style={styles.homeBtn}>
        <Home size={14} color={colors.textInverse} />
      </Pressable>

      <Selector label="Business" value="Nahdi Care" options={['Nahdi Care']} />
      <Selector label="Region" value="All Regions" options={['All Regions', 'Central', 'Western', 'Eastern']} />
      <Selector label="Site" value="All Sites" options={['All Sites', 'Alsamer Clinics C03JED', 'Munisyah Clinics']} />

      <View style={styles.searchBox}>
        <Search size={12} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.spacer} />

      <View style={styles.userBlock}>
        <User size={13} color={colors.primary} />
        <Text style={[typography.bodyStrong, { marginLeft: 5, fontSize: 10 }]}>BMS_Admin</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.dateBlock}>
        <Calendar size={13} color={colors.primary} />
        <View style={{ marginLeft: 5 }}>
          <Text style={[typography.bodyStrong, { fontSize: 9.5 }]}>Monday, February 23, 2026</Text>
          <Text style={typography.caption}>10:25 AM</Text>
        </View>
      </View>

      <Image source={siemensLogo} style={styles.siemensLogo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 12,
    gap: 7,
    zIndex: 20,
  },
  nahdiLogo: {
    width: 72,
    height: 24,
    marginRight: 4,
  },
  homeBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 90,
  },
  dropdown: {
    position: 'absolute',
    top: 34,
    left: 0,
    minWidth: 140,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 4,
    zIndex: 50,
    elevation: 4,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 130,
    gap: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 10,
    color: colors.textPrimary,
    padding: 0,
    outlineStyle: 'none' as any,
  },
  spacer: {
    flex: 1,
  },
  userBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  dateBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  siemensLogo: {
    width: 68,
    height: 20,
    marginLeft: 4,
  },
});
