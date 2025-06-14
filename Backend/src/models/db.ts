import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
resetToken: String,
resetTokenExpiration: Date,
});

export default mongoose.model('User', userSchema);