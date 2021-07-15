import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {withNavigation,} from 'react-navigation';
import {useEffect} from 'react';
import {Image} from 'react-native';

// @ts-ignore
export default function MyProfile({navigation}) {


    const [profile, setProfile] = useState([]);
    const date = new Date();

    const age = (dob1: string | number | Date) => {
        age_now = 0;
        console.log('From user', dob1);
        if (dob1) {
            var today = new Date();
            // var birthDate = Date.parse(dob1)
            var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument

            var age_now = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
            // {
            //     age_now;
            // }
        }
        return age_now;
    }

    useEffect(() => {

        fetch('https://matefit-test.herokuapp.com/api/profile/' + global.user.id,
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
                setProfile(res);
                console.log(res);
                console.log(global.user);
                console.log(global.user.token);



            }).catch((error) => {
            console.error(error)
        })
    }, [])


    const show_role = (role) => {
        if (role == 'trainer')
            return <Text>{profile.role}</Text>;
    }

    const show_price = (role) => {
        if (role == 'trainer')
            return <Text>{profile.price} €</Text>;
    }

    // const show_reservation_button = (profile: any[]) =>{
    //     if (profile.role == 'trainer')
    //         return <Button title='Book Trainer'  onPress={navigation.navigate('BookTrainer', {id:profile.id})}/>;
    // }


    return (
        <View style={styles.header}>
            <View style={styles.image1}>
                <Image

                    style={styles.image}

                    source={{
                        uri: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
                    }}
                />

                {// @ts-ignore}
                     }
                {show_price(profile.price)}
                <Text style={styles.name}>{profile.role? profile.role.toUpperCase() : null}</Text>

                <View style={styles.row}>



                    <Text style={styles.name}>{profile.name? profile.name.toUpperCase() : null}</Text>
                    <Text style={styles.lastname}>{profile.lastname?  profile.lastname.toUpperCase() : null}</Text>
                </View>

                <Text style={styles.bdate}>Age: {age(profile.bDate)}</Text>
                <Text style={styles.bdate}>Credit: {profile.credit}</Text>


                {/*<Text style={styles.dicipline}>{profile.dicipline}</Text>*/}
                {/*{show_reservation_button(profile)}*/}


            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    header: {
        paddingTop: 30,
        alignItems: 'center',
        backgroundColor: "#DCDCDC",

    },
    body: {

        backgroundColor: "#778899",
        height: 500,
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },

    image: {
        paddingTop: 30,
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    image1: {

        flex: 0,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 10,

    },
    name: {
        fontWeight:'bold',
        paddingRight: 5,
    },
    lastname: {
        fontWeight:'bold',
    },
    bdate: {
        fontWeight:'bold'
    },
    dicipline: {},
    row: {

        flex: 0,
        flexDirection: 'row',
    },
});