import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
      default: "",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: false,
      default: "",
    },
    profileLogo: {
      type: String,
      required: false,
      default: "",
    },
    bot: {
      type: Boolean,
      default: false,
      required: true,
    },
    guest: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)
