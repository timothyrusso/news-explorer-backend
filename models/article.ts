import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

interface IArticle extends Document {
  keyword: string;
  title: string;
  text: string;
  date: string;
  source: string;
  link: string;
  image: string;
  owner: Schema.Types.ObjectId;
}

const articleSchema: Schema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: [true, 'url required'],
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: 'This field must be a link.',
    },
  },
  image: {
    type: String,
    required: [true, 'url required'],
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: 'This field must be a link.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

articleSchema.methods.toJSON = function () { // eslint-disable-line
  const { owner, ...obj } = this.toObject(); // eslint-disable-line
  return obj;
};

export default mongoose.model<IArticle>('article', articleSchema);
