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
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.imageBackground}>
                    <Image 
                        source={require('../../assets/images/page3.png')} 
                        style={styles.onboardingImage} 
                        resizeMode="contain" 
                    />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Shop with Confidence</Text>
                <Text style={styles.description}>
                Discover trusted products tailored to your skin type.
                </Text>
                <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/auth/login')}>
                    <Text style={styles.primaryButtonText}>get started</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <View style={styles.pagination}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dotActive} />
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
        width: 319,
        height: 255,
      
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: 'transparent',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    skipText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#FFFFFF',
        textTransform: 'lowercase',
        textDecorationLine: 'underline',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    imageBackground: {
        width: 304,
        height: 460,
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
        fontSize: 29,
        fontFamily: 'Poppins_600SemiBold',
        color: '#333',
        textAlign: 'center',
        marginTop: 40,
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
        marginBottom: 20,
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
    primaryButton: {
        backgroundColor: '#F08080',
        alignSelf: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 22,
        marginTop: 12,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'lowercase'
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2
    }
});
