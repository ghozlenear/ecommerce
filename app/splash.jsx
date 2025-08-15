import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/onboarding');
        }, 2000);
        return () => clearTimeout(timer);
    }, [router]);

    return(
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/logo.png')} 
                style={styles.image} 
                resizeMode="contain" 
            />
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FADADD',
        justifyContent:'center',
        alignItems:'center',
    },
logo :{
    width:350,
    height:279,
},

});