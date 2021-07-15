import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {createStackNavigator} from "@react-navigation/stack";
import useColorScheme from '../hooks/useColorScheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from "@react-navigation/native";
import Navigation from "../navigation";
import TabOneScreen from "./DashBoard";
import ActivityPost from "./ActivityPost";
import {StatusBar} from "expo-status-bar";




export default function Home({navigation}) {
    const Stack = createStackNavigator();
    const colorScheme = useColorScheme();


    return (
        <SafeAreaProvider>

            <Navigation colorScheme={colorScheme} />
            {/*<Button*/}
            {/*    title='Sign IN'*/}
            {/*    onPress={() => navigation.navigate('Auth')}*/}
            {/*/>*/}

            <StatusBar/>
        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})