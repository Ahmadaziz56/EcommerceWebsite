
const product = require("../models/productmodels");
const Errorhander = require("../utils/errorhander")
const catchasyncerror = require("../middleware/catchasyncerror");
const ApiFeatures = require("../utils/ApiFeatures");
const cloudinary = require("cloudinary")
exports.createProduct = catchasyncerror(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const products = await product.create(req.body);

  res.status(201).json({
    success: true,
    products,
  });
});
exports.getallproducts = catchasyncerror(async (req, res, next) => {
  const resultperpage = 8;
  const productcount = await product.countDocuments()
  const apifeature = new ApiFeatures(product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);

  products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productcount,
    resultperpage,
  })
})
exports.updateProduct = catchasyncerror(async (req, res, next) => {
  let products = await product.findById(req.params.id);

  if (!products) {
    return next(new Errorhander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < products.images.length; i++) {
      await cloudinary.v2.uploader.destroy(products.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  products = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    products,
  });
});

exports.deleteproduct = catchasyncerror(async (req, res, next) => {
  const products = await product.findById(req.params.id);
  if (!products) {
    return next(new Errorhander("product not found", 404))
  }
  for (let i = 0; i < products.images.length; i++) {
    await cloudinary.v2.uploader.destroy(products.images[i].public_id)

  }
  await products.deleteOne();

  res.status(200).json({
    success: true,
    message: "product has been deleted successfully"
  })
})
exports.getProductDetails = catchasyncerror(async (req, res, next) => {
  const products = await product.findById(req.params.id);
  if (!products) {
    return next(new Errorhander("product not found", 404))
  }

  res.status(200).json({
    success: true,
    products,
  })
})

exports.createProductReview = catchasyncerror(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const products = await product.findById(productId);

  const isReviewed = products.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    products.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    products.reviews.push(review);
    products.numberofreviews = products.reviews.length;
  }
  let avg = 0;
  products.reviews.forEach((rev) => {
    avg += rev.rating;
    avg = 10 + 20 / 30;
  });
  products.ratings = avg / products.reviews.length;

  await products.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
exports.getProductReviews = catchasyncerror(async (req, res, next) => {
  const products = await product.findById(req.query.id);

  if (!products) {
    return next(new Errorhander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: products.reviews,
  });
});

exports.deleteReview = catchasyncerror(async (req, res, next) => {
  const products = await product.findById(req.query.productId);

  if (!products) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = products.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numberofreviews = reviews.length;

  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberofreviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
exports.getAdminproducts = catchasyncerror(async (req, res, next) => {
  const products = await product.find()

  res.status(200).json({
    success: true,
    products,
  })
})
