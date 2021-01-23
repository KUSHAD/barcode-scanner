import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function ScanScreen() {
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [buttonState, setButtonState] = useState('normal');
	const [hasScanned, setHasScanned] = useState(false);
	const [scannedData, setScannedData] = useState('');
	async function getCameraPermission() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		setHasCameraPermission(status === 'granted');
		setHasScanned(false);
		setButtonState('clicked');
	}
	async function handleBarcodeScan({ data }) {
		await setScannedData(data);
		setHasScanned(true);
		setButtonState('normal');
	}
	if (buttonState === 'clicked' && hasCameraPermission) {
		return (
			<BarCodeScanner
				style={StyleSheet.absoluteFillObject}
				onBarCodeScanned={hasScanned ? undefined : handleBarcodeScan}
			/>
		);
	} else if (buttonState === 'normal') {
		return (
			<View style={Styles.container}>
				<Text style={Styles.title}>Barcode Scanner</Text>
				<Image
					source={require('../assets/barcodescanner.jpg')}
					style={Styles.image}
				/>
				<Text selectable>
					{hasCameraPermission ? scannedData : 'Request Camera Permission'}
				</Text>
				<TouchableOpacity
					onPress={getCameraPermission}
					accessibilityRole="button"
					accessibilityHint="Asks for permissions to open camera and then scans the barcode"
					style={Styles.touchable}
				>
					<Text style={Styles.touchableText}>Scan With Barcode</Text>
				</TouchableOpacity>
				<Image
					source={require('../assets/BARCODE-OF-MATERIAL-UI-TODO.png')}
					style={Styles.image}
				/>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	touchable: {
		backgroundColor: '#488aff',
		padding: 15,
		borderWidth: 2,
		borderColor: '#303f9f',
		borderRadius: 8,
	},
	touchableText: {
		fontSize: 20,
		color: '#fff',
		fontFamily: 'monospace',
	},
	image: {
		aspectRatio: 1,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
});
