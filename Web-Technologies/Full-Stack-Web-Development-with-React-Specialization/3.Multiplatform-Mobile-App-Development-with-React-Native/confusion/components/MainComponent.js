import React, { Component } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//  , SafeAreaView, 
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerItems, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';



import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';


import { DISHES } from '../shared/dishes';






const MenuStack = createStackNavigator();
// menu
function MenuStackNavigator({ navigation, route }) {
    return (<MenuStack.Navigator >
        <MenuStack.Screen name="Menu"
            component={Menu}
            options={{
                title: 'Menu',
                headerStyle: {
                    backgroundColor: "#512DA8",
                },

                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff",
                },
                headerLeft: () => (
                    <Icon name="menu" size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
            }}
        />
        <MenuStack.Screen name="Dishdetail"
            route={{ route }}
            component={Dishdetail}
            options={{
                title: 'Dish',
                headerStyle: {
                    backgroundColor: "#512DA8",
                },

                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff",
                },

            }}
        />
    </MenuStack.Navigator>);
}







const AboutStack = createStackNavigator();

function AboutStackNavigator({ navigation }) {
    return (<AboutStack.Navigator>

        <AboutStack.Screen name="About"
            options={{
                title: 'About',
                headerStyle: {
                    backgroundColor: "#512DA8",
                },

                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff",
                },
                headerLeft: () => (
                    <Icon name="menu" size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()} />
                ),
            }}
            component={About} />
    </AboutStack.Navigator>);
}

const ContactStack = createStackNavigator();

function ContactStackNavigator({ navigation }) {
    return (
        <ContactStack.Navigator>
            <ContactStack.Screen name="Contact"
                options={{
                    title: 'Contact',
                    headerStyle: {
                        backgroundColor: "#512DA8"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        color: "#fff"
                    },
                    headerLeft: () => (
                        <Icon name="menu" size={24}
                            color='white'
                            onPress={() => navigation.toggleDrawer()} />
                    ),
                }}
                component={Contact} />
        </ContactStack.Navigator>);
}


const HomeStack = createStackNavigator();

function HomeStackNavigator({ navigation }) {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home"
                options={{
                    title: 'Home',
                    headerStyle: {
                        backgroundColor: "#512DA8"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        color: "#fff"
                    },
                    headerLeft: () => (
                        <Icon name="menu" size={24}
                            color='white'
                            onPress={() => navigation.toggleDrawer()} />
                    ),
                }}
                component={Home} />
        </HomeStack.Navigator>);
}



const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
    

        <DrawerItemList {...props} />
        </SafeAreaView>
    </DrawerContentScrollView>
);






const MainNavigator = createDrawerNavigator();

function MainNavigatorContainer({ navigation }) {
    return (<MainNavigator.Navigator
        drawerContent={(props) => <CustomDrawerContentComponent {...props} />}

        style={styles.container} drawerStyle={
            {
                backgroundColor: '#D1C4E9',
                contentComponent: CustomDrawerContentComponent


            }
        }>
        <MainNavigator.Screen name="Home"
            component={HomeStackNavigator}
            options={
                {
                    drawerLabel: 'Home',
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )

                }
            } />
        <MainNavigator.Screen name="About"
            component={AboutStackNavigator}
            options={
                {
                    drawerLabel: 'About',
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }
            }
        />
        <MainNavigator.Screen name="Menu"
            component={MenuStackNavigator}
            navigation={{ navigation }}
            options={
                {
                    drawerLabel: 'Menu',
                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }
            } />

        <MainNavigator.Screen name="Contact"
            component={ContactStackNavigator}
            options={
                {
                    drawerLabel: 'Contact',

                    drawerIcon: ({ tintColor, focused }) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }
            } />

    </MainNavigator.Navigator>);
}

// export default MainNavigatorContainer;


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }
    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId })
    }
    render() {

        return (<View style={
            {
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }
        }>
            <NavigationContainer>
                <MainNavigatorContainer />
            </NavigationContainer>

        </View>);
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

export default Main;
