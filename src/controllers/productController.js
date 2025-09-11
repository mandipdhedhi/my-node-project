const GalleryModel = require("../models/Product");

// ➕ Add Gallery
const addGallery = async (req, res) => {
  
  try {
    
    const { title, subtitle, images } = req.body;

    const newGallery = new GalleryModel({
      title,
      subtitle,
      images,
      banner: req.file ? req.file.path : "",
    
    });
    
    const savedGallery = await newGallery.save();

    res.json({
      message: "Gallery added successfully",
      data: savedGallery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding gallery",
      error: error.message,
    });
  }
};

// 📥 Get All Galleries
// const getAllGalleries = async (req, res) => {

//   const page = parseInt(req.query.page) || 1;   
//     const limit = parseInt(req.query.limit) || 2;

//   try {

//      const skip = (page - 1) * limit;

//     const total = await Banner.countDocuments();
//     const galleries = await GalleryModel.find().skip(skip)
//       .limit(limit);

//     res.json({
//       message: "All galleries fetched successfully",
//       data: galleries,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching galleries",
//       error: error.message,
//     });
//   }
// };

const getAllGalleries = async (req, res) => {
  const page = parseInt(req.query.page) ;   
  const limit = parseInt(req.query.limit) ;


  try {
    const skip = (page - 1) * limit;

    const total = await GalleryModel.countDocuments();  
    const galleries = await GalleryModel.find()
      .skip(skip)
      .limit(limit);

    res.json({
      message: "All galleries fetched successfully",
      page,
      limit,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      data: galleries,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching galleries",
      error: error.message,
    });
  }
};


// 📥 Get Gallery By User
const getGalleryByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const galleries = await GalleryModel.find({ createdBy: userId });

    res.json({
      message: "Galleries fetched for user",
      data: galleries,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user galleries",
      error: error.message,
    });
  }
};

// Delete gallery by ID
 const deleteGallery = async (req, res) => {
    
  try {
    const { id } = req.params;
    
    const deletedGallery = await GalleryModel.findByIdAndDelete(id);

    if (!deletedGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json({ message: "Gallery deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting gallery", error: error.message });
  }
};


// Update gallery by ID
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGallery = await GalleryModel.findByIdAndUpdate(
      id,
      req.body,  // {title, subtitle, images:{url:"..."}}
      { new: true, runValidators: true }
    );

    if (!updatedGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json({ message: "Gallery updated successfully", data: updatedGallery });
  } catch (error) {
    res.status(500).json({ message: "Error updating gallery", error: error.message });
  }
};


module.exports = { addGallery, getAllGalleries, getGalleryByUser,updateGallery,deleteGallery };
