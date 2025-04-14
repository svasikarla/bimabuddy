"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language =
  | "english"
  | "hindi"
  | "tamil"
  | "telugu"
  | "bengali"
  | "marathi"
  | "gujarati"
  | "kannada"
  | "malayalam"
  | "punjabi"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Simplified translations for demo purposes
const translations: Record<Language, Record<string, string>> = {
  english: {
    "hero.title": "Find the Right Health Insurance for You",
    "hero.subtitle": "Compare plans, understand benefits, and make informed decisions",
    "features.title": "Compare Health Insurance Features",
    "ayushman.title": "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    "ayushman.description":
      "A flagship scheme of Government of India that provides free access to health insurance coverage for low income earners in the country.",
    "chat.start": "Chat with us",
    language: "Language",
    // Add more translations as needed
  },
  hindi: {
    "hero.title": "आपके लिए सही स्वास्थ्य बीमा खोजें",
    "hero.subtitle": "योजनाओं की तुलना करें, लाभों को समझें, और सूचित निर्णय लें",
    "features.title": "स्वास्थ्य बीमा सुविधाओं की तुलना करें",
    "ayushman.title": "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (पीएम-जेएवाई)",
    "ayushman.description":
      "भारत सरकार की एक प्रमुख योजना जो देश में कम आय वाले लोगों को स्वास्थ्य बीमा कवरेज तक मुफ्त पहुंच प्रदान करती है।",
    "chat.start": "हमसे चैट करें",
    language: "भाषा",
    // Add more translations as needed
  },
  tamil: {
    "hero.title": "உங்களுக்கு சரியான சுகாதார காப்பீட்டைக் கண்டறியவும்",
    "hero.subtitle": "திட்டங்களை ஒப்பிடுங்கள், நன்மைகளைப் புரிந்துகொள்ளுங்கள், மற்றும் தகவலறிந்த முடிவுகளை எடுங்கள்",
    "features.title": "சுகாதார காப்பீட்டு அம்சங்களை ஒப்பிடுக",
    "ayushman.title": "ஆயுஷ்மான் பாரத் - பிரதமர் ஜன் ஆரோக்யா யோஜனா (பிஎம்-ஜேஏவை)",
    "ayushman.description":
      "நாட்டில் குறைந்த வருமானம் ஈட்டுபவர்களுக்கு இலவச சுகாதார காப்பீட்டு கவரேஜை வழங்கும் இந்திய அரசின் ஒரு முக்கிய திட்டம்.",
    "chat.start": "எங்களுடன் அரட்டை",
    language: "மொழி",
    // Add more translations as needed
  },
  // Add more languages as needed
  telugu: {
    "hero.title": "మీకు సరైన ఆరోగ్య బీమాను కనుగొనండి",
    "hero.subtitle": "ప్లాన్లను పోల్చండి, ప్రయోజనాలను అర్థం చేసుకోండి మరియు సమాచారం ఆధారిత నిర్ణయాలు తీసుకోండి",
    "features.title": "ఆరోగ్య బీమా ఫీచర్లను పోల్చండి",
    "ayushman.title": "ఆయుష్మాన్ భారత్ - ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన (పిఎం-జేఏవై)",
    "ayushman.description": "దేశంలోని తక్కువ ఆదాయం పొందేవారికి ఉచిత ఆరోగ్య బీమా కవరేజీని అందించే భారత ప్రభుత్వం యొక్క ఫ్లాగ్‌షిప్ పథకం.",
    "chat.start": "మాతో చాట్ చేయండి",
    language: "భాష",
  },
  bengali: {
    "hero.title": "আপনার জন্য সঠিক স্বাস্থ্য বীমা খুঁজুন",
    "hero.subtitle": "পরিকল্পনাগুলি তুলনা করুন, সুবিধাগুলি বুঝুন এবং অবহিত সিদ্ধান্ত নিন",
    "features.title": "স্বাস্থ্য বীমা বৈশিষ্ট্যগুলি তুলনা করুন",
    "ayushman.title": "আয়ুষ্মান ভারত - প্রধানমন্ত্রী জন আরোগ্য যোজনা (পিএম-জেএওয়াই)",
    "ayushman.description": "ভারত সরকারের একটি ফ্ল্যাগশিপ প্রকল্প যা দেশের কম আয়ের লোকদের বিনামূল্যে স্বাস্থ্য বীমা কভারেজ প্রদান করে।",
    "chat.start": "আমাদের সাথে চ্যাট করুন",
    language: "ভাষা",
  },
  marathi: {
    "hero.title": "तुमच्यासाठी योग्य आरोग्य विमा शोधा",
    "hero.subtitle": "योजनांची तुलना करा, फायदे समजून घ्या आणि माहितीपूर्ण निर्णय घ्या",
    "features.title": "आरोग्य विमा वैशिष्ट्यांची तुलना करा",
    "ayushman.title": "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (पीएम-जेएवाय)",
    "ayushman.description":
      "भारत सरकारची एक प्रमुख योजना जी देशातील कमी उत्पन्न असलेल्या लोकांना मोफत आरोग्य विमा कव्हरेज प्रदान करते.",
    "chat.start": "आमच्याशी चॅट करा",
    language: "भाषा",
  },
  gujarati: {
    "hero.title": "તમારા માટે યોગ્ય આરોગ્ય વીમો શોધો",
    "hero.subtitle": "યોજનાઓની તુલના કરો, લાભો સમજો અને માહિતીપૂર્ણ નિર્ણયો લો",
    "features.title": "આરોગ્ય વીમા સુવિધાઓની તુલના કરો",
    "ayushman.title": "આયુષ્માન ભારત - પ્રધાનમંત્રી જન આરોગ્ય યોજના (પીએમ-જેએવાય)",
    "ayushman.description": "ભારત સરકારની એક ફ્લેગશિપ યોજના જે દેશમાં ઓછી આવક ધરાવતા લોકોને મફત આરોગ્ય વીમા કવરેજ પ્રદાન કરે છે.",
    "chat.start": "અમારી સાથે ચેટ કરો",
    language: "ભાષા",
  },
  kannada: {
    "hero.title": "ನಿಮಗೆ ಸರಿಯಾದ ಆರೋಗ್ಯ ವಿಮೆಯನ್ನು ಹುಡುಕಿ",
    "hero.subtitle": "ಯೋಜನೆಗಳನ್ನು ಹೋಲಿಸಿ, ಪ್ರಯೋಜನಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಮಾಹಿತಿಯುಕ್ತ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ",
    "features.title": "ಆರೋಗ್ಯ ವಿಮೆ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಹೋಲಿಸಿ",
    "ayushman.title": "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ ಆರೋಗ್ಯ ಯೋಜನೆ (ಪಿಎಂ-ಜೆಎವೈ)",
    "ayushman.description": "ದೇಶದಲ್ಲಿ ಕಡಿಮೆ ಆದಾಯ ಗಳಿಸುವವರಿಗೆ ಉಚಿತ ಆರೋಗ್ಯ ವಿಮಾ ಕವರೇಜ್ ಒದಗಿಸುವ ಭಾರತ ಸರ್ಕಾರದ ಫ್ಲಾಗ್‌ಶಿಪ್ ಯೋಜನೆ.",
    "chat.start": "ನಮ್ಮೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
    language: "ಭಾಷೆ",
  },
  malayalam: {
    "hero.title": "നിങ്ങൾക്ക് ശരിയായ ആരോഗ്യ ഇൻഷുറൻസ് കണ്ടെത്തുക",
    "hero.subtitle": "പദ്ധതികൾ താരതമ്യം ചെയ്യുക, ആനുകൂല്യങ്ങൾ മനസ്സിലാക്കുക, വിവരങ്ങളറിഞ്ഞ തീരുമാനങ്ങൾ എടുക്കുക",
    "features.title": "ആരോഗ്യ ഇൻഷുറൻസ് സവിശേഷതകൾ താരതമ്യം ചെയ്യുക",
    "ayushman.title": "ആയുഷ്മാൻ ഭാരത് - പ്രധാനമന്ത്രി ജൻ ആരോഗ്യ യോജന (പിഎം-ജെഎവൈ)",
    "ayushman.description": "രാജ്യത്തെ കുറഞ്ഞ വരുമാനക്കാർക്ക് സൗജന്യ ആരോഗ്യ ഇൻഷുറൻസ് പരിരക്ഷ നൽകുന്ന ഇന്ത്യാ ഗവൺമെന്റിന്റെ ഒരു ഫ്ലാഗ്ഷിപ്പ് പദ്ധതി.",
    "chat.start": "ഞങ്ങളുമായി ചാറ്റ് ചെയ്യുക",
    language: "ഭാഷ",
  },
  punjabi: {
    "hero.title": "ਆਪਣੇ ਲਈ ਸਹੀ ਸਿਹਤ ਬੀਮਾ ਲੱਭੋ",
    "hero.subtitle": "ਯੋਜਨਾਵਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ, ਲਾਭਾਂ ਨੂੰ ਸਮਝੋ, ਅਤੇ ਸੂਚਿਤ ਫੈਸਲੇ ਲਓ",
    "features.title": "ਸਿਹਤ ਬੀਮਾ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ",
    "ayushman.title": "ਆਯੂਸ਼ਮਾਨ ਭਾਰਤ - ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਜਨ ਆਰੋਗਯ ਯੋਜਨਾ (ਪੀਐਮ-ਜੇਏਵਾਈ)",
    "ayushman.description":
      "ਭਾਰਤ ਸਰਕਾਰ ਦੀ ਇੱਕ ਫਲੈਗਸ਼ਿਪ ਸਕੀਮ ਜੋ ਦੇਸ਼ ਵਿੱਚ ਘੱਟ ਆਮਦਨੀ ਵਾਲਿਆਂ ਨੂੰ ਸਿਹਤ ਬੀਮਾ ਕਵਰੇਜ ਤੱਕ ਮੁਫਤ ਪਹੁੰਚ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।",
    "chat.start": "ਸਾਡੇ ਨਾਲ ਗੱਲ ਕਰੋ",
    language: "ਭਾਸ਼ਾ",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("english")

  // Function to translate text based on current language
  const t = (key: string) => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
