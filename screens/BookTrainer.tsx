import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button , TextInput} from 'react-native';
import { withNavigation } from 'react-navigation';
import { useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
export default function BookTrainer ({navigation,route}){


    // Time & Date Variable
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

















    const profileID = route.params.profileID;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [maxppl, setMaxppl] = useState('');


    const book = async ()=> {
        await fetch('https://matefit-test.herokuapp.com/api/booking',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + global.user.token,
                },
                body: JSON.stringify({
                    trainer_id : profileID,
                    mate_id : global.user.id,
                    title : title,
                    description : description,
                    location : location,
                    time : showDate(date) + ' ' + showTime(time),
                    maxppl : maxppl
                })
            }).then(res => res.json())
            .then(res => {
                alert('Booking request sended')
                console.log('hallo',res);
            }).catch((error)=>{
                console.error(error)
            })
    }


    return (
        <View>
            <Text>Title</Text>
            <TextInput key={'Title'}
                       onChangeText = {
                           (Title)=> {
                               setTitle(Title);
                           }
                       }style={styles.inputText}/>
            <Text>Description</Text>
            <TextInput key={'Description'}
                       onChangeText = {
                           (Description)=> {
                               setDescription(Description);

                           }
                       }style={styles.inputText}/>
            <Text>Adress</Text>
            <TextInput key={'Location'}
                       onChangeText = {
                           (Location)=> {
                               setLocation(Location);

                           }
                       }style={styles.inputText}/>
            <Text>Number of participants</Text>
            <TextInput key={'Maxppl'}
                       onChangeText = {
                           (Maxppl)=> {
                               setMaxppl(Maxppl);
                           }
                       }style={styles.inputText}/>


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

            <Text>Date and Time</Text>
            <Text> {showDate(date)}</Text>
            <Text> {showTime(time)}</Text>

            <Button onPress={book} title='Send booking request'></Button>
        </View>
    );
}

const styles = StyleSheet.create({




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
        backgroundColor:'white',
        fontWeight:"bold"
    }
})