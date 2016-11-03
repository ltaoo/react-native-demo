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
						onForward('modal', ModalView);
					}}
				>
					<Text>Modal</Text>
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
