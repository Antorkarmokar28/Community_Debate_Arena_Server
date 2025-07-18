import { model, Schema } from 'mongoose';
import { IUser } from './auth.interface';
import bcrypt from 'bcrypt'
import config from '../../config';
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    totalVotesReceived: { type: Number, default: 0 },
    debatesParticipated: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// this function using for user password hash
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
// user find by email with static method
userSchema.statics.isUserExitsByEmail = async function (
  email: string,
) {
  return await User.findOne({ email }).select('+password');
};
// user password match checkin with static method
userSchema.statics.isPasswordMatched = async function (
  planeTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planeTextPassword, hashedPassword);
};

export const User = model<IUser>('User', userSchema);
