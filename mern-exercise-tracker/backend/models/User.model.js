import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
modules.export = User;