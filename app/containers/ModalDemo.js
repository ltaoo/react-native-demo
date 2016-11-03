import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Modal,
	Button
} from 'react-native';

export default class ModalDemo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style = {styles.container}>

			</View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
