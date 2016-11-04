'use strict';
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	ListView,
	Text,
	TouchableOpacity
} from 'react-native';

export default class ListViewDemo extends Component {
	constructor(props) {
		super(props);
		// 初始化数据
		let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		// mock 数据
		let data = [{
			name: 'react-native'
		}, {
			name: 'react'
		}, {
			name: 'redux'
		}, {
			name: 'react-router'
		}];
		data = data.map(item=> {
			item.isCheck = 'false';
			return item;
		})
		// 初始化 state
		this.state = {
			data: data,
			ds: ds.cloneWithRows(data),
			// 选中数组
			selected: []
		};
	}
	// 单列样式
	_renderRow(row, sectionId, rowId) {
		// 判断该行是否已被选中
		let isSelected = this.state.selected.indexOf(row) > -1;
		return (
			<TouchableOpacity 
				style = {[styles.item, {backgroundColor: isSelected ? 'red' : 'white'}]}
				onLongPress = {()=> {
					this.delete.call(this, row);
				}}
				onPress = {()=> {
					this.select.call(this, row);
				}}
			>
				<Text>{row.name}</Text>
				<Text>{row.isCheck}</Text>
			</TouchableOpacity>
		)
	}
	// 增加行函数
	add() {
		let newData = {
			name: 'vue',
			isCheck: 'false'
		};
		let oldDataAry = [...this.state.data];
		let newDataAry = [...oldDataAry, newData];
		let newDs = this.state.ds.cloneWithRows(newDataAry);
		this.setState({
			data: newDataAry,
			ds: newDs
		});
	}
	// 删除指定行
	delete(row) {
		let oldDataAry = [...this.state.data];
		let index = oldDataAry.indexOf(row);
		oldDataAry.splice(index, 1);
		let newDataAry = oldDataAry;
		let newDs = this.state.ds.cloneWithRows(newDataAry);
		this.setState({
			data: newDataAry,
			ds: newDs
		});
	}
	// 点击选中
	select(row) {
		// 
		let oldSelectAry = [...this.state.selected];
		let newSelectAry = [...oldSelectAry, row];
		// 重新渲染 dataSource
		let oldDataAry = [...this.state.data];
		
		let newDataAry = new Array();
		// 对旧数据中的值进行更新
		newDataAry = oldDataAry.filter(item=> {
			if(item === row) {
				item.isCheck = 'true';
				return item;
			}
			else {
				return item;
			}
		});
		let newDs = this.state.ds.cloneWithRows(newDataAry);
		this.setState({
			selected: newSelectAry,
			data: newDataAry,
			ds: newDs
		});
	}
	//
	render() {
		return (
			<View style = {styles.container}>
				<ListView
					style = {styles.list}
					dataSource = {this.state.ds}
					renderRow = {this._renderRow.bind(this)}
					enableEmptySections = {true}
				/>
				<TouchableOpacity
					style = {styles.btn}
					onPress = {this.add.bind(this)}
				>
					<Text>增加行</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee'
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
		flexDirection: 'row',
		justifyContent: 'space-between'
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