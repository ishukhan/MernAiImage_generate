import colors from "colors";
import mongoose from "mongoose";

const ConnectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log(colors.green("CONNECT MONGO")))
    .catch((err) => {
      console.error(colors.red("failed to connect with mongo"));
      console.error(err);
    });
};

export default ConnectDB;
