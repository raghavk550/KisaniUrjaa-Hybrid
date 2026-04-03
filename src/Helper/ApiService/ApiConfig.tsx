import {Platform} from 'react-native';

// On Android emulator, localhost refers to the emulator itself.
// Use 10.0.2.2 to reach the host machine instead.
const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000'
  : 'http://localhost:3000';

export default BASE_URL;
