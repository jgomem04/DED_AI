import React from "react";
import {View, StyleSheet} from "react-native";
import {Text, Button} from 'react-native-paper';
import {StackActions} from '@react-navigation/native';
import theme from "../theme";

export default function Error({route, navigation}){
    const { analysisToRetry } = route.params;
    const { feedbackToRetry } = route.params;
    const { credentialsToRetry } = route.params;
    const { token } = route.params;
    const { aSample } = route.params;
    const { message } = route.params;

    function retry(){
        if(analysisToRetry !== undefined){
            navigation.dispatch(StackActions.replace('Loading', {toAnalyze: analysisToRetry, accessToken: token}));
        }else if(feedbackToRetry !== undefined){
            navigation.dispatch(StackActions.replace('Loading', {feedback: feedbackToRetry, sample: aSample, accessToken: token}));
        }else if(credentialsToRetry !== undefined){
            navigation.dispatch(StackActions.replace('Loading', {credentials: credentialsToRetry}))
        }
    }

    function goBack(){
        if(credentialsToRetry !== undefined){
            navigation.dispatch(StackActions.replace('Login'))
        }else{
            navigation.dispatch(StackActions.replace('Welcome', {accessToken: token}))
        }
    }

    return(
        <View style={styles.mainContainer}>
            <View styles={styles.titleParagraphContainers}>
                <Text style={styles.title}>
                    Error
                </Text>
            </View>

            <View style={styles.titleParagraphContainers}>
                <Text style={styles.paragraph}>{message}</Text>
            </View>

            <View style={styles.buttonsCotainer}>
                <Button style={styles.button} labelStyle={styles.buttonFont} icon="refresh" mode="outlined" onPress={() => {retry()}}>
                    Reintentar
                </Button>
                <Button style={styles.button} labelStyle={styles.buttonFont} icon="home" mode="outlined" onPress={() => {goBack()}}>
                    Volver
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: theme.flexes.default,
        backgroundColor: theme.colors.background,
        alignItems: theme.aligns.center,
        justifyContent: theme.aligns.center
    },
    titleParagraphContainers: {
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
})