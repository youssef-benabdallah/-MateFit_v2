import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from '../components/Themed';
import {useEffect, useState} from "react";

import {Ionicons, MaterialIcons } from "@expo/vector-icons";



// @ts-ignore
export default function DashBoard({navigation}) {

    // console.log(global.user.type);

    const [activities, setActivities] = useState([]);
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        // Interval to update count


        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            Load();
            if(global.user.role=="mate")
                BookingLoad();
            console.log(global.user.name);
        });

        return () => {
            // Clear setInterval in case of screen unmount
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
    }, [navigation]);


    const Load = async ()  => {
        await fetch('https://matefit-test.herokuapp.com/api/activity/myactivities',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                setActivities(res)

            }).catch((error) => {
            console.error(error)
        })
    };

    const BookingLoad = async ()  => {
        await fetch('https://matefit-test.herokuapp.com/api/booking/accepted',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                setBookings(res)

            }).catch((error) => {
                console.error(error)
            })
    };



    const show_price = (type: string, price: number) => {
        if (type == "event" )
            return [ <View key={'activityView4' + price}style={styles.row2}>
                <MaterialIcons name="attach-money" size={24} color="#EF6461" />
                <Text style ={styles.price} key={'price' + price}> {price} € </Text>
            </View>
                ]

    }

    const activity_template = (activities: any[]) => {
        return (
            activities.map((activity) => {
                return [
                    <TouchableOpacity style= {styles.component} key={'TouchableOpacity' + activity.id} onPress={() => navigation.navigate('Activity',{activity:activity})}>

                        <View key={'activityView1' + activity.id} style={styles.row}>
                            <Text style ={styles.title} key={'title' + activity.id}>{activity.title.toUpperCase()}</Text>
                            <Text style ={styles.type} key={'type' + activity.id}>{activity.type.toUpperCase()}</Text>
                        </View>

                        <View key={'activityView2' + activity.id}style={styles.row2}>
                            <Ionicons key={'icon1' + activity.id} name="location" size={20} color="#EF6461" />
                            <Text style ={styles.location} key={'location' + activity.id}>{activity.location.toUpperCase()}</Text>
                        </View>


                        {show_price(activity.type, activity.price)}



                        <View key={'activityView3' + activity.id} style={styles.row1}>
                            <Ionicons key={'icon2' + activity.id} name="time" size={20} color="#EF6461"/>
                            <Text style ={styles.time} key={'time' + activity.id}>{activity.time.substring(0,16)}</Text>
                        </View>

                    </TouchableOpacity>,

                ]
            })
        )

    }

    const booking_template = () => {
        if (bookings.length != 0)
        return (
            bookings.map((booking) => {
                return [
                    <TouchableOpacity style= {styles.component} key={'TouchableOpacity' + booking.id}>

                        <View key={'bookingView1' + booking.id} style={styles.row}>
                            <Text style ={styles.title} key={'title' + booking.id}>{booking.title.toUpperCase()}</Text>
                            <Text style ={styles.type} key={'type' + booking.id}>Booking</Text>
                        </View>

                        <View key={'bookingView2' + booking.id}style={styles.row2}>
                            <Ionicons key={'icon1' + booking.id} name="location" size={20} color="#EF6461" />
                            <Text style ={styles.location} key={'location' + booking.id}>{booking.location.toUpperCase()}</Text>
                        </View>


                        {show_price(booking.type, booking.price)}



                        <View key={'bookingView3' + booking.id} style={styles.row1}>
                            <Ionicons key={'icon2' + booking.id} name="time" size={20} color="#EF6461"/>
                            <Text style ={styles.time} key={'time' + booking.id}>{booking.time.substring(0,16)}</Text>
                        </View>

                    </TouchableOpacity>,

                ]
            })
        )

    }


    return (
        <View style={styles.container}>

            <Text style={styles.title1}>Dashboard</Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {booking_template()}
                {activity_template(activities)}
            </ScrollView>
            {/*<FlatList data={activities} renderItem={({item}) => activity_template(item)}/>*/}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#E8E9EB',
        width:'100%',

    },
    // title: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    // },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    map: {
        width: 330,
        // width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').height,
        height: 330,
        position: 'relative',
        margin:15,
        marginTop:50,
        borderWidth: 1,
        justifyContent: 'center',
    },
    component:{
        backgroundColor:'#313638',
        borderRadius:10,
        width:'100%',
        padding: 20,
        marginBottom:10,

    },row:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor:'transparent'

    },
    row1:{
        backgroundColor:'transparent',
        flex: 1,
        flexDirection: 'row',
        alignContent:'center',
        marginTop:10,


    },
    row2:{
        flex: 1,
        flexDirection: 'row',
        marginTop:10,
        backgroundColor:'transparent',
        alignContent:'center',

    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#F4EBD9',
    },

    location:{
        marginLeft:15,
        paddingTop:5,
        color:'#F4EBD9',
    },
    price:{
        marginLeft:9,
        paddingTop:5,
        color:'#F4EBD9',

    },
    time:{
        marginLeft:15,
        color:'#F4EBD9',

    },
    type:{

        backgroundColor:'#EF6461',
        borderRadius:5,
        padding:5,
        overflow:'hidden',
        color:'#313638',



    },

    title1: {
        marginVertical:10,
        fontSize: 20,
        fontWeight: 'bold',
    },



});
