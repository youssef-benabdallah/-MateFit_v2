import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useState} from 'react';
import {useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Ionicons} from "@expo/vector-icons";


export default function Booking({navigation}) {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Interval to update count


        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            Load();
        });

        return () => {
            // Clear setInterval in case of screen unmount
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
    }, [navigation]);

    const Load = () => {

        fetch('https://matefit-test.herokuapp.com/api/booking/trainer/pending',
            {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // @ts-ignore

                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log('Hallo', res)
                // @ts-ignore
                console.log('Token', global.user.token)
                setBookings(res);
            }).catch((error) => {
            console.error(error)
        })
    }


    const booking_template = (bookings: any[]) => {
        return (
            bookings.map((booking) => {
                return [
                    <TouchableOpacity style={styles.component} key={'TouchableOpacity' + booking.id}
                                      onPress={() => navigation.navigate('BookingRequest', {booking: booking})}>

                        <View key={'bookingView1' + booking.id} style={styles.row}>
                            <Text style={styles.title} key={'title' + booking.id}>{booking.title}</Text>
                            {/*<Text style ={styles.title} key={'id' + booking.id}>{booking.id}</Text>*/}

                            <Text style={styles.type} key={'type' + booking.id}>{booking.status}</Text>
                        </View>

                        <View key={'bookingView2' + booking.id} style={styles.row2}>
                            <Ionicons key={'icon1' + booking.id} name="location" size={20} color="#EF6461"/>
                            <Text style={styles.location} key={'location' + booking.id}>{booking.location}</Text>
                        </View>

                        <View key={'bookingView3' + booking.id} style={styles.row1}>
                            <Ionicons key={'icon2' + booking.id} name="time" size={20} color="#EF6461"/>
                            <Text style={styles.time} key={'time' + booking.id}>{booking.time.substring(0, 16)}</Text>
                        </View>

                    </TouchableOpacity>,

                ]
            })
        )

    }

    const accept_booking = () => {
        fetch('https://matefit-test.herokuapp.com/api/booking/' + bookings.id + '/accept',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => {
                alert('booking accepted')
                console.log(res)
            }).catch((error) => {
            console.error(error)
        })
    }

    const decline_booking = () => {
        fetch('https://matefit-test.herokuapp.com/api/booking/' + bookings.id + '/decline',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + global.user.token,
                }
            })
            .then(res => {
                alert('booking declined')
                console.log(res)
            }).catch((error) => {
            console.error(error)
        })
    }


    const show_buttons = (status) => {

        if (status == 'pending') {
            return [
                <Button key={'accept'} onPress={accept_booking} title='accept'></Button>,
                <Button key={'decline'} onPress={decline_booking} title='decline'></Button>]
        }

        if (status == 'accepted') {
            return [
                <Button key={'decline2'} onPress={decline_booking} title='decline'></Button>]
        }
    }

    return (
        <View style={styles.container}>
            {/*<Text style={styles.id}>{book.id}</Text>*/}
            {/*<Text style={styles.title}>{book.title}</Text>*/}
            {/*<Text style={styles.description}>{book.description}</Text>*/}

            {/*<View style={styles.location}>*/}
            {/*    <Ionicons name="location" size={25} color="green" />*/}
            {/*    <Text style={styles.adress}>{book.adress}</Text>*/}
            {/*</View>*/}
            {/*<View style={styles.time}>*/}
            {/*    <Ionicons name="time" size={25} color="green" />*/}
            {/*    <Text style={styles.time}>{book.time}</Text>*/}
            {/*</View>*/}
            {/*<View style={styles.maxpp1}>*/}
            {/*    <Ionicons name="people" size={25} color="green" />*/}
            {/*    <Text style={styles.maxpp1}>{book.maxppl}</Text>*/}
            {/*</View>*/}
            {/*<Text style={styles.status}>{book.status}</Text>*/}
            {/*{show_buttons(book.status)}*/}

            <View style={styles.container}>

                <Text style={styles.title1}>Booking Request</Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {booking_template(bookings)}
                </ScrollView>
                {/*<FlatList data={activities} renderItem={({item}) => activity_template(item)}/>*/}


            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        width: '100%',
        padding: 10,

    },
    id: {

        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F4EBD9',
        width:'70%',



    },
    location: {
        marginLeft: 15,
        paddingTop: 5,
        color: '#F4EBD9',
    },
    description: {},
    time: {
        marginLeft: 15,
        color: '#F4EBD9',

    },

    adress: {},

    maxpp1: {
        padding: 5,
        flex: 0,
        flexDirection: 'row',


    },
    status: {},
    component: {
        backgroundColor: '#313638',
        borderRadius: 10,
        width: '100%',
        padding: 20,
        marginBottom: 10,
    }, row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'

    },
    row1: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 10,
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'transparent',
        alignContent: 'center',

    },

    price: {
        marginLeft: 9,
        paddingTop: 5,
        color: '#F4EBD9',

    },

    type: {
        backgroundColor: '#EF6461',
        borderRadius: 5,
        padding: 5,
        overflow: 'hidden',
        color: '#313638',
        height:40,

    },

    title1: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },


})

