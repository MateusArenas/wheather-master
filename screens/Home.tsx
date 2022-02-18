import React from 'react';
import { StyleSheet } from 'react-native' 
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import * as Location from 'expo-location';
import api from '../services/api';

function kelvinToCelsius (kelvin: number) {
    return (kelvin-273.15)
}

export default function Home({ navigation, route }: RootStackScreenProps<'Home'>) {
    const [location, setLocation] = React.useState<Location.LocationObject>()
    const [data, setData] = React.useState()

    React.useEffect(() => {
        (async () => {
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
                console.log({ data: response?.data });
                
            })()
        }
    }, [location]) 

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{data?.name}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  });