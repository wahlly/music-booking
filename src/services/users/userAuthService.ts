import statusCodes from '../../constants/statusCodes'
import { User, IUser } from '../../models/userModel'
import { messageHandler, hashPassword, verifyPassword, tokenHandler } from '../../utils/index'


export const userSignupService = async (payload: any) => {
    let { password, ...body } = payload
    password = await hashPassword(password)
    const user: IUser = new User({ ...body, password })
    await user.save();
    user.password = ""
    return messageHandler(true, "User registered successfully", statusCodes.SUCCESS, user)
}

export const userLoginService = async (payload: any) => {
    const { email, password } = payload

    const user: IUser | null = await User.findOne({ email })
    if(!user) {
        return messageHandler(false, 'Wrong email or password', statusCodes.UNAUTHORIZED, {})
    }

    if(await verifyPassword(password, user.password)) {
        const credentials = tokenHandler(String(user._id))
        return messageHandler(true, 'User logged-in successfully', statusCodes.SUCCESS, credentials)
    } else {
        return messageHandler(false, 'Wrong email or password', statusCodes.UNAUTHORIZED, {})
    }
}

export const getUserProfileService = async (userId: string) => {
    const user: IUser | null = await User.findById(userId)
    if(user == null) {
        return messageHandler(false, "User does not exist", statusCodes.BAD_REQUEST, {})
    }
    user.password = ""

    return messageHandler(true, "User found successfully", statusCodes.SUCCESS, user)
}