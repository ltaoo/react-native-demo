import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Modal,
	TouchableOpacity
} from 'react-native';

// 模态框测试
import ModalView from './ModalDemo';
// Image 组件测试
import ImageView from './ImageDemo';

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {onForward} = this.props;
		return (
			<View style = {styles.container}>
				<Text>Index Component</Text>
				<TouchableOpacity
					onPress = {()=> {
						onForward('Modal Page', ModalView);
					}}
				>
					<Text>Modal</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress = {()=> {
						onForward('Image Page', ImageView);
					}}
				>
					<Text>Image</Text>
				</TouchableOpacity>
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
