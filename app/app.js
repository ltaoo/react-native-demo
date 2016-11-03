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
	Platform
} from 'react-native';

// page component
// 首屏组件
import Index from './containers/Index';

// 根组件
export default class App extends Component {
	constructor(props) {
		super(props);
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
			<Navigator 
				initialRoute = {{component: Index}}
				renderScene = {
					(route, navigator) => {
						let Component = route.component;
						return (
							<Component
								name = {route.name}
								onForward = {
									() => {
										let nextIndex = route.index + 1;
										navigator.push({
											name: 'Scene ' + nextIndex,
											index: nextIndex
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
				sceneStyle={{paddingTop: (Platform.OS === 'android' ? 60 : 74)}}
			/>
		)
	}
}