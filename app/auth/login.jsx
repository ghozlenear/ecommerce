import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="exemple@gmail.com"
                    placeholderTextColor="#B8B8B8"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
                <TextInput
                    placeholder="********"
                    placeholderTextColor="#B8B8B8"
                    style={styles.input}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.forgotWrapper} onPress={() => {}}>
                    <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/tabs/index')}>
                    <Text style={styles.primaryButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                    <Ionicons name="logo-google" size={22} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                    <Ionicons name="logo-apple" size={22} color="#000000" />
                </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
                <Text style={styles.footerText}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                    <Text style={styles.linkText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    logo: {
        width: 502,
        height: 313,
        
    },
    form: {
        marginTop: 12,
    },
    label: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    forgotWrapper: {
        marginTop: 8,
        alignItems: 'flex-end',
    },
    forgotText: {
        color: '#F4A7B9',
    },
    primaryButton: {
        backgroundColor: '#FADADD',
        alignSelf: 'center',
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 22,
        marginTop: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 24,
        paddingHorizontal: 8,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E7E7E7',
    },
    dividerText: {
        color: '#9A9A9A',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginTop: 16,
    },
    socialButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    footerRow: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#7A7A7A',
    },
    linkText: {
        color: '#F4A7B9',
    },
});


