import mongoose from 'mongoose';

declare module 'mongoose' {
  type ObjectId = mongoose.Types.ObjectId & {
    equals: (otherId: mongoose.Types.ObjectId) => boolean;
  };
}
