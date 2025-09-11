const TranslationModel=require('../models/Translation')


const addTranslation = async (req, res) => {
  try {
    const { language, translations } = req.body;

    // check if language already exists
    const existing = await TranslationModel.findOne({ language });
    if (existing) {
      return res.status(400).json({ message: "Language already exists" });
    }

    const newTranslation = new TranslationModel({ language, translations });
    await newTranslation.save();

    res.status(201).json({ message: "Translation added successfully", data: newTranslation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



 const addTranslations = async (req, res) => {
  try {
    const translations = await TranslationModel.insertMany(req.body); // req.body should be an array
    res.status(201).json({ success: true, data: translations });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

 const getAllTranslations = async (req, res) => {
  try {
    const data = await TranslationModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get translation by language (example: en, es, fr)
 const getTranslationByLang = async (req, res) => {
  try {
    const { lang } = req.params;
    const translation = await TranslationModel.findOne({ language: lang });

    if (!translation) {
      return res.status(404).json({ message: "Translation not found" });
    }

    res.json(translation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update translation
 const updateTranslation = async (req, res) => {
  try {
    const { lang } = req.params;
    const { editingKey, editingValue } = req.body;
   const updateField = `translations.${editingKey}`;

    const updated = await TranslationModel.findOneAndUpdate(
      { language: lang },
     { $set: { [updateField]: editingValue } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Translation not found" });
    }

    res.json({ message: "Translation updated successfully", data: updated });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete translation
const deleteTranslation = async (req, res) => {
  try {
    const { lang } = req.params;
    const deleted = await TranslationModel.findOneAndDelete({ language: lang });

    if (!deleted) {
      return res.status(404).json({ message: "Translation not found" });
    }

    res.json({ message: "Translation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const keyExists = async (req, res) => {
  try {
    const { key } = req.body;

    // ✅ Get all translations
    const data = await TranslationModel.find();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    // ✅ Convert Map to Object
    const firstLang = data[0];
    const translationsObj = firstLang.translations instanceof Map
      ? Object.fromEntries(firstLang.translations)
      : firstLang.translations;

    // ✅ Extract keys and check
    const keys = Object.keys(translationsObj);
    

    if (keys.includes(key)) {
      return res.status(200).json({ exists: true, message: "Key exists" });
    } else {
      return res.status(200).json({ exists: false, message: "Key does not exist" });
    }

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



const keyAdded = async (req, res) => {
  try {
    const { newKey, newValues } = req.body; 
    

    const langdata = Object.keys(newValues);

    const updatedDocs = await Promise.all(
      langdata.map(async (lang) => {
        return await TranslationModel.findOneAndUpdate(
          { language: lang },
          { $set: { [`translations.${newKey}`]: newValues[lang] } },
          { new: true, upsert: true }
        );
      })
    );

    return res.status(200).json({
      message: "Key added successfully",
      data: updatedDocs
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};



module.exports = {
  addTranslation,
  getAllTranslations,     
  getTranslationByLang,
  updateTranslation,
  deleteTranslation,
  addTranslations,
  keyExists,
  keyAdded
};  