const route = require("express").Router();
const TranslationRoute = require("../controllers/TranslationController");

// ✅ Add a new translation
route.post("/", TranslationRoute.addTranslation);

// ✅ Add multiple translations
route.post("/bulk", TranslationRoute.addTranslations);

// ✅ Get all translations
route.get("/", TranslationRoute.getAllTranslations);

// ✅ Get translation by language (en, es, fr…)
route.get("/:lang", TranslationRoute.getTranslationByLang);

// ✅ Update translation by language
route.put("/:lang", TranslationRoute.updateTranslation);

// ✅ Delete translation by language
route.delete("/:lang", TranslationRoute.deleteTranslation);
route.post("/check-key",TranslationRoute.keyExists)
route.post("/add-key",TranslationRoute.keyAdded)
 
module.exports=route