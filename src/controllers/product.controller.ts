import { Request, Response } from 'express'
import Product from '../models/product.model'

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const getOneProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const { productName, productPrice } = req.body

    const newProduct = new Product({
      productName,
      productPrice,
    })

    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productName, productPrice } = req.body

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, productPrice },
      { new: true, runValidators: true }
    )

    if (!updated) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)

    if (!deleted) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.json({ message: 'Product deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

export default {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
}