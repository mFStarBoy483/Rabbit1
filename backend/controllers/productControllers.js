import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js" ;
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";



export const getProducts = catchAsyncErrors (async (req, res, next) => {
  const resPerPage = 8
  const apiFilters = new APIFilters(Product, req.query).search().filters();
  console.log('req?.user', req?.user);
  let products = await apiFilters.query;
  let filteredProductsCount = products.length;
  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();
               
  res.status(200).json({
    resPerPage,
    filteredProductsCount,
       products,
    });
  });


//I can add the product only for the admin
export const newProduct = catchAsyncErrors( async (req, res) => {
  req.body.user=req.user._id;
  
    const product= await Product.create(req.body)
    res.status(200).json({
        product,
    });
  });

export const getProductDetails = catchAsyncErrors( async(req, res, next) => {
    const product= await Product.findById(req?.params?.id);

    if (!product) {
      return next(new ErrorHandler('Product is not Found', 404));
    }
    res.status(200).json({
        product,
    });
  
  });


  export const updateProduct = catchAsyncErrors(async (req, res) => {
    let product= await Product.findById(req?.params?.id);

    if (!product) {
      return next(new ErrorHandler('Product is not Found', 404));
    }
    
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, { new:true })

    res.status(200).json({
        product,
    });
  
  });

  export const deleteProduct = catchAsyncErrors(async (req, res) => {
    const product= await Product.findById(req?.params?.id);

    if (!product) {
      return next(new ErrorHandler('Product is not Found', 404));
    }
    await product.deleteOne();
    res.status(200).json({
        message: "Product Deleted",
    });
  
  });

// Create/Update product review => /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
