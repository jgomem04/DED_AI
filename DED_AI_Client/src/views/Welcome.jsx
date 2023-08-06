import React from "react";
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import theme from "../theme";

export default function Welcome({ route, navigation }){
    const { accessToken } = route.params;

    const onButtonPress = async (type) => {
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.2,
            base64: true
        }

        let result = null;

        if(type === 'camera'){
            result = await ImagePicker.launchCameraAsync(options);
        }else{
            result = await ImagePicker.launchImageLibraryAsync(options);
        }

        if(!result.canceled){
            navigation.navigate('Preview', {toPreview: result.assets[0], token: accessToken});
        }
    };

    return(
        <View style={styles.mainContainer}>
            <View styles={styles.paragraphTitleContainers}>
                <Text style={styles.title}>
                    Bienvenido
                </Text>
            </View>

            <View style={styles.paragraphTitleContainers}>
                <Text style={styles.paragraph}>
                    Para analizar una imagen en busca de retinopatías, puede tomarla con la cámara de su teléfono, o bien seleccionarla de la galería.
                </Text>
            </View>
            
            <View style={styles.buttonsCotainer}>
                <Button style={styles.button} labelStyle={styles.buttonFont} icon="camera" mode="outlined" onPress={() => {onButtonPress('camera')}}>
                    Cámara
                </Button>
                <Button style={styles.button} labelStyle={styles.buttonFont} icon="view-gallery" mode="outlined" onPress={() => {onButtonPress('gallery')}}>
                    Galería
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: theme.flexes.default,
        backgroundColor: theme.colors.background,
        alignItems: theme.aligns.center,
        justifyContent: theme.aligns.center
    },
    paragraphTitleContainers: {
        margin: theme.margins.default
    },
    buttonsCotainer: {
        flexDirection: theme.directions.row
    },
    title: {
        fontSize: theme.fontSizes.title
    },
    paragraph: {
        fontSize: theme.fontSizes.paragraph,
        textAlign: theme.aligns.justify
    },
    button: {
        borderRadius: theme.borders.default,
        margin: theme.margins.default
    },
    buttonFont: {
        fontSize: theme.fontSizes.button
    }
});