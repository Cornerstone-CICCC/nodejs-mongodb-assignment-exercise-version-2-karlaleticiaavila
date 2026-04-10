import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  productName: string
  productPrice: number
}

const productSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
})

const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product