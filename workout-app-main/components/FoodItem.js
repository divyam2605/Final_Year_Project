import { View, Text, StyleSheet, Pressable, ImageBackground, Platform, Image } from 'react-native';

function FoodItem({title, imageUrl, style}) {
    const imageMap = {
        poha: require('../assets/images/FoodItems/poha.jpg'),
        upma: require('../assets/images/FoodItems/upma.jpg'),
        idli: require('../assets/images/FoodItems/idli.jpg'),
        dosa: require('../assets/images/FoodItems/dosa.jpg'),
        salad: require('../assets/images/FoodItems/salad.jpg'),
    };

    const image = imageMap[imageUrl];
    return (
        <ImageBackground
            source={image}
            resizeMode="cover"
            style={{ height: 200 }}
        >
            <Pressable
                android_ripple={{ color: 'grey' }}
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressediOS : null]} 
            >
                <View style={styles.bodyPartElement}>
                    <Text style={styles.bodyPartText}>{title}</Text>
                </View>
            </Pressable>
        </ImageBackground>
    )
}

export default FoodItem;

const styles = StyleSheet.create({
    bodyPartItem: {
        flex: 1,
        marginBottom: 4,
        height: 200,
        elevation: 18,
    },
    bodyPartLastItem: {
        flex: 1,
        height: 200,
        elevation: 18,
    },
    button: {
        flex: 1,
        borderRadius: 10
    },
    buttonPressediOS: {
        opacity: 0.5
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    bodyPartElement: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    bodyPartText: {
        color: 'white',
        fontSize: 24,
        marginLeft: 64
    },
})