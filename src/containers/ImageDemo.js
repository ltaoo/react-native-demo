import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';

export default class ImageDemo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 300,
			height: 300
		};
	}

	componentDidMount() {
		// 先获取到图片宽高
		Image.getSize('http://app.dongfeng-nissan.com.cn:8004/ATTACHMENT/APP/201607/23/fd696a2d-c9d3-4302-a1e3-7908e4cbecc3.jpg', (w, h) => {
			// alert(w + '||' + h);
	      	// this.setState({width:w, height:h})
	    });
	}

	render() {
		return (
			<View style = {styles.container}>
				<Image 
					source = {{uri: 'http://app.dongfeng-nissan.com.cn:8004/ATTACHMENT//201611/2/cabe4027-9361-4c23-b03b-d54256c583e7.gif'}}
					style = {{width: this.state.width, height: this.state.height}}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})