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
			/>
		)
	}
}