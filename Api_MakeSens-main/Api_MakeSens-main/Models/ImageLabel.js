const mongoose = require('mongoose');

// Define the schema for the images
const ImageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  size: Number,
  file_name: String,
  file_url: String
});

const annotationSchema = new mongoose.Schema({
  iscrowd: Number,
  label: String,
  height: Number,
  width: Number,
  type: String,
  segmentation: Array,
  area: Number,
});
// Define the schema for the ImageLabel
const ImageLabelSchema = new mongoose.Schema({
  images:ImageSchema,
  annotations: [annotationSchema]
});

// Create the ImageLabel model
const ImageLabel = mongoose.model('ImageLabel', ImageLabelSchema);

module.exports = ImageLabel;
