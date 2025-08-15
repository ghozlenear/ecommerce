import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingPage2() {
    const router = useRouter();
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return gestureState.dx > 12 && Math.abs(gestureState.dy) < 10;
            },
            onPanResponderRelease: (_, { dx }) => {
                if (dx > 40) {
                    router.back();
                }
            },
        })
    ).current;
    return (
        <View {...panResponder.panHandlers} style={styles.container}>
            <View pointerEvents="none" style={styles.decorativeLayer}>
                <BlurView intensity={65} tint="light" style={[styles.blurBlob, { top: -40, left: -60 }]} />
                <BlurView intensity={65} tint="light" style={[styles.blurBlob, { top: 20, right: -80 }]} />
                <BlurView intensity={65} tint="light" style={[styles.blurBlob, { top: 160, left: -50 }]} />
                <BlurView intensity={65} tint="light" style={[styles.blurBlob, { top: 260, right: -60 }]} />
                <BlurView intensity={65} tint="light" style={[styles.blurBlob, { bottom: 140, left: 10 }]} />
                <BlurView intensity={65} tint="light" style={[styles.blurBlob, { bottom: -30, right: -30 }]} />
                <BlurView intensity={65} tint="light" style={[styles.blurBlob, { top: 120, left: 120 }]} />
            </View>
            <View style={styles.header}>
                <Image 
                    source={require('../../assets/images/logo.png')} 
                    style={styles.logo} 
                    resizeMode="contain" 
                />
                
                <TouchableOpacity style={styles.skipButton}>
                    <Text style={styles.skipText}>skip</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.imageBackground}>
                    <Image 
                        source={require('../../assets/images/page2.png')} 
                        style={styles.onboardingImage} 
                        resizeMode="contain" 
                    />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Track Your Progress</Text>
                <Text style={styles.description}>
                    Monitor your skin's transformation with detailed insights and progress tracking.
                </Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.pagination}>
                    <View style={styles.dot} />
                    <View style={styles.dotActive} />
                    <View style={styles.dot} />
                </View>
               
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FADADD',
        padding: 20,
    },
    decorativeLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.55,
    },
    blurBlob: {
        position: 'absolute',
        width: 234.33,
        height: 200.63,
        borderRadius: 120,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.35)'
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
        paddingTop: 40,
    },
    logo: {
        width: 120,
        height: 60,
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#000',
        fontStyle: 'italic',
        marginBottom: 20,
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 0,
    },
    skipText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#FADADD',
        textTransform: 'lowercase',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    imageBackground: {
        width: '100%',
        height: 400,
        backgroundColor: '#FADADD',
        borderRadius: 30,
        overflow: 'hidden',
    },
    onboardingImage: {
        width: '100%',
        height: '100%',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_600SemiBold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#7A7A7A',
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginHorizontal: 4,
    },
    dotActive: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 4,
    },
    nextButton: {
        backgroundColor: '#FFFFFF',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
