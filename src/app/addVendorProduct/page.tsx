"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Plus, Trash2, LoaderCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const categories = [
  "Fashion & Lifestyle",
  "Electronics & Gadgets",
  "Home & Living",
  "Beauty & Personal Care",
  "Toys, Kids & Baby",
  "Food & Grocery",
  "Sports & Fitness",
  "Automotive Accessories",
  "Gifts & Handcrafts",
  "Books & Stationery",
  "Others",
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

function AddVendorProduct() {
  // Stores the product title entered by the vendor.
  const [title, setTitle] = useState("");

  // Stores the product description.
  const [description, setDescription] = useState("");

  // Stores how many products are available in stock.
  const [stock, setStock] = useState("");

  // Stores the product price.
  const [price, setPrice] = useState("");

  // Stores the selected category.
  const [category, setCategory] = useState("");

  // Stores the custom category when "Others" is selected.
  const [customCategory, setCustomCategory] = useState("");

  // Stores whether this product is clothing or wearable.
  const [isWearable, setIsWearable] = useState(false);

  // Stores the selected clothing sizes.
  const [sizes, setSizes] = useState<string[]>([]);

  // Stores replacement period.
  const [replacementDays, setReplacementDays] = useState("");

  // Stores warranty information.
  const [warranty, setWarranty] = useState("");

  // Stores whether free delivery is available.
  const [freeDelivery, setFreeDelivery] = useState(false);

  // Stores whether payment on delivery is available.
  const [payOnDelivery, setPayOnDelivery] = useState(false);

  // Stores the actual image files selected by the user.
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);

  // Stores temporary browser URLs used to preview the selected images.
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [preview3, setPreview3] = useState<string | null>(null);
  const [preview4, setPreview4] = useState<string | null>(null);

  // Stores all product detail points entered by the vendor.
  const [detailPoints, setDetailPoints] = useState<string[]>([]);

  // Stores the current detail point being typed.
  const [currentPoint, setCurrentPoint] = useState("");

  // Keeps track of which point number is currently being added.
  const [pointIndex, setPointIndex] = useState(0);
  const [loading , setLoading] = useState(false)

  const router = useRouter()


  // Adds or removes a clothing size from the selected sizes array.
  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((selectedSize) => selectedSize !== size)
        : [...prev, size]
    );
  };

  // Adds the current product detail point to the detail point list.
  const handleAddPoint = () => {
    if (!currentPoint.trim()) return;

    setDetailPoints((prev) => [...prev, currentPoint.trim()]);

    setCurrentPoint("");

    setPointIndex((prev) => prev + 1);
  };

  // Removes one product detail point from the list.
  const handleRemovePoint = (indexToRemove: number) => {
    setDetailPoints((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    setPointIndex((prev) => Math.max(0, prev - 1));
  };

  // Handles the first image upload.
  const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage1(file);
    setPreview1(URL.createObjectURL(file));
  };

  // Handles the second image upload.
  const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage2(file);
    setPreview2(URL.createObjectURL(file));
  };

  // Handles the third image upload.
  const handleImage3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage3(file);
    setPreview3(URL.createObjectURL(file));
  };

  // Handles the fourth image upload.
  const handleImage4Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage4(file);
    setPreview4(URL.createObjectURL(file));
  };


  const handleSubmit = async () => {
  try {
    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !image1 ||
      !image2 ||
      !image3 ||
      !image4
    ) {
      alert("ALL FIELDS REQUIRED");
      return;
    }

    if (category === "Others" && !customCategory) {
      alert("Enter custom category");
      return;
    }

    if (isWearable && sizes.length === 0) {
      alert("Select size");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);

    formData.append(
      "category",
      category === "Others" ? customCategory : category
    );

    formData.append("isWearable", String(isWearable));

    sizes.forEach((size) => {
      formData.append("sizes", size);
    });

    formData.append("replacementDays", replacementDays);
    formData.append("freeDelivery", String(freeDelivery));
    formData.append("warranty", warranty);
    formData.append("payOnDelivery", String(payOnDelivery));

    detailPoints.forEach((point) => {
      formData.append("detailsPoints", point);
    });

    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);

    const result = await axios.post(
      "/api/vendor/addProduct",
      formData
    );

    console.log("PRODUCT ADDED:", result.data);

    setLoading(false);

    alert("PRODUCT SUBMITTED SUCCESSFULLY");

    router.push("/");
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    setLoading(false);

    if (axios.isAxiosError(error)) {
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    // Main page wrapper. Creates the full-screen background and centers the product form.
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      {/* Main container. Gives the complete form a glassmorphism card appearance. */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        {/* Header section. Displays the title and short description of the page. */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Add New Product
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Add product information, images, pricing, sizes and delivery
            options.
          </p>
        </div>

        {/* Product information section. Contains title, price, stock and category inputs. */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Product Information</h2>

          {/* Grid wrapper. Places form inputs into one or two columns depending on screen size. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Product title input. Stores the name of the product. */}
            <input
              type="text"
              placeholder="Product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white/15"
            />

            {/* Product price input. Stores how much the product costs. */}
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white/15"
            />

            {/* Stock input. Stores the available product quantity. */}
            <input
              type="number"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white/15"
            />

            {/* Category select. Allows the vendor to choose a product category. */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none transition focus:border-indigo-500"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Custom category input. This appears only when the vendor selects "Others". */}
          {category === "Others" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4"
            >
              <input
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
              />
            </motion.div>
          )}
        </div>

        {/* Description section. Allows the vendor to explain the product in detail. */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Product Description</h2>

          <textarea
            rows={5}
            placeholder="Write a detailed product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
          />
        </div>

        {/* Wearable section. Allows the vendor to mark the product as clothing and choose sizes. */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          {/* Checkbox wrapper. Controls whether clothing options are visible. */}
          <div className="flex items-center gap-3">
            <input
              id="wearable"
              type="checkbox"
              checked={isWearable}
              onChange={(e) => setIsWearable(e.target.checked)}
              className="h-5 w-5 accent-indigo-500"
            />

            <label
              htmlFor="wearable"
              className="cursor-pointer text-sm font-medium"
            >
              This is a wearable/clothing product
            </label>
          </div>

          {/* Size section. Appears only when the wearable checkbox is enabled. */}
          {isWearable && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5"
            >
              <p className="mb-3 text-sm font-medium text-slate-300">
                Select Available Sizes
              </p>

              {/* Size buttons wrapper. Displays all available clothing sizes. */}
              <div className="flex flex-wrap gap-3">
                {sizeOptions.map((size) => {
                  const selected = sizes.includes(size);

                  return (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`rounded-xl border px-5 py-2 text-sm font-semibold transition ${
                        selected
                          ? "border-indigo-400 bg-indigo-500 text-white"
                          : "border-white/10  text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {size}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Delivery and warranty section. Stores replacement and warranty information. */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Warranty & Delivery</h2>

          {/* Input grid. Places replacement and warranty fields next to each other on larger screens. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Replacement input. Stores the number of replacement days. */}
            <input
              type="text"
              placeholder="Replacement Days"
              value={replacementDays}
              onChange={(e) => setReplacementDays(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
            />

            {/* Warranty input. Stores warranty duration. */}
            <input
              type="text"
              placeholder="Warranty Time"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
            />
          </div>

          {/* Delivery checkbox wrapper. Contains free delivery and pay-on-delivery settings. */}
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:gap-8">
            {/* Free delivery checkbox. */}
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={freeDelivery}
                onChange={(e) => setFreeDelivery(e.target.checked)}
                className="h-5 w-5 accent-indigo-500"
              />

              <span>Free Delivery</span>
            </label>

            {/* Pay on delivery checkbox. */}
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={payOnDelivery}
                onChange={(e) => setPayOnDelivery(e.target.checked)}
                className="h-5 w-5 accent-indigo-500"
              />

              <span>Pay On Delivery</span>
            </label>
          </div>
        </div>

        {/* Image upload section. Allows the vendor to upload four product images. */}
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Product Images</h2>

          <p className="mb-5 text-sm text-slate-400">
            Upload up to four images of your product.
          </p>

          {/* Image grid. Displays four upload cards in a responsive layout. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Image 1 upload box. Handles the first product image. */}
            <motion.div
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/5"
            >
              <input
                type="file"
                hidden
                id="img1"
                accept="image/*"
                onChange={handleImage1Change}
              />

              <label
                htmlFor="img1"
                className="flex h-60 cursor-pointer items-center justify-center"
              >
                {preview1 ? (
                  // Shows image preview when the first image is selected.
                  <div className="h-full w-full">
                    <img
                      src={preview1}
                      alt="Product preview 1"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  // Shows upload icon when no image has been selected.
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Upload size={32} />
                    <span className="text-sm">Upload Image 1</span>
                  </div>
                )}
              </label>
            </motion.div>

            {/* Image 2 upload box. Handles the second product image. */}
            <motion.div
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/5"
            >
              <input
                type="file"
                hidden
                id="img2"
                accept="image/*"
                onChange={handleImage2Change}
              />

              <label
                htmlFor="img2"
                className="flex h-60 cursor-pointer items-center justify-center"
              >
                {preview2 ? (
                  // Shows image preview when the second image is selected.
                  <div className="h-full w-full">
                    <img
                      src={preview2}
                      alt="Product preview 2"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  // Shows upload icon when no image has been selected.
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Upload size={32} />
                    <span className="text-sm">Upload Image 2</span>
                  </div>
                )}
              </label>
            </motion.div>

            {/* Image 3 upload box. Handles the third product image. */}
            <motion.div
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/5"
            >
              <input
                type="file"
                hidden
                id="img3"
                accept="image/*"
                onChange={handleImage3Change}
              />

              <label
                htmlFor="img3"
                className="flex h-60 cursor-pointer items-center justify-center"
              >
                {preview3 ? (
                  // Shows image preview when the third image is selected.
                  <div className="h-full w-full">
                    <img
                      src={preview3}
                      alt="Product preview 3"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  // Shows upload icon when no image has been selected.
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Upload size={32} />
                    <span className="text-sm">Upload Image 3</span>
                  </div>
                )}
              </label>
            </motion.div>

            {/* Image 4 upload box. Handles the fourth product image. */}
            <motion.div
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/5"
            >
              <input
                type="file"
                hidden
                id="img4"
                accept="image/*"
                onChange={handleImage4Change}
              />

              <label
                htmlFor="img4"
                className="flex h-60 cursor-pointer items-center justify-center"
              >
                {preview4 ? (
                  // Shows image preview when the fourth image is selected.
                  <div className="h-full w-full">
                    <img
                      src={preview4}
                      alt="Product preview 4"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  // Shows upload icon when no image has been selected.
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Upload size={32} />
                    <span className="text-sm">Upload Image 4</span>
                  </div>
                )}
              </label>
            </motion.div>
          </div>
        </div>

        {/* Product details section. Allows the vendor to add multiple feature points. */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Product Details</h2>

          {/* Add point wrapper. Contains the input and button for adding a new point. */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Product detail input. Stores the current detail being typed. */}
           <input
  type="text"
  placeholder={`Point ${pointIndex + 1}`}
  value={currentPoint}
  onChange={(e) => setCurrentPoint(e.target.value)}
  className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
/>

            {/* Add point button. Adds the current input value to the detail list. */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleAddPoint}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold transition hover:bg-indigo-600"
            >
              <Plus size={18} />
              Add Point
            </motion.button>
          </div>

          {/* Details list. Displays all product details that have already been added. */}
          {detailPoints.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 space-y-3"
            >
              {detailPoints.map((point, index) => (
                // Individual detail item. Shows the point number, text and remove button.
                <motion.div
                  key={`${point}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  {/* Detail text. Displays the numbered product feature. */}
                  <p className="text-sm text-slate-200">
                    {index + 1}. {point}
                  </p>

                  {/* Remove button. Deletes this particular detail point. */}
                  <button
                    type="button"
                    onClick={() => handleRemovePoint(index)}
                    className="flex shrink-0 items-center gap-1 text-sm text-red-400 transition hover:text-red-300"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Submit section. Contains the final button used to add the product. */}
        <div className="border-t border-white/10 pt-6">
          {/* Add product button. Currently only displays the button; API submission can be connected later. */}
         <motion.button
         
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  type="button"
  onClick={handleSubmit}
  disabled={loading}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 font-bold shadow-lg shadow-indigo-500/20 transition hover:from-indigo-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  
  {loading ? (
    <>
      <LoaderCircle className="h-5 w-5 animate-spin" />
      Adding Product...
    </>
  ) : (
    "Add Product"
  )}
</motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default AddVendorProduct;