import React, { useContext } from 'react';
import { StyleSheet, Image, ImageBackground, useWindowDimensions, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native' 
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import * as Location from 'expo-location';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';

function kelvinToCelsius (kelvin: number) {
    return (kelvin-273.15).toFixed() + "°"
}

export default function Home({ navigation, route }: RootStackScreenProps<'Home'>) {
    const { colors } = useTheme()
    const { width, height } = useWindowDimensions()
    const [location, setLocation] = React.useState<Location.LocationObject>()
    const [data, setData] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [uri, setUri] = React.useState(`https://random.imagecdn.app/${width}/${height}`)

    React.useEffect(() => {
        (async () => {
          setLoading(true)
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            // setErrorMsg('Permission to access location was denied');
            return;
          }
    
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

    React.useEffect(() => {
        if (location) {
            (async () => {
                const response = await api.get('/weather', { params: {
                    q: 'sao paulo,br', 
                    lat: location?.coords.latitude, lon: location?.coords.longitude, 
                    mode: 'JSON'
                } })
    
                setData(response?.data)
                setLoading(false)
                console.log({ data: response?.data });
                
            })()
        }
    }, [location])

    if (loading) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.text} animating />
        </View>
    )

    function getRandomInt(min: number, max=min <= 600 ? (min*10) : min) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return (
        <TouchableHighlight onPress={() => 
            setUri(`https://random.imagecdn.app/${getRandomInt(width)}/${getRandomInt(height)}`)
        }
            style={{ flex: 1 }}
        >
        <ImageBackground style={styles.container}
            source={{ uri }}
        >
            <LinearGradient colors={['#003d80', 'transparent']}
                style={{ padding: 40 ,margin: 0, height:'100%', flex: 1, alignItems: 'center' }}
            >
                <Image source={{ 
                    uri: `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`,
                    headers: {
                        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                        'x-rapidapi-key': '150832c484mshee5c13874a5f738p1c338bjsnda02d18b10a1'
                    } 
                }} 
                    style={{ width: 24*2, height: 24*2 }}
                />
                <Text style={styles.title}>{data?.name}</Text>
                <Text style={[styles.title, { fontSize: 60 }]}>{kelvinToCelsius(data?.main?.temp)}</Text>
                <Text style={styles.title}>{data?.weather[0]?.description}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent' }}>
                    <Text style={[styles.title, { padding: 10 }]}>{'max: '+ kelvinToCelsius(data?.main?.temp_max)}</Text>
                    <Text style={[styles.title, { padding: 10 }]}>{'min: ' + kelvinToCelsius(data?.main?.temp_min)}</Text>
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </LinearGradient>
            <FlatList style={{ flex: 1 }}
                data={[{  }]}
                renderItem={() => <View></View>}
            />
        </ImageBackground>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
    //  alignItems: 'center',
    //  padding: 0,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5dd29',
    },

    title: {
      fontSize: 20,
      fontWeight: 'bold',
      elevation: 1,
      shadowColor: 'black',
    },

    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });