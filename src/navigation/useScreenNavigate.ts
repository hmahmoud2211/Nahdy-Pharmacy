import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';
import { ScreenKey } from '../components/Sidebar';

const ROUTE_MAP: Record<ScreenKey, keyof RootStackParamList> = {
  dashboard: 'Dashboard',
  mdb: 'MDB',
  ups: 'UPS',
  lighting: 'Lighting',
};

export function useScreenNavigate() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (key: ScreenKey) => navigation.navigate(ROUTE_MAP[key]);
}
