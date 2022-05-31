import mongoose from 'mongoose';
import logger from '@utilities/logger';

const connectToDB = async (mongoURI: string): Promise<void> => {
  try {
    await mongoose.connect(mongoURI, {
      //@ts-ignore
      useNewUrlParser: true,
    });
  } catch (err) {
    logger.error(`MongoDB Connection Error: ${err}`);
  }
};
export default connectToDB;
