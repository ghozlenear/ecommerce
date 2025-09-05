import mongoose, { Document, Schema } from 'mongoose';

//interface ta3 item wahed
export interface ICartItem {
  productId: string;
  name: string;
  price: string; 
  quantity: number;
  image?: string;
}
//interface ta3 cart kamela
export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

//schema ta3 item wahed
const CartItemSchema = new Schema<ICartItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String }
});

//schema ta3 cart kamela
const CartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: { type: [CartItemSchema], default: [] }
}, {
  timestamps: true
});

export default mongoose.model<ICart>('Cart', CartSchema);
