'use strict';

import React, {Component} from 'react';

import {

  StyleSheet,

  View,

  ListView,

  Text,

  Image,

  // width and height of screen

  Dimensions,

  TouchableOpacity

} from 'react-native';



let {height, width} = Dimensions.get('window');

// 从豆瓣api一次获取多少条数据


let pageSize = 5;


export default class ListViewDemo extends Component {

  constructor(props) {

    super(props);

    // 初始化 state

    this.state = {

      loading: true,

      data: [],

      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),

      index: 2,

      seletedAry: []

    };

  }

  // 

  componentDidMount() {

    // 从豆瓣api获取数据，搜索react相关的书籍

    fetch('https://api.douban.com/v2/book/search?q=react&count='+pageSize)

      .then(res=> {

        if(res.status === 200) {

          // parse response

          let data = JSON.parse(res._bodyInit).books;

          this.setState({

            loading: false,

            data: data,

            dataSource: this.state.dataSource.cloneWithRows(data)

          });

        }

      })

      .catch(err=> {

        alert(JSON.stringify(err));

      })

  }

  // 单列样式

  _renderRow(row, sectionId, rowId) {
    return (

      <TouchableOpacity 

        style = {styles.item}
        onLongPress = {this.delete.bind(this, row)}
        onPress = {this.choose.bind(this, row)}
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

  loadMore() {

  // 当点击按钮时，就把底部按钮设置为 loading 状态。

    this.setState({

      loadingMore: true

    });

  // 为了实现分页，初始化 state 时加上一个属性 index，初始值为2，因为加载更多的时候就是在加载第二页了

    let start = (this.state.index-1)*pageSize;

    fetch(`https://api.douban.com/v2/book/search?q=react&start=${start}&count=${pageSize}`)

      .then(res=> {

        if(res.status === 200) {

          // parse response

          let response = JSON.parse(res._bodyInit).books;

          if(response.length === 0) {

            alert('no data response');

            return;

          }else {

            let oldAry = [...this.state.data];

            let newAry = [...oldAry, ...response];

            this.setState({

              loading: false,

              loadingMore: false,

              data: newAry,

              dataSource: this.state.dataSource.cloneWithRows(newAry),

              index: this.state.index+1

            });

          }

        }

      })

      .catch(err=> {

        alert(JSON.stringify(err));

      })

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
  choose(row) {
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

    let oldSelectedAry = [...this.state.seletedAry];
    let newSelectedAry = [];
    let seletedIndex = oldSelectedAry.indexOf(row);
    if(seletedIndex > -1) {
      oldSelectedAry.splice(seletedIndex, 1);
      newSelectedAry = oldSelectedAry;
    }else {
      newSelectedAry = [...oldSelectedAry, newRow];
    }
    this.setState({
      data: newAry,
      dataSource: this.state.dataSource.cloneWithRows(newAry),
      seletedAry: newSelectedAry
    });
  }

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
        <Text>{this.state.seletedAry.length+'/'+this.state.data.length}</Text>
        <ListView

          dataSource = {this.state.dataSource}

          renderRow = {this._renderRow.bind(this)}

          initialListSize = {4}

          // hidden scroller

          showsVerticalScrollIndicator = {false}
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

  item: {

    paddingVertical: 10,

    paddingHorizontal: 20,

    borderBottomWidth: 1,

    borderStyle: 'solid',

    borderColor: '#ccc',

    flexDirection: 'row'

  }
});