import statusCodes from '../../constants/statusCodes'
import { Artist, IArtist } from '../../models/artistModel'
import { messageHandler, hashPassword, verifyPassword, tokenHandler } from '../../utils/index'


export const artistSignupService = async (payload: any) => {
    let { password, ...body } = payload
    password = await hashPassword(password)
    const user: IArtist = new Artist({ ...body, password })
    await user.save();
    user.password = ""
    return messageHandler(true, "Artist registered successfully", statusCodes.SUCCESS, user)
}

export const artistLoginService = async (payload: any) => {
    const { email, password } = payload

    const artist: IArtist | null = await Artist.findOne({ email })
    if(!artist) {
        return messageHandler(false, 'Wrong email or password', statusCodes.UNAUTHORIZED, {})
    }

    if(await verifyPassword(password, artist.password)) {
        const credentials = tokenHandler("artist", String(artist._id))
        return messageHandler(true, 'Artist logged-in successfully', statusCodes.SUCCESS, credentials)
    } else {
        return messageHandler(false, 'Wrong email or password', statusCodes.UNAUTHORIZED, {})
    }
}

export const getArtistProfileService = async (artistId: string) => {
    const artist: IArtist | null = await Artist.findById(artistId)
    if(artist == null) {
        return messageHandler(false, "Artist does not exist", statusCodes.BAD_REQUEST, {})
    }
    artist.password = ""

    return messageHandler(true, "Artist found successfully", statusCodes.SUCCESS, artist)
}