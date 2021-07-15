import {Button, View} from "react-native";
import * as React from "react";

export default function SettingsScreen({navigation}) {
    return (

        <View>
<Button title={'Go To'} onPress={()=>navigation.navigate('Feed') }/>
        </View>
    // {navigation.navigate('Settings');}

);
}