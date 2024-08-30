import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateToken.js"

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, profileLogo, mail } = req.body

    const user = await User.findOne({ firstName, lastName })

    if (user) {
      return res.status(400).json({ error: "User already exists" })
    }

    const fullName = `${firstName} ${lastName}`

    const newUser = new User({
      fullName: fullName,
      firstName,
      lastName,
      profileLogo,
      mail,
      bot: false,
      guest: false,
    })

    if (newUser) {
      await generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        profileLogo: newUser.profileLogo,
        mail: newUser.mail,
      })
    } else {
      res.status(400).json({ error: "Invalid user data" })
    }
  } catch (error) {
    console.log("Error in Signup controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const guestSignup = async (req, res) => {
  try {
    const newUser = new User({
      fullName: " ",
      firstName: " ",
      lastName: " ",
      bot: false,
      guest: true,
    })

    if (newUser) {
      await generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        guest: newUser.guest,
      })
    }
  } catch (error) {
    console.log("Error in guest Signup controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const botSignup = async (req, res) => {
  const { firstName, lastName } = req.body

  const botsNames = ["Jacob", "Michael", "Ethan", "Mary", "Brenda", "Linda"]
  const botsSurnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"]
  let customFirstName = ""
  let profileLogo = ""
  let customLastName = ""
  let fullName = ""

  if (!firstName || !lastName) {
    const randomBotNameIndex = Math.floor(Math.random() * botsNames.length)

    customLastName = botsSurnames[Math.floor(Math.random() * botsNames.length)]

    if (randomBotNameIndex > 2) {
      customFirstName = botsNames[randomBotNameIndex]
      profileLogo = `https://avatar.iran.liara.run/public/girl?username=${
        customFirstName + customLastName
      }`
    } else {
      customFirstName = botsNames[randomBotNameIndex]
      profileLogo = `https://avatar.iran.liara.run/public/boy?username=${
        customFirstName + customLastName
      }`
    }
  } else {
    fullName = `${firstName} ${lastName}`
    profileLogo = `https://avatar.iran.liara.run/public/girl?username=${firstName + lastName}`
  }

  try {
    const newUser = new User({
      fullName,
      firstName: firstName ? firstName : customFirstName,
      lastName: lastName ? lastName : customLastName,
      profileLogo,
      bot: true,
      guest: false,
    })

    if (newUser) {
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        bot: newUser.bot,
      })
    }
  } catch (error) {
    console.log("Error in bot Signup controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const login = async (req, res) => {
  try {
    const { firstName, lastName, mail } = req.body

    let user = {}

    if (mail) {
      user = await User.findOne({ firstName, lastName, mail })
      const isMailCorrect = mail === user?.mail || ""

      if (!user || !isMailCorrect) {
        return res.status(400).json({ error: "Invalid mail" })
      }
    } else {
      user = await User.findOne({ firstName, lastName })
      if (!user) {
        return res.status(400).json({ error: "Invalid first name or last name" })
      }
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      profileLogo: user.profileLogo,
      mail: user.mail,
    })
  } catch (error) {
    console.log("Error in login controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully" })
  } catch (error) {
    console.log("Error in logout controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
