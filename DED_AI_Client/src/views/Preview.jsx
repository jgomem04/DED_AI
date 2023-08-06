import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {StackActions} from '@react-navigation/native';
import theme from "../theme";

export default function Preview({ route, navigation }){
    const { toPreview } = route.params;
    const { token } = route.params;
    
    return(
        <View style={styles.mainContainer}>
            <View styles={styles.titleImageContainers}>
                <Text style={styles.title}>
                    Vista previa
                </Text>
            </View>

            <View style={styles.titleImageContainers}>
                <Image source={{ uri: toPreview.uri }} style={styles.image}/>
            </View>

            <View style={styles.buttonsCotainer}>
                <Button style={styles.button} labelStyle={styles.confirmationButtonFont} icon="check" mode="outlined" onPress={() => {navigation.dispatch(StackActions.replace('Loading', {toAnalyze: toPreview, accessToken: token}))}}>
                    Confirmar
                </Button>
                <Button style={styles.button} labelStyle={styles.cancelButtonFont} icon="close" mode="outlined" onPress={() => {navigation.dispatch(StackActions.replace('Welcome', {accessToken: token}))}}>
                    Cancelar
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
    titleImageContainers: {
        margin: theme.margins.default
    },
    buttonsCotainer: {
        flexDirection: theme.directions.row
    },
    title: {
        fontSize: theme.fontSizes.title
    },
    image: {
        height: theme.thumbnails.height,
        width: theme.thumbnails.width,
        borderRadius: theme.borders.default
    },
    button: {
        borderRadius: theme.borders.default,
        margin: theme.margins.tiny
    },
    confirmationButtonFont: {
        fontSize: theme.fontSizes.button,
        color: theme.colors.green
    },
    cancelButtonFont: {
        fontSize: theme.fontSizes.button,
        color: theme.colors.red
    }
});