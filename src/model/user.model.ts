import mongoose from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IUser {
  _id?: mongoose.Types.ObjectId;

  name: string;
  email: string;
  password?: string;
  phone?: string;
  image?: string;
  role: "user" | "vendor" | "admin";

  // for vendor---
  shopName?: string;
  shopAddress?: string;
  businessAddress?: string;
  gstNumber?: string;
  isApproved?: boolean;
  verificationStatus: "pending" | "approved" | "rejected";
  requestedAt?: Date;
  approvedAt?: Date;
  rejectedReason?: string;
  vendorProducts?: mongoose.Types.ObjectId[];

  // user part --
  orders?: mongoose.Types.ObjectId[];

  cart: ICartItem[];

  createdAt?: Date;
  updatedAt?: Date;

  chats?: {
    with: mongoose.Types.ObjectId; // person receive the text
    messages: {
      sender: mongoose.Types.ObjectId; // Person sending text
      text: string;
      createdAt: Date;
    }[];
  }[];
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },

    // for vendor ---
    shopName: {
      type: String,
    },
    shopAddress: {
      type: String,
    },
    businessAddress: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectedReason: {
      type: String,
    },

    approvedAt: { type: Date },
    requestedAt: { type: Date },

    vendorProducts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],

    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Orders",
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    chats: [
      {
        with: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        messages: [
          {
            sender: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },

            text: {
              type: String,
              required: true,
            },

            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
