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

let index = 1;
let pageSize = 5;
export default class ListViewDemo extends Component {
	constructor(props) {
		super(props);
		// 初始化 state
		this.state = {
			loading: true,
			// is click load more ?
			loadingMore: false,
			data: [],
			dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
			// 选中数组
			selected: []
		};
	}
	// 
	componentDidMount() {
		// get data from server
		fetch('https://api.douban.com/v2/book/search?q=react&count='+pageSize)
			.then(res=> {
				if(res.status === 200) {
					// parse response
					let data = JSON.parse(res._bodyInit).books;
					data = data.map(item=> {
						item.isCheck = false;
						return item;
					});
					this.setState({
						loading: false,
						data: data,
						dataSource: this.state.dataSource.cloneWithRows(data)
					});
					pageSize += 1;
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
				onLongPress = {this.delete.bind(this, row)}
				onPress = {this.select.bind(this, row)}
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
					<Text>{row.isCheck ? 'YES' : 'NO'}</Text>
				</View>
			</TouchableOpacity>
		)
	}
	// load more data from server
	loadMore() {
		this.setState({
			loadingMore: true
		});
		let page = (index-1)*pageSize;
		fetch(`https://api.douban.com/v2/book/search?q=react&start=${page}&count=${pageSize}`)
			.then(res=> {
				if(res.status === 200) {
					// parse response
					let response = JSON.parse(res._bodyInit).books;
					if(response.length === 0) {
						alert('no data response');
						return;
					}else {
						response = response.map(item=> {
							item.isCheck = false;
							return item;
						})
						let oldAry = [...this.state.data];
						let newAry = [...oldAry, ...response];
						this.setState({
							loading: false,
							loadingMore: false,
							data: newAry,
							dataSource: this.state.dataSource.cloneWithRows(newAry)
						});
						index += 1;
					}
				}
			})
			.catch(err=> {
				alert(JSON.stringify(err));
			})
	}

	// 
	// 删除指定行
  delete(row) {
    let oldAry = [...this.state.data];
    let index = oldAry.indexOf(row);
    oldAry.splice(index, 1);
    let newAry = oldAry;
    this.setState({
      data: newAry,
      dataSource: this.state.dataSource.cloneWithRows(newAry)
    });
  }

  // choose a item
  // 点击选中
  select(row) {
    let oldAry = [...this.state.data];
    let index = oldAry.indexOf(row);
    // 对旧数据中的值进行更新
    let newRow = Object.assign({}, row, {
		    ﻿isCheck: !row.isCheck
		});
    let newAry = [
    	...oldAry.slice(0, index),
    	newRow,
    	...oldAry.slice(index+1)
    ];
    this.setState({
      data: newAry,
      dataSource: this.state.dataSource.cloneWithRows(newAry)
    });
  }

	_renderFooter() {
		if(this.state.loadingMore) {
			return (
				<View
					style = {{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}
				>
					<Text>loading...</Text>
				</View>
			)
		}
		return (
			<TouchableOpacity
				onPress = {this.loadMore.bind(this)}
				style = {{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}
			>
				<Text>click it load more</Text>
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
					renderFooter = {this._renderFooter.bind(this)}
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