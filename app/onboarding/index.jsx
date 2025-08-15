import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
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
                <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/onboarding/page3')}>
                    <Text style={styles.skipText}>skip</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.imageBackground}>
                    <Image 
                        source={require('../../assets/images/page1.png')} 
                        style={styles.onboardingImage} 
                        resizeMode="contain" 
                    />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Discover Your Beauty Routine</Text>
                <Text style={styles.description}>
                    Personalized steps to keep your skin radiant every day.
                </Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.pagination}>
                    <View style={styles.dotActive} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>
                <TouchableOpacity 
                    style={styles.nextButton}
                    onPress={() => router.push('/onboarding/page2')}
                >
                    <Ionicons name="chevron-forward" size={24} color="#FADADD" />
                </TouchableOpacity>
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
        width: 176,
        height: 140,
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
        top: 20,
        right: 0,
        backgroundColor: 'transparent',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    skipText: {
        fontSize: 20,
        textDecorationLine: 'underline',
        fontFamily: 'Poppins_400Regular',
        color: '#FFFFFF',
        textTransform: 'lowercase',
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
        backgroundColor: '#F7C8D0',
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
        marginTop: 20,
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