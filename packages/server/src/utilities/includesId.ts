import mongoose from 'mongoose';

const includesId = (
  arr: mongoose.Types.ObjectId[],
  stringId: string,
): boolean =>
  arr.some((id: mongoose.Types.ObjectId): boolean =>
    //@ts-ignore
    id.equals(new mongoose.Types.ObjectId(stringId)),
  );

export default includesId;
