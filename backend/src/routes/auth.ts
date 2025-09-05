import { Request, Response, Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { validateLogin, validateSignup } from '../middleware/validation';
import User from '../models/User';
import { generateToken } from '../utils/jwt';

const router = Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', validateSignup, async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      fullName,
      phoneNumber
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Return user data (without password) and token
    const userResponse = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérification si l'email et mot de passe sont bien fournis
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Récupérer l'utilisateur avec son mot de passe
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Générer le token
    const token = generateToken(user);

    // Réponse sans mot de passe
    const userResponse = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt
    };

    return res.json({
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Server error during login'
    });
  }
});
// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json({
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { fullName, phoneNumber } = req.body;
    
    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Update fields
    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    const userResponse = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({
      message: 'Profile updated successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      message: 'Server error while updating profile'
    });
  }
});

export default router;
