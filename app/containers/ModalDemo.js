import React, {
	Component
} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Modal,
	Switch
} from 'react-native';

// common component
import Button from '../components/Button';

export default class ModalDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// 模态框动画
			animationType: 'none',
			// 模态框显示控制
			modalVisible: false,
			transparent: true,

		};
		this._toggleTransparent = this.toggleTransparent.bind(this);
	}
	// 设置模态框是否可见
	_setModalVisible(visible) {
		this.setState({
			modalVisible: visible
		});
	}
	// 设置 slide 或者 fade
	_setAnimationType(type) {
		this.setState({
			animationType: type
		});
	}
	// 切换透明度
	toggleTransparent() {
		this.setState({
			transparent: !this.state.transparent
		});
	}

	render() {
		// 背景是否透明
		const modalBackgroundStyle = {
			backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
		}
		// 控制显示，是全屏还是
		// Modal组件的直接子元素，是背景色
		// 子元素的子元素就是真正的模态框
		// 如果给这个直接子元素背景色，就想平常意义上的模态框了
		// 不然，就是全部遮住，看起来像是跳转了页面，其实是遮上了一层view而已
		const innerContainerTransparentStyle = this.state.transparent ? {
			backgroundColor: 'red',
			padding: 20
		} : null

		return (
			<View style={{paddingTop:20,paddingLeft:10,paddingRight:10}}>
		        <Modal
		          	animationType={this.state.animationType}
		          	transparent={this.state.transparent}
		          	visible={this.state.modalVisible}
		          	onRequestClose={() => {this._setModalVisible(false)}}
		        >
			        <View style={[styles.container, modalBackgroundStyle]}>
			            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
			              	<Text>Modal视图被显示:{this.state.animationType === 'none' ? '没有' : '有',this.state.animationType}动画效果.</Text>
			              	<Button
			                	onPress={this._setModalVisible.bind(this, false)}
			                	style={styles.modalButton}>
			                  关闭Modal
			              	</Button>
			            </View>
			        </View>
		        </Modal>
		        <View style={styles.row}>
		          	<Text style={styles.rowTitle}>动画类型</Text>
		          	<Button onPress={this._setAnimationType.bind(this, 'none')} style={this.state.animationType === 'none' ? {backgroundColor:'red'}: {}}>
		            	无动画
		          	</Button>
		          	<Button onPress={this._setAnimationType.bind(this, 'fade')} style={this.state.animationType === 'fade' ? {backgroundColor:'yellow'} : {}}>
		            	滑动效果
		          	</Button>
		        </View>

		        <View style={styles.row}>
		          	<Text style={styles.rowTitle}>透明</Text>
		          	<Switch value={this.state.transparent} onValueChange={this._toggleTransparent} />
		        </View>

		        <Button onPress={this._setModalVisible.bind(this, true)}>
		            显示Modal
		        </Button>
	      </View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#F5FCFF'
	},
	innerContainer: {
		borderRadius: 10,
		alignItems: 'center',
	},
	row: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		marginBottom: 20,
	},
	rowTitle: {
		flex: 1,
		fontWeight: 'bold',
	},
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
	},
	modalButton: {
		marginTop: 10,
	}
});