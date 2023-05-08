import mongoose from "mongoose";
const uri =
  "mongodb+srv://saviomascarenhas6:Uws95fDPKfcIDouU@cluster0.pfi150d.mongodb.net/Cluster0?retryWrites=true&w=majority";
export const connectDB = () => {
  return mongoose.connect(uri);
};
