import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};
		this._onHighlight = this.onHighlight.bind(this);
		this._onUnhighlight = this.onUnhighlight.bind(this);
	}

	onHighlight() {
		this.setState({
			active: true,
		});
	}

	onUnhighlight() {
		this.setState({
			active: false,
		});
	}

	render() {
		let colorStyle = {
			color: this.state.active ? '#fff' : '#000',
		};
		return (
			<TouchableHighlight
		        onHideUnderlay={this._onUnhighlight}
		        onPress={this.props.onPress}
		        onShowUnderlay={this._onHighlight}
		        style={[styles.button, this.props.style]}
		        underlayColor="#a9d9d4">
		        <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
		    </TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 5,
		flex: 1,
		height: 44,
		alignSelf: 'stretch',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	buttonText: {
		fontSize: 18,
		margin: 5,
		textAlign: 'center',
	}
});