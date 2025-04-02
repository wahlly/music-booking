import { Application } from "express";
import userRoute from "./userRoute"

const route = (app: Application) => {
    app.use("/user", userRoute)
}

export default route