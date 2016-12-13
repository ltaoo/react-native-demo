import React, {
	Component
} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

// common component
import Alert from '../components/Alert';

export default class ModalDemo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text
					onPress = {() => {
						Alert.show('这是在模态框页面触发显示自定义Alert')
					}}
				>点击显示自定义Alert框</Text>
	      	</View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});