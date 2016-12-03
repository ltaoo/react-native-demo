import React, {
    Component
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import {
    LazyloadScrollView,
    LazyloadImage
} from 'react-native-lazyload';

let image = require('../images/default.jpg');

class LazyloadImageExample extends Component {
    render() {
        return (
            <LazyloadScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                name="scrollImage"
            >
                {Array.apply(null, Array(100)).map((file, i) => <View
                    key={i}
                >
                    <LazyloadImage
                        host="scrollImage"
                        style={styles.image}
                        source={image}
                        animation={false}
                    />
                </View>)}
            </LazyloadScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    content: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 80,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: 'cover',
        backgroundColor: '#eee'
    }
});

export default LazyloadImageExample;