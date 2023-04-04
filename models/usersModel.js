import { model, Schema } from "mongoose";

const usersSchema = new Schema({
    name: String,
    email: String,
    password: String,
    imageUrl: String,
})


const User = model("User", usersSchema);
export default User;