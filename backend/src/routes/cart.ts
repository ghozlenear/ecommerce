import { Response, Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import Cart from '../models/Cart';

const router = Router();

// @route GET /api/cart
// @desc Get current user's cart
// @access Private

//Read
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const cart = await Cart.findOne({ user: userId });
    res.json({ cart: cart || { items: [] } });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error while fetching cart' });
  }
});

// @route POST /api/cart
// @desc Add item to cart or increment if exists
// @access Private

//create
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { productId, name, price, quantity = 1, image } = req.body;

    if (!productId || !name || !price) {
      return res.status(400).json({ message: 'productId, name and price are required' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existing = cart.items.find(i => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity, image });
    }

    await cart.save();
    res.status(201).json({ cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error while adding to cart' });
  }
});

// @route PUT /api/cart/:productId
// @desc Update quantity for a cart item
// @access Private

//update
router.put('/:productId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity == null || quantity < 0) {
      return res.status(400).json({ message: 'quantity must be provided and >= 0' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.json({ cart });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: 'Server error while updating cart item' });
  }
});

// @route DELETE /api/cart/:productId
// @desc Remove item from cart
// @access Private

//delete
router.delete('/:productId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(i => i.productId !== productId);
    await cart.save();

    res.json({ cart });
  } catch (error) {
    console.error('Remove cart item error:', error);
    res.status(500).json({ message: 'Server error while removing cart item' });
  }
});

// @route DELETE /api/cart
// @desc Clear cart
// @access Private
router.delete('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    await cart.save();

    res.json({ cart });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error while clearing cart' });
  }
});

export default router;