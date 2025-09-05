import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		fullName: '',
		phoneNumber: ''
	});
	const [loading, setLoading] = useState(false);

	const handleSignup = async () => {
		
		if (!formData.email || !formData.password || !formData.fullName || !formData.phoneNumber) {
			Alert.alert('Error', 'Please fill in all fields');
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			Alert.alert('Error', 'Passwords do not match');
			return;
		}

		if (formData.password.length < 6) {
			Alert.alert('Error', 'Password must be at least 6 characters long');
			return;
		}

		setLoading(true);
		try {
			const response = await fetch('http://192.168.100.4:8080/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
					fullName: formData.fullName,
					phoneNumber: formData.phoneNumber
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Store the token (you can use AsyncStorage later)
				console.log('Signup successful:', data.message);
				console.log('User:', data.user.fullName);
				console.log('Token:', data.token);
				
				// Navigate to home
				router.push('/tabs/home');
			} else {
				Alert.alert('Signup Failed', data.message || 'An error occurred');
			}
		} catch (error) {
			console.error('Signup error:', error);
			Alert.alert('Error', 'Network error. Please check your connection.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView 
		style={{ flex: 1, backgroundColor: "#fff" }} 
		behavior={Platform.OS === 'ios' ? 'padding' : undefined}
	  >
		<ScrollView 
		  contentContainerStyle={styles.scrollContainer} 
		  showsVerticalScrollIndicator={false}
		>

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
					value={formData.email}
					onChangeText={(text) => setFormData({...formData, email: text})}
					placeholder="exemple@gmail.com"
					placeholderTextColor="#B8B8B8"
					style={styles.input}
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<Text style={[styles.label, { marginTop: 16 }]}>Full Name</Text>
				<TextInput
					value={formData.fullName}
					onChangeText={(text) => setFormData({...formData, fullName: text})}
					placeholder="Enter your full name"
					placeholderTextColor="#B8B8B8"
					style={styles.input}
				/>

				<Text style={[styles.label, { marginTop: 16 }]}>Phone Number</Text>
				<TextInput
					value={formData.phoneNumber}
					onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
					placeholder="+1234567890"
					placeholderTextColor="#B8B8B8"
					style={styles.input}
					keyboardType="phone-pad"
				/>

				<Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
				<TextInput
					value={formData.password}
					onChangeText={(text) => setFormData({...formData, password: text})}
					placeholder="********"
					placeholderTextColor="#B8B8B8"
					style={styles.input}
					secureTextEntry
				/>

				<Text style={[styles.label, { marginTop: 16 }]}>Confirm Password</Text>
				<TextInput
					value={formData.confirmPassword}
					onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
					placeholder="********"
					placeholderTextColor="#B8B8B8"
					style={styles.input}
					secureTextEntry
				/>

				<TouchableOpacity 
					style={[styles.primaryButton, loading && styles.primaryButtonDisabled]} 
					onPress={handleSignup}
					disabled={loading}
				>
					<Text style={styles.primaryButtonText}>
						{loading ? 'Creating Account...' : 'Sign up'}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footerRow}>
			<Text style={styles.footerText}>Already have an account? </Text>
				<TouchableOpacity onPress={() => router.replace('/auth/login')}>
					<Text style={styles.linkText}>Login</Text>
				</TouchableOpacity>
			</View>
		</View>
		</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		paddingBottom: 40,
	  },
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 24,
		paddingTop: 24,
	},
	header: {
		alignItems: 'center',
	},
	logo: {
		width: 503,
		height: 300,
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
	primaryButtonDisabled: {
		opacity: 0.6,
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