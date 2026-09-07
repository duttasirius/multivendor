import Product, { IProduct } from "@/model/product.model";

interface SearchProductsParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  payOnDelivery?: boolean;
  freeDelivery?: boolean;
}

const searchProducts = async ({
  query,
  category,
  minPrice,
  maxPrice,
  payOnDelivery,
  freeDelivery,
}: SearchProductsParams) => {
  const filter: Record<string, any> = {
    isActive: true,
    verificationStatus: "approved",
    isStockAvailable: true,
    stock: {
      $gt: 0,
    },
  };

  if (query) {
    filter.$or = [
      {
        title: {
          $regex: query,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query,
          $options: "i",
        },
      },
      {
        category: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }

  if (category) {
    filter.category = {
      $regex: category,
      $options: "i",
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = maxPrice;
    }
  }

  if (payOnDelivery !== undefined) {
    filter.payOnDelivery = payOnDelivery;
  }

  if (freeDelivery !== undefined) {
    filter.freeDelivery = freeDelivery;
  }

  const products = await Product.find(filter)
    .select(
      "title description price stock image1 category reviews replacementDays freeDelivery warranty payOnDelivery vendor",
    )
    .populate("vendor", "shopName name")
    .limit(10)
    .lean();

  return products.map((product: IProduct) => {
    const reviews = product.reviews || [];

    const averageRating =
      reviews.length > 0
        ? reviews.reduce(
            (total: number, review: any) => total + review.rating,
            0,
          ) / reviews.length
        : 0;

    return {
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image1: product.image1,
      category: product.category,
      averageRating: Number(averageRating.toFixed(1)),
      reviewCount: reviews.length,
      replacementDays: product.replacementDays,
      freeDelivery: product.freeDelivery,
      warranty: product.warranty,
      payOnDelivery: product.payOnDelivery,
      vendor: product.vendor,
    };
  });
};

export default searchProducts;
