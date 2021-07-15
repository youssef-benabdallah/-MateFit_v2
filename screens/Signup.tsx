import React, {useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View, ScrollView, ImageBackground, Pressable} from 'react-native'
import {StatusBar} from 'expo-status-bar';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from "@react-native-community/datetimepicker";


// @ts-ignore
export default function Signup({navigation}) {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bDate, setBDate] = useState(new Date());
    const [email, setEmail] = useState('');
    const [selectedGenderValue, setSelectedGenderValue] = useState("male");
    const [selectedRoleValue, setSelectedRoleValue] = useState("mate");
    const [dicipline, setDicipline] = useState('');
    const [price, setPrice] = useState(0);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState(null);

    const [dateShow, setDateShow] = useState(false);
    const [date, setDate] = useState(new Date());


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDateShow(false);
        setDate(currentDate);
        setBDate(currentDate);



        console.log(currentDate);
    };

    const _showDate = () => {
        setDateShow(true);
    };

    const showDate = (date: Date) => {
        let year = date.getFullYear().toString();
        let month = (parseInt(date.getUTCMonth().toString()) + 1).toString();
        let day = date.getUTCDate().toString();

        let monthToNumber = parseInt(month);
        let dayToNumber = parseInt(day);

        if (dayToNumber < 10)
            day = '0' + day;
        if (monthToNumber < 10)
            month = '0' + month;

        return year + '-' + month + '-' + day;
    }




    const ShowPriceInput = () => {
        if (selectedRoleValue == 'trainer') {
            return [

                <TextInput keyboardType={"number-pad"} key={'price'} style={{
                    marginLeft: 30,
                    justifyContent: 'center',
                    alignItems: 'center',

                    backgroundColor: 'white',
                    height: 40,
                    width: 180,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 5,}}
                    // @ts-ignore

                           onChangeText={Price => setPrice(Price)}
                           placeholder="Price"
                />,

            ]
        }
    }


    let SignUpAPI;
    SignUpAPI = async () => {
        try {
            let resp = await fetch('https://matefit-test.herokuapp.com/api/join',
                {
                    method: 'post',
                    mode: 'no-cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        lastname: lastName,
                        bDate: showDate(bDate),
                        email: email,
                        gender: selectedGenderValue,
                        role: selectedRoleValue,
                        price: price,
                        dicipline: dicipline,
                        password: password,
                        password2: confirmPassword,
                        // name: 'name',
                        // lastname: 'lastName',
                        // bDate: '06.09.1992',
                        // email: 'test@test.test',
                        // gender: 'male',
                        // role: 'mate',
                        // price: '0',
                        // dicipline: 'box',
                        // password: '12345678',
                        // password2: '12345678',

                    })
                })

            let respJson = await resp.json();
            setData(respJson);
            data ? console.warn(data) : null;

        } catch (e) {
            console.warn(e);
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={{uri: 'https://r1.ilikewallpaper.net/iphone-11-wallpapers/download/79671/Downhill-iphone-11-wallpaper-ilikewallpaper_com.jpg'}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{alignContent: "center", justifyContent: "center"}}

                >


                    <Text></Text>
                    <Text></Text>
                    <Text style={styles.text}> Signup</Text>

                    <View style={{flexDirection: 'row', justifyContent: "space-between", width: '80%'}}>


                        <TextInput style={styles.inputText} key={'name'} onChangeText={Name => setName(Name)}
                                   placeholder="Name"/>
                        <TextInput key={'lastName'} style={styles.inputText}
                                   onChangeText={LastName => setLastName(LastName)}
                                   placeholder="Last Name"/>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: "space-between", width: '80%'}}>

                    <TextInput value={showDate(bDate)} key={'bDate'} style={styles.inputText} onChangeText={BDate => setBDate(BDate)}
                               placeholder="Date of Birthday"
                               placeholderTextColor={'black'}
                    editable={false}
                    />

                    {dateShow && (
                        <DateTimePicker
                            maximumDate={new Date()}
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                        <Pressable style={{backgroundColor: 'white',
                            width: '53%',
                            height: 40,
                            borderRadius: 10,
                            marginTop: 15,
                            marginLeft: 15,
                            justifyContent: 'center',
                            alignItems: 'center',}} onPress={_showDate}>
                            <Text style={styles.loginbuttonText}>Select Date</Text>
                        </Pressable>

                    </View>


                    <View style={{flexDirection: 'row', justifyContent: "space-between", width: '80%'}}>

                        <TextInput key={'email'} style={styles.inputText} onChangeText={Email => setEmail(Email)}
                                   placeholder="Email"/>

                        <TextInput key={'dicipline'} style={styles.inputText}
                                   onChangeText={Dicipline => setDicipline(Dicipline)}
                                   placeholder="Dicipline"/>
                    </View>

                    <View style={{borderWidth:1, width:180, marginLeft:15, marginTop:15}}>

                    <Picker
                        style={styles.selectMenu}
                        key={'gender'}
                        selectedValue={selectedGenderValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedGenderValue(itemValue)}>
                        <Picker.Item label="Male" value="male"/>
                        <Picker.Item label="Female" value="female"/>
                        <Picker.Item label="Other" value="other"/>

                    </Picker>

                    </View>




                    <View style={{ borderWidth:1, width:180, marginLeft:15,flexDirection: 'row', justifyContent: "space-between", marginTop:27, marginBottom:12}}>

                        <Picker
                            style={styles.selectMenu}
                            key={'role'}
                            selectedValue={selectedRoleValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedRoleValue(itemValue)}>
                            <Picker.Item label="Mate" value="mate"/>
                            <Picker.Item label="Trainer" value="trainer"/>
                        </Picker>

                        {ShowPriceInput()}
                    </View>


                    <View style={{flexDirection: 'row', justifyContent: "space-between", width: '80%'}}>

                        <TextInput key={'password'} style={styles.inputText}
                                   onChangeText={Password => setPassword(Password)}
                                   secureTextEntry={true}
                                   placeholder="Password"
                        />
                        <TextInput key={'confirmPassword'} style={styles.inputText}
                                   onChangeText={ConfirmPassword => setConfirmPassword(ConfirmPassword)}
                                   secureTextEntry={true}
                                   placeholder="Confirm Password"
                        />
                    </View>


                    <Pressable style={styles.loginbutton} onPress={SignUpAPI}>
                        <Text style={styles.loginbuttonText}>Sign Up</Text>
                    </Pressable>

                    <Pressable style={styles.loginbutton} onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.loginbuttonText}>Go To Log In</Text>
                    </Pressable>


                    <Text></Text>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',

        // alignItems: 'center',
        justifyContent: 'center'
    },
    selectMenu: {

        marginLeft: 0,
        borderRadius: 7,
        borderColor: "black",
        // backgroundColor : '#f1f1f1',
        height: 40,
        width: 177,
        backgroundColor: "#FFFFFF",

    },
    // inputText: {
    //     height: 50,
    //     borderRadius: 7,
    //     width: 250,
    //     margin: 10,
    //     borderWidth: 2,
    //     // textAlign: 'center',
    //     paddingLeft: 5,
    //
    //
    // },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center'
    },

    inputText: {
        marginTop: 15,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        height: 40,
        width: 180,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 5,


    },
    loginbutton: {
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
    text: {
        paddingLeft: 20,
        fontSize: 16,
        fontWeight: 'bold'

    },
})