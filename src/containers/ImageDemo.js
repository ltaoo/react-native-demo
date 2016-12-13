import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	// Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import Image from '../components/Image'
import Alert from '../components/Alert'

export default class ImageDemo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			y: 0
		}

		this._onScroll = this._onScroll.bind(this)
	}

	// 滑动触发
	_onScroll(e) {
		// 获取滑动的距离
		let {y} = e.nativeEvent.contentOffset;
		this.setState({
			y
		})
	}

	render() {
		return (
			<ScrollView 
				style = {styles.container}
				onScroll = {this._onScroll}
			>
				<Text style = {[styles.text, styles.title]}>假设这是文章详情页，存在很多文字和图片</Text>
				<Text style = {styles.text}>在我阅读的前端库、Python后台库的过程中，我们都是以造轮子为目的展开的。所以在最开始的时候，我需要一个可以工作，并且拥有我想要的功能的版本。</Text>
				<Text style = {styles.text}>紧接着，我就可以开始去实践这个版本中的一些功能，并理解他们是怎么工作的。再用git大法展开之前修改的内容，可以使用IDE自带的Diff工具：</Text>
				<Image
					source = {{uri: 'https://pic4.zhimg.com/5bc23b15e827a033d2b4966b6038d987_b.jpg'}}
					y = {this.state.y}
				/>
				<TouchableOpacity
					onPress= {() => {
						Alert.show('hello world')
					}}
				>
					<Text>点击</Text>
				</TouchableOpacity>
				<Text style = {styles.text}>或者类似于SourceTree这样的工具，来查看修改的内容。</Text>
				<Text style = {styles.text}>在我们理解了基本的核心功能后，我们就可以向后查看大、中版本的更新内容了。</Text>
				<Text style = {styles.text}>开始之前，我们希望大家对版本号管理有一些基本的认识。</Text>
				<Text style = {styles.text}>我最早阅读的开始软件是Linux，而下面则是Linux的Release过程：</Text>
				<Image
					source = {{uri: 'https://pic3.zhimg.com/f9d7c5343f3da040f891149a8993ed7e_b.png'}}
					y = {this.state.y}
				/>
				<Text style = {styles.text}>表格源自一本书叫《Linux内核0.11(0.95)完全注释》，简单地再介绍一下：</Text>
				<Text style = {styles.text}>版本0.00是一个hello,world程序</Text>
				<Text style = {styles.text}>版本0.01包含了可以工作的代码</Text>
				<Text style = {styles.text}>版本0.11是基本可以正常的版本</Text>
				<Text style = {styles.text}>1．项目初版本时，版本号可以为 0.1 或 0.1.0, 也可以为 1.0 或 1.0.0，如果你为人很低调，我想你会选择那个主版本号为 0 的方式；</Text>
				<Image
					source = {{uri: 'https://pic3.zhimg.com/25cbb7de9950f4411df061d29b719f4e_b.png'}}
					y = {this.state.y}
				/>
				<Text style = {[styles.text, styles.title]}>假设这是文章详情页，存在很多文字和图片</Text>
				<Text style = {styles.text}>在我阅读的前端库、Python后台库的过程中，我们都是以造轮子为目的展开的。所以在最开始的时候，我需要一个可以工作，并且拥有我想要的功能的版本。</Text>
				<Text style = {styles.text}>紧接着，我就可以开始去实践这个版本中的一些功能，并理解他们是怎么工作的。再用git大法展开之前修改的内容，可以使用IDE自带的Diff工具：</Text>
				<Image
					source = {{uri: 'https://pic3.zhimg.com/6bd6b20fbef9f43e3512cc29cf982ea6_b.png'}}
					y = {this.state.y}
				/>
				<Text style = {styles.text}>或者类似于SourceTree这样的工具，来查看修改的内容。</Text>
				<Text style = {styles.text}>在我们理解了基本的核心功能后，我们就可以向后查看大、中版本的更新内容了。</Text>
				<Text style = {styles.text}>开始之前，我们希望大家对版本号管理有一些基本的认识。</Text>
				<Text style = {styles.text}>我最早阅读的开始软件是Linux，而下面则是Linux的Release过程：</Text>
				<Image
					source = {{uri: 'https://pic3.zhimg.com/f9d7c5343f3da040f891149a8993ed7e_b.png'}}
					y = {this.state.y}
				/>
				<Text style = {styles.text}>表格源自一本书叫《Linux内核0.11(0.95)完全注释》，简单地再介绍一下：</Text>
				<Text style = {styles.text}>版本0.00是一个hello,world程序</Text>
				<Text style = {styles.text}>版本0.01包含了可以工作的代码</Text>
				<Text style = {styles.text}>版本0.11是基本可以正常的版本</Text>
				<Text style = {styles.text}>1．项目初版本时，版本号可以为 0.1 或 0.1.0, 也可以为 1.0 或 1.0.0，如果你为人很低调，我想你会选择那个主版本号为 0 的方式；</Text>
				<Image
					source = {{uri: 'https://pic4.zhimg.com/6a32830fab3b9105fecef3d4f830afe7_b.png'}}
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
	},
	title: {
		fontSize: 20,
		marginTop: 10
	}
})