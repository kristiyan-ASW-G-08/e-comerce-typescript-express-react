import mongoose, { Model, Document } from 'mongoose';
import Pagination from '@customTypes/Pagination';

const findDocs = async <
  T extends Document,
  Y = { [key: string]: string | mongoose.Types.ObjectId | number }
>({
  query,
  model,
  pagination: { limit, page },
}: {
  query: Y;
  model: Model<T>;
  pagination: Pagination;
}): Promise<{
  documents: T[];
  count: number;
}> => {
  const documents = await model
    .countDocuments()
    //@ts-ignore
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  //@ts-ignore
  const count = (await model.countDocuments(query)) - page * limit;

  return {
    documents,
    count,
  };
};

export default findDocs;
