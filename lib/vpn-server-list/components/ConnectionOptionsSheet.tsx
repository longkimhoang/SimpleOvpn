import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../theming';

interface ConnectionOptionsSheetProps {
  initialIndex?: number;
}

const ConnectionOptionsSheet = React.forwardRef<
  BottomSheetModal,
  ConnectionOptionsSheetProps
>(({initialIndex}, ref) => {
  const theme = useTheme();
  const snapPoints = useMemo(() => [120], []);
  const sheetBackgroundColor = theme.colors.surface;
  const sheetHandleIndicatorColor = theme.colors.surfaceDisabled;

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={initialIndex}
      enablePanDownToClose
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{
        backgroundColor: sheetBackgroundColor,
      }}
      handleIndicatorStyle={{
        backgroundColor: sheetHandleIndicatorColor,
      }}>
      {_props => (
        <View
          style={[styles.container]}
          testID="vpn-server-list.connection-options-sheet"
        />
      )}
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 120,
  },
});

export default ConnectionOptionsSheet;
