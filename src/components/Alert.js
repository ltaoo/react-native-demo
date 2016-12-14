import React, {Component, PropTypes} from 'react';

import {
	StyleSheet,
	View,
	Text,
	Modal,
	DeviceEventEmitter,
	TouchableOpacity,
	Dimensions,
	Animated,
	Easing,
	PixelRatio
} from 'react-native';

const pixel1 = 1 / PixelRatio.get();

export default class Alert extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: '',
			visible: false,
			opacity: new Animated.Value(.4),
			scale: new Animated.Value(1.2)
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

	componentDidMount() {
		DeviceEventEmitter.addListener("alert", (content = '')=>{
			if(content) {
				Animated.parallel(['opacity', 'scale'].map(property => {
		                return Animated.timing(this.state[property], {
		                toValue: 1,
		                duration: 100,
		                easing: Easing.linear
		            });
		        })).start();
			} else {
				Animated.parallel(['opacity', 'scale'].map(property => {
		                return Animated.timing(this.state[property], {
		                toValue: 1,
		                duration: 200,
		                easing: Easing.linear
		            });
		        })).start();   
			}
		});
	}

	render() {
		const {
			visible,
			content
		} = this.props;
		// 遮罩背景色
		const _this = this;
		const modalBackgroundStyle = {
			backgroundColor: 'rgba(0, 0, 0, 0.5)'
		};
		// 模态框背景色
		const innerContainerTransparentStyle = {
			backgroundColor: '#fff',
			opacity: _this.state.opacity,
			transform: [{
	            // rotateZ: this.state.rotation.interpolate({
	            //     inputRange: [0,1],
	            //     outputRange: ['0deg', '360deg']
	            // })
	            scale: _this.state.scale
           }]
		};
		return (
			<Modal
	          	transparent={true}
	          	visible={visible || this.state.visible}
	          	onRequestClose = {()=> this.props.visible = false}
	        >
		        <View style={[styles.container, modalBackgroundStyle]}>
		            <Animated.View style={[styles.innerContainer, innerContainerTransparentStyle]}>
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
		            </Animated.View>
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
		borderBottomWidth: pixel1,
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
		borderRightWidth: pixel1,
		borderStyle: 'solid',
		borderColor: '#eee',
	},
	btnTitle: {
		marginVertical: 15,
		color: '#55ACEE',
		fontSize: 16
	}
});