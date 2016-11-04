'use strict';
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	ListView,
	Text,
	TouchableOpacity,
	Image,
	// width and height of screen
	Dimensions
} from 'react-native';

let {height, width} = Dimensions.get('window');

export default class ListViewDemo extends Component {
	constructor(props) {
		super(props);
		// 初始化 state
		this.state = {
			loading: true,
			data: [],
			dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
			// 选中数组
			selected: []
		};
	}
	// 
	componentDidMount() {
		// get data from server
		fetch('https://api.douban.com/v2/book/search?q=react&count=10')
			.then(res=> {
				if(res.status === 200) {
					// parse response
					let data = JSON.parse(res._bodyInit).books;
					this.setState({
						loading: false,
						data: data,
						dataSource: this.state.dataSource.cloneWithRows(data)
					})
				}
			})
			.catch(err=> {
				alert(JSON.stringify(err));
			})
	}
	// 单列样式
	_renderRow(row, sectionId, rowId) {
		// 判断该行是否已被选中
		let isSelected = this.state.selected.indexOf(row) > -1;
		return (
			<TouchableOpacity 
				style = {[styles.item, {backgroundColor: isSelected ? 'red' : 'white'}]}
			>
				<Image
					source = {{uri: row.image}}
					style = {{width: 85, height: 120, marginRight: 20}}
					resizeMode = 'stretch'
				/>
				<View style = {{flexDirection: 'column', width: width-150}}>
					<Text style = {{fontSize: 16}}>{row.title}</Text>
					<Text
						numberOfLines = {3}
						style = {{color: '#ccc'}}
					>{row.summary}</Text>
				</View>
			</TouchableOpacity>
		)
	}
	//
	render() {
		if(this.state.loading) {
			// if is loading
			return (
				<View style = {styles.empty}>
					<Text>loading...</Text>
				</View>
			)
		}
		return (
			<View style = {styles.container}>
				<ListView
					style = {styles.list}
					dataSource = {this.state.dataSource}
					renderRow = {this._renderRow.bind(this)}
					enableEmptySections = {true}
					initialListSize = {4}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee'
	},
	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	list: {

	},
	item: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: '#ccc',
		// 
		flexDirection: 'row'
	},
	btn: {
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: '#ccc',
		borderRadius: 5
	}
});