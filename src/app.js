import React, {
	Component
} from 'react';
import {
	StyleSheet,
	View,
	Text,
	// 导航
	Navigator,
	TouchableOpacity,
	Platform,
	BackAndroid,
	DeviceEventEmitter
} from 'react-native';

// page component
// 首屏组件
import Index from './containers/Index';
// common component
import Alert from './components/Alert';

// 根组件
export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			alert: false
		};
	}

	// 处理物理返回键
	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', this.handleBack.bind(this));
		// 处理自定义 Alert
		DeviceEventEmitter.addListener("alert", (content = '')=>{
			// alert('showAlert')
			if(!content) {
				setTimeout(() => {
					this.setState({
						alert: false,
					})
				}, 3000);
			} else {
				this.setState({
					alert: true,
					content
				})
			}
		});
	}

	// 处理返回键
	handleBack() {
		let navigator = this.refs.navigator;
		const routers = navigator.getCurrentRoutes();
	    if (routers.length === 1) {
	    	// 如果不在，就是后退，不然就是退出应用
	    	BackAndroid.exitApp();
		    return false;
	    }else {
	       	navigator.pop();
	       	return true;
	    }
	}
	// 组件被卸载
	componentWillUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress');
	}

	// 渲染导航条
	_renderNavBar() {
		const styles = {
			title: {
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center'
			},
			button: {
				flex: 1,
				width: 50,
				alignItems: 'center',
				justifyContent: 'center'
			},
			buttonText: {
				fontSize: 18,
				color: '#FFFFFF',
				fontWeight: '400'
			}
		}

		let routeMapper = {
			LeftButton(route, navigator, index, navState) {
				if (index > 0) {
					return (
						<TouchableOpacity 
			              	onPress={() => navigator.pop()}
			              	style={styles.button}>
			              	<Text style={styles.buttonText}>Back</Text>
	            		</TouchableOpacity>
					);
				} else {
					return (
						<TouchableOpacity 
			              	onPress={() => navigator.pop()}
			              	style={styles.button}>
			              	<Text style={styles.buttonText}>Logo</Text>
	            		</TouchableOpacity>
					);
				}
			},
			RightButton(route, navigator, index, navState) {
				if (index > 0 && route.rightButton) {
					return (
						<TouchableOpacity 
			              	onPress={() => navigator.pop()}
			              	style={styles.button}>
			              	<Text style={styles.buttonText}></Text>
			            </TouchableOpacity>
					);
				} else {
					return null
				}

			},
			Title(route, navigator, index, navState) {
				return (
					<View style={styles.title}>
	            		<Text style={styles.buttonText}>{route.name ? route.name : '首页'}</Text>
	          		</View>
				);
			}
		};
		return (
	      	<Navigator.NavigationBar
		        style={{
		          	alignItems: 'center',
		          	backgroundColor: '#55ACEE',
		          	shadowOffset:{
		              	width: 1,
		              	height: 0.5,
		          	},
		          	shadowColor: '#55ACEE',
		          	shadowOpacity: 0.8,          
		        }}
		        routeMapper={routeMapper}
		    />
	    );
	}

	render() {
		return (
			<View style = {{flex: 1}}>
				<Navigator 
					ref = 'navigator'
					initialRoute = {{component: Index}}
					renderScene = {
						(route, navigator) => {
							let Component = route.component;
							return (
								<Component
									name = {route.name}
									onForward = {
										(name, component) => {
											let nextIndex = route.index + 1;
											navigator.push({
												name: name || ('Scene ' + nextIndex),
												index: nextIndex,
												component
											});
										}
									}
									onBack = {
										() => {
											if (route.index > 0) {
												navigator.pop();
											}
										}
									}
									navigator = {navigator}
									{...route.params}
								/>
							)
						}
					}
					navigationBar = {this._renderNavBar.call(this)}
					sceneStyle={{paddingTop: (Platform.OS === 'android' ? 60 : 65)}}
				/>
				<Alert 
					visible = {this.state.alert}
					content = {this.state.content}
				/>
			</View>
		)
	}
}