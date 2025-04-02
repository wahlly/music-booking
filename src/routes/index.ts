import { Application } from "express";
import userRoute from "./userRoute"
import artistRoute from "./artistRoute"

const route = (app: Application) => {
    app.use("/user", userRoute)
    app.use("/artist", artistRoute)
}

export default route