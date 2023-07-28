import mongoose, { Document, Schema, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
}

interface IUserModel extends Model<IUser> {
  findUserByCredentials(email: string, password: string): Promise<IUser>;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email required'],
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'This field must be an email.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
): Promise<IUser> {
  return this.findOne({ email })
    .select('+password')
    .then((user: IUser | null) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password).then((matched: boolean) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }

        return user;
      });
    });
};

userSchema.methods.toJSON = function (): Partial<IUser> {
  const obj = this.toObject();
  const { password, ...rest } = obj;
  return rest;
};

export default mongoose.model<IUser, IUserModel>('user', userSchema);
