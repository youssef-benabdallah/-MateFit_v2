import React, {useState} from 'react'
import {Button, ImageBackground, Pressable, StyleSheet, TextInput} from 'react-native'
import { Text, View } from '../components/Themed';


// @ts-ignore
global.token = '';


// @ts-ignore
export default function Signin({navigation}) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    let LoginAPI;
    LoginAPI = async () => {
        try {

            let resp = await fetch('https://matefit-test.herokuapp.com/api/login',
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // email: email,
                        // password: password,

                        // email: 'test@test.test',
                        // password: '12345678',


                        //mate
                         email : 'kevin@matefit.com',
                         password: 'kevinkevin',

                        // mate
                       // email: 'youssef@matefit.com',
                       // password: 'youssefyoussef',

                        //trainer
                        // email: 'trainer@matefit.com',
                        // password: 'trainertrainer',




                    })
                })
            let respJson = await resp.json();
            console.log('token', respJson);
            respJson.token ?(
                console.log('token', respJson.token),
                    // @ts-ignore
                    global.user = respJson,
                navigation.navigate('App')
            ): alert(respJson);

        } catch (e) {
            console.log(e);
        }
    };

    return (



        <View style={styles.container}>
            <ImageBackground
                style={styles.image} source= {{uri: 'https://r1.ilikewallpaper.net/iphone-11-wallpapers/download/79671/Downhill-iphone-11-wallpaper-ilikewallpaper_com.jpg'}}>
                <Text style={styles.text}>Login</Text>
            {/*<Text style={styles.title}>Login</Text>*/}
            {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}

                <TextInput style ={styles.textinputemail}   onChangeText={Email => setEmail(Email)}
                           placeholder="Email"/>
                <TextInput  style ={styles.textinputpassword} key={'password'} onChangeText={Password => setPassword(Password)}
                            secureTextEntry={true}
                            placeholder="Password"
                />


            {/*<TextInput style={styles.inputText} key={'email'} onChangeText={Email => setEmail(Email)}*/}
            {/*           placeholder="Email"/>*/}
            {/*<TextInput style={styles.inputText} key={'password'} onChangeText={Password => setPassword(Password)}*/}
            {/*           secureTextEntry={true}*/}
            {/*           placeholder="Password"*/}
            {/*/>*/}

                <Pressable style={styles.loginbutton} onPress={LoginAPI}>
                    <Text style={styles.loginbuttonText}>Log in</Text>
                </Pressable>

                <Pressable style={styles.signupbutton} onPress={()=>navigation.navigate('Signup')}>
                    <Text style={styles.signupbuttonText}>Sign Up</Text>
                </Pressable>



            {/*<Button onPress={LoginAPI} title="Log in"/>*/}
            {/*{console.log('Hallo')}*/}
            {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
            {/*<Button*/}
            {/*    title='Signup'*/}
            {/*    onPress={() => navigation.navigate('Signup')}*/}
            {/*/>*/}
            </ImageBackground>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputText: {
        height: 50,
        borderRadius: 7,
        width: 250,
        margin: 10,
        borderWidth: 1,
        // textAlign: 'center',
        fontSize: 18,
        fontFamily: 'serif',
        paddingLeft: 5,
    },
    image:{
    flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems:'center',
},
    text:{
        paddingLeft:20,
        fontSize: 16,
        fontWeight: 'bold'

    },
    textinputemail:{
        backgroundColor: 'white',
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 5,


    },

    textinputpassword:{
        backgroundColor: 'white',
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 5,


    },
    loginbutton:{
        backgroundColor: 'white',
        width: 200,
        height: 40,
        borderRadius: 10,
        marginTop: 25,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginbuttonText: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    signupbutton:{
        backgroundColor: 'white',
        width: 200,
        height: 40,
        borderRadius: 10,
        marginTop: 25,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    signupbuttonText:{

        fontSize: 16,
        fontWeight: 'bold',
    },
})