export const bodyParser = (req) => {
  let totalData = "";

  return new Promise((resolve, reject) => {
    req
      .on("data", (chunk) => {
        totalData += chunk.toString();
      })
      .on("end", () => {
        req.body = JSON.parse(totalData);
        resolve();
        console.log("Data has been parsed");
      })
      .on("error", () => {
        console.error("Error building bodyParser");
        reject();
      });
  });
};
