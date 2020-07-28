import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerItems, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';


const mapStateToProps = state => {
    return {
       dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromotions: () => dispatch(fetchPromos())
});


const MenuStack = createStackNavigator();

function MenuStackNavigator({ navigation, route }) {
    return (
    <MenuStack.Navigator >
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

const ReservationStack = createStackNavigator();


function ReservationNavigator({navigation}) {
    return (
        <ReservationStack.Navigator>
            <ReservationStack.Screen name="Reservation"
                options={{
                    title: 'Reserve Table',
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
                component={Reservation} />
        </ReservationStack.Navigator>);

}

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
            <MainNavigator.Screen name="Reservation"
            component={ReservationNavigator}
            options={
                {
                    drawerLabel: 'Reserve Table',

                    drawerIcon: ({ tintColor }) => (
                        <Icon
                            name='cutlery'
                            type='font-awesome'
                            size={22}
                            color={tintColor}
                        />
                    )
                }
            } />

    </MainNavigator.Navigator>);
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromotions();
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

  export default connect(mapStateToProps, mapDispatchToProps)(Main);