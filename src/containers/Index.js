import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	// Modal,
	TouchableOpacity,
	Alert,
	Dimensions
} from 'react-native';

// 模态框测试
import ModalView from './ModalDemo';
// Image 组件测试
import ImageView from './ImageDemo';
// ListView test
import ListviewView from './ListViewDemo';
// TEST
import Test from './test';
// 图片懒加载demo
// import LazyloadImageDemo from './ImageDemo'
import Modal from '../components/Alert';

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const {width, height} = Dimensions.get('window')
		// alert(width)
	}

	render() {
		const {onForward} = this.props;
		return (
			<View style = {styles.container}>
				<TouchableOpacity
					style = {styles.btn}
					onPress = {()=> {
						onForward('Modal Page', ModalView);
					}}
				>
					<Text style = {styles.text}>Modal Demo</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style = {styles.btn}
					onPress = {()=> {
						onForward('Image Page', ImageView);
					}}
				>
					<Text style = {styles.text}>Image Demo</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style = {styles.btn}
					onPress = {()=> {
						onForward('ListView', ListviewView);
					}}
				>
					<Text style = {styles.text}>ListView Demo</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style = {styles.btn}
					onPress = {()=> {
						// 调用自定义的 Alert
						Modal.show('hello world and some thing, 试试看很多文字的情况会怎么样');
					}}
				>
					<Text style = {styles.text}>显示自定义 Alert</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: '#F5FCFF'
	},
	btn: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: '#ccc'
	},
	text: {
		fontSize: 16
	}
})
