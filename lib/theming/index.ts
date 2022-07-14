import {useTheme as useRNPaperTheme} from 'react-native-paper';
import {MD3Typescale, MD3Colors} from 'react-native-paper/lib/typescript/types';

type $DeepPartial<T> = {[P in keyof T]?: $DeepPartial<T[P]>};

type Theme = {
  colors: MD3Colors;
  typescale: MD3Typescale;
};

export type ThemeProp = $DeepPartial<Theme>;

export function useTheme(overrides?: ThemeProp): Theme {
  // We don't care about MD2 theme here
  return useRNPaperTheme(overrides) as Theme;
}
