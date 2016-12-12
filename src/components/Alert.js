import React, {Component, PropTypes} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Modal,
	DeviceEventEmitter
} from 'react-native';

export default class Alert extends Component {
	constructor(props) {
		super(props)
	}

	static PropTypes = {
		// 模态框是否显示
		visible: PropTypes.boolean
	};

	static defaultProps = {
		visible: false
	};

	static show() {
		// 调用事件，向 app.js 发送一个事件
		DeviceEventEmitter.emit("alert", true);
	};

	static hidden() {
		DeviceEventEmitter.emit("alert", false);
	}

	render() {
		const {
			visible
		} = this.props;
		// 遮罩背景色
		const modalBackgroundStyle = {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		};
		// 模态框背景色
		const innerContainerTransparentStyle = {
			backgroundColor: '#fff'
		};
		return (
			<Modal
	          	transparent={true}
	          	visible={visible}
	          	onRequestClose = {()=> this.props.visible = false}
	        >
		        <View style={[styles.container, modalBackgroundStyle]}>
		            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
		              	<Text>这是自定义的 Alert </Text>
		            </View>
		        </View>
	        </Modal>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#F5FCFF'
	},
	innerContainer: {
		borderRadius: 10,
		alignItems: 'center',
	}
});