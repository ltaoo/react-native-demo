import React, {Component, PropTypes} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Modal,
	TouchableOpacity
} from 'react-native';

export default class Modal extends Component {
	constructor(props) {
		super(props);


		this.state = {
			modalVisible: props.visible === undefined ? false : props.visible
		};

		this._setModalVisible = this._setModalVisible.bind(this);
	}

	static PropTypes = {
		// 切换动画
		animationType: PropTypes.string,
		// 右上角是否有关闭按钮？
		// 模态框是否显示
		//visible: PropTypes.boolean,
		// 设置模态框是否显示的函数
		// 要让模态框关闭，就要调用这个方法，并传入 false
		setModalVisible: PropTypes.fun,
		// 模态框内容
		content: PropTypes.object,
		// 是否透明？
		transparent: true
	};

	static defaultProps = {
		// 默认弹出模态框没有动画
		animationType: 'none',
		content: (
			<TouchableOpacity
	        	onPress={this._setModalVisible.bind(this, false)}
	        >
	        	<Text>关闭</Text>
	      	</TouchableOpacity>
	    )
	};

	_setModalVisible(value) {
		// value 是 true 或者 false
		this.setState({
			modalVisible: value
		});
	}

	render() {
		const {
			animationType,
			content,
			transparent,
			visible,
			setModalVisible
		} = this.props;
		// 遮罩背景色
		const modalBackgroundStyle = {
			backgroundColor: transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
		};
		// 模态框背景色
		const innerContainerTransparentStyle = {
			backgroundColor: '#fff',
			padding: 20
		};
		return (
	        <Modal
	          	animationType={animationType}
	          	transparent={transparent}
	          	visible={visible}
	        >
		        <View style={[styles.container, modalBackgroundStyle]}>
		            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
		              	{content}
		            </View>
		        </View>
	        </Modal>
		)
	}
}

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