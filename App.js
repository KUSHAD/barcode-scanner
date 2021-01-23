import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ScanScreen from './Screens/ScanScreen';

export default function App() {
	return (
		<>
			<ScanScreen />
			<StatusBar style="auto" />
		</>
	);
}
