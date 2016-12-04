import React, {Component} from 'react'
import {
	StyleSheet,
	View,
	Image,
	Text,
	Dimensions,
	InteractionManager,
	TouchableOpacity
} from 'react-native'
// 获取屏幕宽高
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class CustomImage extends Component {
	constructor(props) {
		super(props)

		// 先给图片一个默认宽高
		this.state = {
			width: screenWidth,
			height: 300,
			loaded: false
		}
		this._loadImg = this._loadImg.bind(this)
		this._onLayout = this._onLayout.bind(this)
		this._renderRemoteImg = this._renderRemoteImg.bind(this)
	}
	// 从网络请求图片的方法
	_loadImg() {
		InteractionManager.runAfterInteractions(() => {
			const {source, style} = this.props
			if(source.uri) {
				// 如果是网络图片 在页面还未加载前，获取图片宽高
				Image.getSize(source.uri, (w, h) => {
					// alert(`${width} -- ${height}`)
					// 判断有没有传宽高样式
					if(style && style.width && style.height) {
						// 如果传了宽高属性
					}
					let imgHeight = (h/w)*this.state.width
			      	this.setState({
			      		height: imgHeight,
			      		loaded: true
			      	})
			    }, (err) => {
			    	// 获取图片宽高或者下载图片失败
			    	this.setState({
			    		loadFail: true
			    	})
			    })
			}
		})
	}
	// 获取组件初始化位置
	_onLayout(e, node) {
		let {y} = e.nativeEvent.layout;
		this.setState({
			offsetY: y
		})
	}
	// 渲染远程图片
	_renderRemoteImg(y) {
		const {source} = this.props
		if(this.state.loaded) {
			// 如果真正的图片加载好
			return <Image 
				source = {source}
				style = {{height: this.state.height}}
				resizeMode = {'contain'}
				onLayout = {this._onLayout}
			/>
		}
		// 加载中视图
		return this._renderLoad('正在加载中...')
	}

	render() {
		if(this.state.loadFail) {
			// 优先判断这个，加载失败视图
			return this._renderLoad('加载失败，点击重试')
		}
		// 先显示默认的
		const {defaultSource, source, resizeMode, y} = this.props
		if(y+this.state.screenHeight >= this.state.offsetY && !this.state.loaded) {
			// 如果内容偏移量大于图片组件y位置，就加载图片
			this._loadImg()
		}
		// 如果有 uri 属性，表示是远程图片
		if(source.uri) {
			return this._renderRemoteImg(y)
		}
		// 这是加载本地图片的渲染
		return <Image 
			{...this.props}
		/>
		
	}
	// 获取加载中、加载失败视图的函数
	_renderLoad(text) {
		return(
			<View 
				ref = 'image'
				style = {styles.loadContainer}
				onLayout = {this._onLayout}
			>
				<Text 
					style = {styles.loadText}
				>{text}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	// 加载容器样式
	loadContainer: {
		backgroundColor: '#eee',
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
		marginVertical: 10
	},
	// 加载失败样式
	loadText: {
		fontSize: 20,
		color: '#ccc'
	}

})