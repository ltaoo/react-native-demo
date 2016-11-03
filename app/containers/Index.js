import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Modal,
	Button
} from 'react-native';

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style = {styles.container}>
				<Text>Index Component</Text>
			</View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#F5FCFF'
	}
})
