import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	// Image,
	ScrollView,
} from 'react-native';

import Image from '../components/Image'

// import {
// 	ScrollView,
// 	Image
// } from 'react-native-lazyload'

export default class ImageDemo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			x: 0,
			y: 0
		}

		this._onContentSizeChange = this._onContentSizeChange.bind(this)
		this._getPosition = this._getPosition.bind(this)
		this._onScroll = this._onScroll.bind(this)
	}

	_onContentSizeChange(width, height) {
		// alert(`${width},${height}`)
	}

	// 滑动触发
	_onScroll(e) {
		// 获取位置？
		let {x, y} = e.nativeEvent.contentOffset;
		this.setState({
			x,
			y
		})
	}

	_getPosition() {
		// this.refs.scroll.measureLayout((x, y, width, height, pageX, pageY)=> {
		// 	alert(`${x}, ${y}, ${pageX}, ${pageY}`)
		// })
		// let result = []
		// for(let key in this.scroll) {
		// 	result.push(`${key}: ${this.scroll[key]}`)
		// }

		// alert(result.join(','))
	}


	render() {
		return (
			<ScrollView 
				ref = {(r)=> this.scroll = r}
				style = {styles.container}
				showsVerticalScrollIndicator = {false}
				onContentSizeChange = {this._onContentSizeChange}
				onScroll = {this._onScroll}
			>
				<Text
					style = {styles.text}
					onPress = {this._getPosition}
				>点击获取位置</Text>
				<Text style = {styles.text}>假设这是文章详情页，存在很多文字和图片</Text>
				<Text style = {styles.text}>就像便当盒的3个部分，分为主食／配菜／餐后水果（当然也有不一样的分配，我们就按最基本的来）</Text>
				<Text style = {styles.text}>在1000元资金配比过程中，由于物品的选择，价格也是大不同的，所以壹间君会在下面给出一个物品选择的方案，大概了解一下就好~</Text>
				<Image
					source = {{uri: 'https://pi2c4.zhimg.com/ac12fd206385ac03f7d1119419185973_b.jpg'}}
					y = {this.state.y}
				/>
				<Text style = {styles.text}>在1000元资金配比过程中，由于物品的选择，价格也是大不同的，所以壹间君会在下面给出一个物品选择的方案，大概了解一下就好~</Text>
				<Text style = {styles.text}>在1000元资金配比过程中，由于物品的选择，价格也是大不同的，所以壹间君会在下面给出一个物品选择的方案，大概了解一下就好~</Text>
				<Text style = {styles.text}>在1000元资金配比过程中，由于物品的选择，价格也是大不同的，所以壹间君会在下面给出一个物品选择的方案，大概了解一下就好~</Text>
				<Text style = {styles.text}>这里壹间君做了一个图，大家可以感受一下从基本到润色的过程，由于不知道题主家的具体情况，所以壹间君都按最基本的来。</Text>
				<Text style = {styles.text}>这里壹间君做了一个图，大家可以感受一下从基本到润色的过程，由于不知道题主家的具体情况，所以壹间君都按最基本的来。</Text>
				<Text style = {styles.text}>这里壹间君做了一个图，大家可以感受一下从基本到润色的过程，由于不知道题主家的具体情况，所以壹间君都按最基本的来。</Text>
				<Text style = {styles.text}>这里壹间君做了一个图，大家可以感受一下从基本到润色的过程，由于不知道题主家的具体情况，所以壹间君都按最基本的来。</Text>
				<Text style = {styles.text}>按照便当盒的配比我们可以看见，基本生活用品（主食）的比例是最大的，如果我们有1000元</Text>
				<Text style = {styles.text}>在1000元资金配比过程中，由于物品的选择，价格也是大不同的，所以壹间君会在下面给出一个物品选择的方案，大概了解一下就好~</Text>
				<Text style = {styles.text}>这里壹间君做了一个图，大家可以感受一下从基本到润色的过程，由于不知道题主家的具体情况，所以壹间君都按最基本的来。</Text>
				<Image
					source = {{uri: 'https://pic4.zhimg.com/ac12fd206385ac03f7d1119419185973_b.jpg'}}
					y = {this.state.y}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	    backgroundColor: '#F5FCFF',
	    paddingHorizontal: 10
	},
	text: {
		fontSize: 16,
		marginVertical: 10
	}
})