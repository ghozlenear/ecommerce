import { useRouter } from 'expo-router';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
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

				<Text style={[styles.label, { marginTop: 16 }]}>Full Name</Text>
				<TextInput
					placeholder=""
					placeholderTextColor="#B8B8B8"
					style={styles.input}
				/>

				<Text style={[styles.label, { marginTop: 16 }]}>Phone Number</Text>
				<TextInput
					placeholder=""
					placeholderTextColor="#B8B8B8"
					style={styles.input}
					keyboardType="phone-pad"
				/>

				<Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
				<TextInput
					placeholder="********"
					placeholderTextColor="#B8B8B8"
					style={styles.input}
					secureTextEntry
				/>

				<Text style={[styles.label, { marginTop: 16 }]}>confirm password</Text>
				<TextInput
					placeholder="********"
					placeholderTextColor="#B8B8B8"
					style={styles.input}
					secureTextEntry
				/>

				<TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/tabs/index')}>
					<Text style={styles.primaryButtonText}>Sign up</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footerRow}>
				<Text style={styles.footerText}>Already have an account? </Text>
				<TouchableOpacity onPress={() => router.replace('/auth/login')}>
					<Text style={styles.linkText}>Login</Text>
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
		width: 503,
		height: 250,
		marginBottom: 4,
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
	primaryButton: {
		backgroundColor: '#FADADD',
		alignSelf: 'center',
		paddingHorizontal: 28,
		paddingVertical: 12,
		borderRadius: 22,
		marginTop: 20,
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
	footerRow: {
		marginTop: 16,
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


