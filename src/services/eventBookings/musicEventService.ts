import statusCodes from '../../constants/statusCodes'
import { MusicEvent, IMusicEvent } from '../../models/eventModel'
import { messageHandler, AlphaNumeric } from '../../utils/index'


export const newMusicEventService = async (payload: any) => {
    const eventRef = payload.hostArtist + AlphaNumeric(7, "alphaNumeric")
    const musicEvent: IMusicEvent = await MusicEvent.create({...payload, eventRef})

    return messageHandler(true, "Music event created successfully", statusCodes.SUCCESS, musicEvent)
}