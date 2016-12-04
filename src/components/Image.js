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

export default class CustomImage extends Component {
	constructor(props) {
		super(props)

		// 先给一个默认宽高
		const {width, height} = Dimensions.get('window')
		this.state = {
			width,
			screenHeight: height,
			height: 300,
			loaded: false
		}

		this._onLayout = this._onLayout.bind(this)
		this._renderRemoteImg = this._renderRemoteImg.bind(this)
		this._loadImg = this._loadImg.bind(this)
		this._reloadImg = this._reloadImg.bind(this)
	}

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
	_reloadImg() {
		this.setState({
			loadFail: false,
			loaded: false
		})
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
		      		loaded: true,
		      	})
		    }, (err) => {
		    	// 获取图片宽高或者下载图片失败
		    	this.setState({
		    		loadFail: true
		    	})
		    })
		}
	}
	// 获取组件初始化位置
	_onLayout(e, node) {
		let {x, y, width, height} = e.nativeEvent.layout;
		this.setState({
			offsetY: y
		})
	}

	_renderRemoteImg(y) {
		const {source, resizeMode, defaultSource} = this.props
		if(this.state.loaded) {
			// 如果真正的图片加载好
			return <Image 
				source = {source}
				style = {{height: this.state.height}}
				resizeMode = {resizeMode || 'contain'}
				onLayout = {this._onLayout}
				measureLayout = {this._measureLayout}
			/>
		}
		// 不然就显示默认的
		if(defaultSource) {
			// 如果有写默认图片
			return <Image 
				source = {defaultSource}
				style = {{width: this.state.width, height: this.state.height}}
				resizeMode = {resizeMode || 'contain'}
			/>
		}
		// 加载中
		return this._renderLoad('正在加载中...')
	}

	// 显示
	render() {
		if(this.state.loadFail) {
			// 优先判断这个，加载失败显示
			return this._renderLoad('加载失败，点击重试')
		}
		// 先显示默认的
		const {defaultSource, source, resizeMode, y} = this.props
		if(y+this.state.screenHeight >= this.state.offsetY && !this.state.loaded) {
			// 如果内容偏移量大于图片组件y位置，就加载图片
			this._loadImg()
			// alert(`${y}, ${this.state.offsetY}`)
		}
		// 如果有 uri 属性，表示是远程图片
		if(source.uri) {
			return this._renderRemoteImg(y)
		}
		// 这是加载本地图片的渲染
		return <Image 
			source = {source} 
			style = {{width: this.state.width}}
			resizeMode = {resizeMode || 'contain'}
		/>
		
	}

	_renderLoad(text) {
		return(
			<TouchableOpacity 
				style = {styles.loadContainer}
				onLayout = {this._onLayout}
				onPress = {this._reloadImg}
			>
				<Text 
					style = {styles.loadText}
				>{text}</Text>
			</TouchableOpacity>
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