// imagekitUpload.js

const fs = require('fs');
const ImageKit = require('imagekit');

// Configure ImageKit client
const imagekit = new ImageKit({
  publicKey: "public_EuiUGcxFOxcgrcL+XmPI+YMgZu8=",
  privateKey: "private_l4QWR4qMnwvaFW6H0oshYAvzjmQ=",
  urlEndpoint: "https://ik.imagekit.io/mfp5ntrzv",
});

const uploadToWebSpaceKit = (filePath, fileName, callback) => {
  const file = fs.readFileSync(filePath);

  imagekit.upload(
    {
      file: file,
      fileName: fileName,
      folder: "/hareKrishna", // optional, specify the folder path if needed
    },
    function (error, result) {
      if (error) {
        console.error("Error uploading file to ImageKit:", error.message);
        return callback(error);
      }
      console.log("File uploaded successfully to ImageKit:", result.url);
      callback(null, result);
    }
  );
};

module.exports = uploadToWebSpaceKit;
