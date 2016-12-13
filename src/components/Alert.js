import React, {Component, PropTypes} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Modal,
	DeviceEventEmitter,
	TouchableOpacity,
	Dimensions
} from 'react-native';

export default class Alert extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: '',
			visible: false
		}
	}

	static PropTypes = {
		// 模态框是否显示
		visible: PropTypes.boolean,
		// 要显示的内容
		content: PropTypes.string
	};

	static defaultProps = {
		visible: false,
		content: ''
	};

	static show(content) {
		// 调用事件，向 app.js 发送一个事件
		DeviceEventEmitter.emit("alert", content);
	};

	static hidden() {
		DeviceEventEmitter.emit("alert");
	};

	render() {
		const {
			visible,
			content
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
	          	visible={visible || this.state.visible}
	          	onRequestClose = {()=> this.props.visible = false}
	        >
		        <View style={[styles.container, modalBackgroundStyle]}>
		            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
		            	<View style = {styles.body}>
		            		<Text style = {styles.bodyText}>{content}</Text>
		            	</View>
		            	<View style = {styles.btns}>
		            		<TouchableOpacity
		            			style = {[styles.btn, styles.btnLeftBorder]}
		            			onPress= {() => {
		            				DeviceEventEmitter.emit("alert", false);
		            			}}
		            		>
		            			<Text style = {styles.btnTitle}>取消</Text>
		            		</TouchableOpacity>
		            		<TouchableOpacity
		            			style = {styles.btn}
		            			onPress= {() => {
		            				alert('query')
		            			}}
		            		>
		            			<Text style = {styles.btnTitle}>确定</Text>
		            		</TouchableOpacity>
		            	</View>
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
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	innerContainer: {
		borderRadius: 12,
		alignItems: 'center',
		// width: Dimensions.get('window').width * 0.7333
		width: 275
	},
	body: {
		paddingHorizontal: 20,
		paddingVertical: 25,
		// width: Dimensions.get('window').width * 0.7333,
		width: 275,
		// 下边缘有根线
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: '#eee',
	},
	bodyText: {
		fontSize: 16,
		textAlign: 'center'
	},
	btns: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		// paddingVertical: 15
	},
	btn: {
		// width: (Dimensions.get('window').width * 0.7333)/2,
		width: 140,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnLeftBorder: {
		// 右边缘有根线
		borderRightWidth: 1,
		borderStyle: 'solid',
		borderColor: '#eee',
	},
	btnTitle: {
		marginVertical: 15,
		color: '#55ACEE',
		fontSize: 16
	}
});