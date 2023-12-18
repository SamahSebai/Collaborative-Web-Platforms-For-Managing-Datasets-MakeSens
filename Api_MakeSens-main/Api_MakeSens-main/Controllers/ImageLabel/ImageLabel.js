const express = require('express');
const router = express.Router();
const {Image} = require('../../Models/ImageLabel');
const ImageLabel = require('../../Models/ImageLabel');
const fs = require('fs');


// GET all ImageLabels
router.get('/', async (req, res) => {
  try {
    const imageLabels = await ImageLabel.find();
    res.json(imageLabels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one ImageLabel
router.get('/:id', getImageLabel, (req, res) => {
  res.json(res.imageLabel);
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { images, annotations } = req.body;
    const newImageLabel = new ImageLabel({ images, annotations });
    const result = await newImageLabel.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

  

// PUT (update) an ImageLabel
router.put('/:id', getImageLabel, async (req, res) => {
  if (req.body.images != null) {
    res.imageLabel.images = req.body.images;
  }
  if (req.body.annotations != null) {
    res.imageLabel.annotations = req.body.annotations;
  }
  try {
    const updatedImageLabel = await res.imageLabel.save();
    res.json(updatedImageLabel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an ImageLabel
router.delete('/:id', getImageLabel, async (req, res) => {
  try {
    await res.imageLabel.remove();
    res.json({ message: 'ImageLabel deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const { promises: fsPromises } = require('fs');


const path = require('path'); // Add this line to import the 'path' module

router.get('/export', async (req, res) => {
  try {
    const imageLabels = await ImageLabel.find();

    // Convert the data to JSON format
    const jsonData = JSON.stringify(imageLabels);

    // Generate a unique filename
    const filename = `imageLabels_${Date.now()}.json`; // Wrap the filename in backticks (`) instead of single quotes ('')

    // Define the file path
    const filePath = path.join('C:', 'Users', 'hp', 'Desktop', filename); // Set the desired download directory

    // Write the JSON data to a file
    await fsPromises.writeFile(filePath, jsonData);

    // Set the appropriate headers for the response
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`); // Wrap the filename in double quotes (") and backticks (``)
    res.setHeader('Content-Type', 'application/json');

    // Send the file as the response
    res.download(filePath, filename, (err) => {
      if (err) {
        console.log(`Failed to download file: ${filename}`);
      }

      // Delete the file after it has been downloaded
      fsPromises.unlink(filePath)
        .catch((err) => {
          console.log(`Failed to delete file: ${filename}`);
        });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Middleware function to get a single ImageLabel by ID
async function getImageLabel(req, res, next) {
  try {
    const imageLabel = await ImageLabel.findById(req.params.id);
    if (imageLabel == null) {
      return res.status(404).json({ message: 'Cannot find ImageLabel' });
    }
    res.imageLabel = imageLabel;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}



module.exports = router;
