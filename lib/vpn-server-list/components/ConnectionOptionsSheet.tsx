import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../theming';

const ConnectionOptionsSheet = React.forwardRef<BottomSheetModal>((_, ref) => {
  const theme = useTheme();
  const snapPoints = useMemo(() => [120], []);
  const sheetBackgroundColor = theme.colors.surface;
  const sheetHandleIndicatorColor = theme.colors.surfaceDisabled;

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
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
      {props => <View style={[styles.container]} />}
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 120,
  },
});

export default ConnectionOptionsSheet;
