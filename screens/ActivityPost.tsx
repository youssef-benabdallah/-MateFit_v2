import * as React from 'react';
import {Button, Platform, ScrollView, StyleSheet, TextInput} from 'react-native';

import { Text, View } from '../components/Themed';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';


// @ts-ignore
export default function ActivityPost({navigation}) {
    const ApiKey = 'AIzaSyAHenjJYVRsj5kVTKTmFZbdSfGvn1zk3vI';
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [dateShow, setDateShow] = useState(false);
    const [timeShow, setTimeShow] = useState(false);


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

    const showTime = (date: Date) => {
        let minutes = date.getMinutes().toString();
        let hours = date.getHours().toString();

        let minutesToNumber = parseInt(minutes);
        let hoursToNumber = parseInt(hours);

        if (minutesToNumber < 10)
            minutes = '0' + minutes;
        if (hoursToNumber < 10)
            hours = '0' + hours;

        return hours + ':' + minutes + ':00';
    }


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDateShow(false);
        setDate(currentDate);


        console.log(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTimeShow(false);
        setTime(currentTime);

        console.log(currentTime);
    };


    const _showDate = () => {
        setDateShow(true);
    };
    const _showTime = () => {
        setTimeShow(true);
    };


    const [selectedAddress, setSelectedAddress] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    // const [time, setTime] = useState('');
    const [price, setPrice] = useState(0);
    const [maxppl, setMaxppl] = useState('');


    const PostActivty = async () => {

        await fetch('https://matefit-test.herokuapp.com/api/activity',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    Authorization: 'Bearer ' + global.user.token,
                },
                body: JSON.stringify({
                    title : title,
                    description : description,
                    location : location,
                    time : showDate(date) + ' ' + showTime(time) ,
                    price : price,
                    maxppl : maxppl,

                    // title : "Fußball",
                    // description : "Deutschland gegen Tunesien",
                    // location : "Oldenburger Straße 19, Berlin, Germany",
                    // time : "2021-06-20 17:03:41",
                    // price : 20,
                    // maxppl : "90",
                })
            }).then(res => res.json())
            .then(res => {
                alert("Successful Post")
                console.log(res);
            }).catch((error)=>{
                console.error(error)
            })

    }



    const [data, setData] = useState(null);

    const showSelectedAdress = () => {
        getCordinate();
    }

    // Read From Api
    let getCordinate = async () => {
        const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + selectedAddress + '&key=' + ApiKey;
        const resp = await fetch(uri);
        // console.log(uri);
        const respJson = await resp.json();
        await setData(respJson);
        data ? console.log(respJson.results[0].geometry.location) : console.log('null');
        console.log(uri);

    }




    return (

    <View key={'View1'} style={styles.container}>




        <Text></Text>
        <Text style={styles.title}>Activity Post</Text>
      <View key={'View2'} style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Text>Adress</Text>
        <GooglePlacesAutocomplete
            key={'GooglePlacesAutocomplete'}
            placeholder='Search Address'
            onPress={(getAddressText) => {
                setLocation(getAddressText.description);
                // console.log('description', selectedAdress);
            }}

            // onPress={(data, details = null) => {
            //     // 'details' is provided when fetchDetails = true
            //     console.log(data, details);
            // }}
            query={{
                key: ApiKey,
                language: 'en',
            }}
            styles={{
                container: {
                    flex: 0,
                },
                textInputContainer: {
                    borderWidth: 1,
                    borderRadius: 7,
                    margin:10,
                    marginTop:20,
                    width:'80%',

                },
                textInput: {
                    // backgroundColor: '#FFFFFF',
                    color:'black',
                    height: 24,
                    width:'100%',
                    marginTop:7,
                    marginRight:0,
                    paddingTop:2,
                    paddingLeft: 5,
                    paddingRight: 0,
                    fontSize: 15,
                    flex: 0,
                },
                poweredContainer: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderColor: '#c8c7cc',
                    borderTopWidth: 0.5,
                },
                powered: {},
                listView: {
                },
                row: {
                    backgroundColor: '#FFFFFF',
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                },
                separator: {
                    height: 0.5,
                    backgroundColor: '#c8c7cc',
                },
                description: {},
                loader: {
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    height: 20,
                },
            }}
        />


<ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    style={ { width: '100%', marginTop: 10}}
    contentContainerStyle={{width:'100%', alignItems:'center'}}


>

        <Text></Text>
        <Text>Title</Text>
        <TextInput key={'Title'}
                   style={styles.inputText}
                   onChangeText = {
                       (Title)=> {
                           setTitle(Title);

                       }
                   }/>
        <Text>Description</Text>
        <TextInput key={'Description'}
                   style={styles.inputText}
                   onChangeText = {
                       (Description)=> {
                           setDescription(Description);

                       }
                   }/>
    <Text>Participants</Text>
    <TextInput key={'Maxppl' }
               style={styles.inputText}
               onChangeText = {
                   (Maxppl)=> {
                       setMaxppl(Maxppl);
                   }
               }/>

        <Text>Date and Time</Text>
    <Text> {showDate(date)}</Text>
    <Text> {showTime(time)}</Text>
    {timeShow && (
        <DateTimePicker
            key={'TimePicker'}
            minimumDate={new Date()}
            testID="dateTimePicker"
            value={date}
            mode='time'
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
            minuteInterval={15}

        />

    )}



    {dateShow && (
        <DateTimePicker
            key={'DatePicker'}
            minimumDate={new Date()}
            testID="dateTimePicker"
            value={date}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
        />
    )}


    <Button key={'_showTimeKey'} onPress={_showTime} title="Select Time" />

    <Button key={'_showDateKey'} onPress={_showDate} title="Select Date" />




    <Button key={'PostActivtyButton'} onPress={PostActivty} title='Post Activity'></Button>
</ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
        height: 30,
        borderRadius: 7,
        width: '80%',
        margin: 10,
        marginTop: 10,
        borderWidth: 1,
        // textAlign: 'center',
        fontSize: 16,
        fontFamily: 'serif',
        paddingLeft: 5,
    },
    GooglePlacesAutocomplete:{

    }
});
