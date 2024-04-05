import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'quicksand_bold': require('../assets/font/quicksand_bold.ttf'),
    'quicksand_light': require('../assets/font/quicksand_light.ttf'),
    'quicksand_medium': require('../assets/font/quicksand_medium.ttf'),
    'quicksand_regular': require('../assets/font/quicksand_regular.ttf'),
    'quicksand_semibold': require('../assets/font/quicksand_semibold.ttf'),
  });
};
