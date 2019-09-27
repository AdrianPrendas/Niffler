/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './App';
import {name as appName} from './app.json';
import Register from "./app/components/resgister";

AppRegistry.registerComponent(appName, () => AppContainer);

console.disableYellowBox = true;
