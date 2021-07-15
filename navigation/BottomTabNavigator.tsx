/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/DashBoard';
import ActivityPost from '../screens/ActivityPost';
import {
    BottomTabParamList,
    DashBoardParamList,
    ActivityPostParamList,
    BookingParamList,
    MyProfileParamList,
    ActivitySearchParamList, EventPostParamList, TrainerSearchParamList,
} from '../types';
import DashBoard from "../screens/DashBoard";
import Booking from "../screens/Booking";
import MyProfile from "../screens/MyProfile";
import ActivitySearch from "../screens/ActivitySearch";
import EventPost from "../screens/EventPost";
import TrainerSearch from "../screens/TrainerSearch";


const BottomTab = createBottomTabNavigator<BottomTabParamList>();


export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    // @ts-ignore
    const userRole = global.user.role;


    const showBookingScreen = () => {
        if (userRole == "trainer")
            return [
                <BottomTab.Screen
                    name="Booking"
                    component={BookingNavigator}
                    options={{
                        tabBarIcon: ({color}) => <TabBarIcon name="ios-card" color={color}/>,
                    }}
                    key={"BookingScreen"}
                />
            ]
    }
    const showActivitySearchScreen = () => {
        if (userRole == "mate")
            return [
                <BottomTab.Screen
                    name="ActivitySearch"
                    component={ActivitySearchNavigator}
                    options={{
                        tabBarIcon: ({color}) => <TabBarIcon name="ios-search" color={color}/>,
                    }}
                    key={"ActivitySearchScreen"}

                />
            ]
    }


    const showTrainerSearchScreen = () => {
        if (userRole == "mate")
            return [
                <BottomTab.Screen
                    name="TrainerSearch"
                    component={TrainerSearchNavigator}
                    options={{
                        tabBarIcon: ({color}) => <TabBarIcon name="ios-search" color={color}/>,
                    }}
                    key={"TrainerSearchScreen"}
                />
            ]
    }

    const showEventOrActivity = () => {
        if (userRole == "mate")
            return [
                <BottomTab.Screen
                    name="ActivityPost"
                    component={ActivityPostNavigator}
                    options={{
                        tabBarIcon: ({color}) => <TabBarIcon name="ios-add" color={color}/>,
                    }}
                    key={"ActivityPost"}

                />
            ]
        else
            return [
                <BottomTab.Screen
                    name="EventPost"
                    component={EventPostNavigator}
                    options={{
                        tabBarIcon: ({color}) => <TabBarIcon name="ios-add" color={color}/>,
                    }}
                    key={"EventPost"}

                />
            ]

    }

    return (
        <BottomTab.Navigator
            initialRouteName="DashBoard"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="DashBoard"
                component={DashBoardNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-home" color={color}/>,
                }}
            />

            {showEventOrActivity()}

            {showActivitySearchScreen()}
            {showTrainerSearchScreen()}

            {showBookingScreen()}

            <BottomTab.Screen
                name="MyProfile"
                component={MyProfileNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-person" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const DashBoardStack = createStackNavigator<DashBoardParamList>();

function DashBoardNavigator() {
    return (
        <DashBoardStack.Navigator>
            <DashBoardStack.Screen
                name="DashBoard"
                component={DashBoard}
                options={{headerTitle: 'DashBoard', headerShown: false}
                }
            />
        </DashBoardStack.Navigator>
    );
}

const ActivityPostStack = createStackNavigator<ActivityPostParamList>();

function ActivityPostNavigator() {
    return (
        <ActivityPostStack.Navigator>
            <ActivityPostStack.Screen
                name="ActivityPost"
                component={ActivityPost}
                options={{headerTitle: 'Activity Post', headerShown: false}}
            />
        </ActivityPostStack.Navigator>
    );
}

const EventPostStack = createStackNavigator<EventPostParamList>();

function EventPostNavigator() {
    return (
        <EventPostStack.Navigator>
            <EventPostStack.Screen
                name="EventPost"
                component={EventPost}
                options={{headerTitle: 'Event Post', headerShown: false}}
            />
        </EventPostStack.Navigator>
    );
}

const BookingStack = createStackNavigator<BookingParamList>();

function BookingNavigator() {
    return (
        <BookingStack.Navigator>
            <BookingStack.Screen
                name="Booking"
                component={Booking}
                options={{headerTitle: 'Booking', headerShown: false}}
            />
        </BookingStack.Navigator>
    );
}

const MyProfileStack = createStackNavigator<MyProfileParamList>();

function MyProfileNavigator() {
    return (
        <MyProfileStack.Navigator>
            <MyProfileStack.Screen
                name="MyProfile"
                component={MyProfile}
                options={{headerTitle: 'MyProfile', headerShown: false}}
            />
        </MyProfileStack.Navigator>
    );
}

const ActivitySearchStack = createStackNavigator<ActivitySearchParamList>();

function ActivitySearchNavigator() {
    return (
        <ActivitySearchStack.Navigator>
            <ActivitySearchStack.Screen
                name="ActivitySearch"
                component={ActivitySearch}
                options={{headerTitle: 'ActivitySearch', headerShown: false}}
            />
        </ActivitySearchStack.Navigator>
    );
}



const TrainerSearchStack = createStackNavigator<TrainerSearchParamList>();

function TrainerSearchNavigator() {
    return (
        <TrainerSearchStack.Navigator>
            <TrainerSearchStack.Screen
                name="TrainerSearch"
                component={TrainerSearch}
                options={{headerTitle: 'TrainerSearch', headerShown: false}}
            />
        </TrainerSearchStack.Navigator>
    );
}


