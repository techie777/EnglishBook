import { DailySentence } from "@/lib/types";

export interface ExcelSentenceRow {
  rowNumber: number;
  hindi: string;
  english: string;
  category: string;
  level: string;
}

export const SEED_100_EXCEL_ROWS: ExcelSentenceRow[] = [
  { rowNumber: 1, hindi: "मैं रोज़ स्कूल जाता हूँ।", english: "I go to school every day.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 2, hindi: "वह रोज़ सुबह उठता है।", english: "He wakes up every morning.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 3, hindi: "वह चाय पीती है।", english: "She drinks tea.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 4, hindi: "हम क्रिकेट खेलते हैं।", english: "We play cricket.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 5, hindi: "वे फुटबॉल खेलते हैं।", english: "They play football.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 6, hindi: "मैं रोज़ किताब पढ़ता हूँ।", english: "I read a book every day.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 7, hindi: "वह अंग्रेज़ी बोलता है।", english: "He speaks English.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 8, hindi: "मेरी माँ खाना बनाती हैं।", english: "My mother cooks food.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 9, hindi: "मेरे पिता अखबार पढ़ते हैं।", english: "My father reads the newspaper.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 10, hindi: "हम सुबह टहलते हैं।", english: "We walk in the morning.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 11, hindi: "सूरज पूर्व से निकलता है।", english: "The sun rises in the east.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 12, hindi: "पानी 100 डिग्री पर उबलता है।", english: "Water boils at 100 degrees.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 13, hindi: "मैं अपना कमरा साफ करता हूँ।", english: "I clean my room.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 14, hindi: "वह रोज़ काम करता है।", english: "He works every day.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 15, hindi: "वह स्कूल में पढ़ाती है।", english: "She teaches at school.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 16, hindi: "बच्चे पार्क में खेलते हैं।", english: "Children play in the park.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 17, hindi: "हम साथ में खाना खाते हैं।", english: "We eat together.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 18, hindi: "मैं दूध पीता हूँ।", english: "I drink milk.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 19, hindi: "वह बस से स्कूल जाती है।", english: "She goes to school by bus.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 20, hindi: "मेरा भाई क्रिकेट पसंद करता है।", english: "My brother likes cricket.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 21, hindi: "मुझे आम पसंद हैं।", english: "I like mangoes.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 22, hindi: "उसे संगीत पसंद है।", english: "He likes music.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 23, hindi: "वह रोज़ टीवी देखती है।", english: "She watches TV every day.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 24, hindi: "मैं रात में जल्दी सोता हूँ।", english: "I sleep early at night.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 25, hindi: "वह सुबह व्यायाम करता है।", english: "He exercises in the morning.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 26, hindi: "पक्षी आकाश में उड़ते हैं।", english: "Birds fly in the sky.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 27, hindi: "तारे रात में चमकते हैं।", english: "Stars shine at night.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 28, hindi: "हम भारत में रहते हैं।", english: "We live in India.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 29, hindi: "वह बैंक में काम करती है।", english: "She works in a bank.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 30, hindi: "कुत्ते रात में भौंकते हैं।", english: "Dogs bark at night.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 31, hindi: "बिल्ली दूध पीती है।", english: "The cat drinks milk.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 32, hindi: "पौधे धूप में बढ़ते हैं।", english: "Plants grow in sunlight.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 33, hindi: "ट्रेन समय पर आती है।", english: "The train arrives on time.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 34, hindi: "वह बहुत मेहनत करता है।", english: "He works very hard.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 35, hindi: "हम रोज शाम को खेलते हैं।", english: "We play every evening.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 36, hindi: "वह गिटार बजाती है।", english: "She plays the guitar.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 37, hindi: "वे हर रविवार मंदिर जाते हैं।", english: "They go to the temple every Sunday.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 38, hindi: "मैं रोज सुबह ब्रश करता हूँ।", english: "I brush my teeth every morning.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 39, hindi: "वह समय पर स्कूल पहुँचता है।", english: "He reaches school on time.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 40, hindi: "अध्यापक कक्षा में पढ़ाते हैं।", english: "The teacher teaches in the classroom.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 41, hindi: "डॉक्टर मरीजों का इलाज करते हैं।", english: "Doctors treat patients.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 42, hindi: "किसान खेत में हल चलाते हैं।", english: "Farmers plough the field.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 43, hindi: "हवा धीरे-धीरे चलती है।", english: "The wind blows gently.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 44, hindi: "नदी पहाड़ से बहती है।", english: "The river flows from the mountain.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 45, hindi: "वह बहुत अच्छा गाती है।", english: "She sings very well.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 46, hindi: "हम सच्चाई पर विश्वास करते हैं।", english: "We believe in truth.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 47, hindi: "बच्चे खिलौनों से खेलते हैं।", english: "Children play with toys.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 48, hindi: "वह अपनी दादी से प्यार करता है।", english: "He loves his grandmother.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 49, hindi: "मेरी बहन चित्र बनाती है।", english: "My sister draws pictures.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 50, hindi: "मैं ताजे फल खाता हूँ।", english: "I eat fresh fruits.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 51, hindi: "वह मीठा बोलता है।", english: "He speaks politely.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 52, hindi: "हम रोजाना प्रार्थना करते हैं।", english: "We pray daily.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 53, hindi: "वे समय की कद्र करते हैं।", english: "They value time.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 54, hindi: "सूरज पश्चिम में डूबता है।", english: "The sun sets in the west.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 55, hindi: "मैं गर्म चाय पसंद करता हूँ।", english: "I prefer hot tea.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 56, hindi: "वह गरीबों की मदद करती है।", english: "She helps the poor.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 57, hindi: "गाय हमें दूध देती है।", english: "The cow gives us milk.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 58, hindi: "मछलियाँ पानी में तैरती हैं।", english: "Fish swim in water.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 59, hindi: "हम अंग्रेजी सीखते हैं।", english: "We learn English.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 60, hindi: "वह गणित पढ़ाता है।", english: "He teaches mathematics.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 61, hindi: "बच्चे कहानियां सुनते हैं।", english: "Children listen to stories.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 62, hindi: "वह हर दिन दौड़ता है।", english: "He runs every day.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 63, hindi: "मैं रोज नए शब्द सीखता हूँ।", english: "I learn new words every day.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 64, hindi: "वह सुंदर कपड़े पहनती है।", english: "She wears beautiful clothes.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 65, hindi: "पक्षी घोंसला बनाते हैं।", english: "Birds build nests.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 66, hindi: "माली पौधों को पानी देता है।", english: "The gardener waters the plants.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 67, hindi: "हम परिवार के साथ रहते हैं।", english: "We live with our family.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 68, hindi: "वह साइकिल चलाता है।", english: "He rides a bicycle.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 69, hindi: "वे बगीचे में टहलते हैं।", english: "They walk in the garden.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 70, hindi: "मैं अपना गृहकार्य समय पर करता हूँ।", english: "I do my homework on time.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 71, hindi: "वह मधुर बांसुरी बजाता है।", english: "He plays a sweet flute.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 72, hindi: "बच्चे स्कूल की वर्दी पहनते हैं।", english: "Children wear school uniforms.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 73, hindi: "हम शाम को चाय पीते हैं।", english: "We have tea in the evening.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 74, hindi: "वह बहुत तेज़ दौड़ता है।", english: "He runs very fast.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 75, hindi: "मेरी माँ मुझे प्यार करती हैं।", english: "My mother loves me.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 76, hindi: "वह अखबार बेचता है।", english: "He sells newspapers.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 77, hindi: "बच्चे बारिश में नाचते हैं।", english: "Children dance in the rain.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 78, hindi: "हम हमेशा सच बोलते हैं।", english: "We always speak the truth.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 79, hindi: "वह रात को दूध पीता है।", english: "He drinks milk at night.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 80, hindi: "वे अपने देश से प्यार करते हैं।", english: "They love their country.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 81, hindi: "मैं सुबह जल्दी उठता हूँ।", english: "I wake up early in the morning.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 82, hindi: "वह स्वादिष्ट खाना बनाती है।", english: "She cooks delicious food.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 83, hindi: "फूल खुशबू फैलाते हैं।", english: "Flowers spread fragrance.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 84, hindi: "हम त्यौहार उत्साह से मनाते हैं।", english: "We celebrate festivals with enthusiasm.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 85, hindi: "वह रोज डायरी लिखता है।", english: "He writes a diary every day.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 86, hindi: "बिजली रात में चमकती है।", english: "Lightning flashes in the night.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 87, hindi: "बच्चे मैदान में दौड़ते हैं।", english: "Children run in the playground.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 88, hindi: "वह कार चलाती है।", english: "She drives a car.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 89, hindi: "हम बड़ों का आदर करते हैं।", english: "We respect our elders.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 90, hindi: "वह ध्यान से सुनता है।", english: "He listens attentively.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 91, hindi: "सूरज हमें रोशनी और गर्मी देता है।", english: "The sun gives us light and heat.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 92, hindi: "मैं रोज योग करता हूँ।", english: "I practice yoga every day.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 93, hindi: "वह अपनी गलतियों से सीखता है।", english: "He learns from his mistakes.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 94, hindi: "वे शांति चाहते हैं।", english: "They desire peace.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 95, hindi: "हवा में ठंडक है।", english: "The air feels cool.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 96, hindi: "हम रात को तारे देखते हैं।", english: "We watch the stars at night.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 97, hindi: "वह मुस्कुरा कर बात करता है।", english: "He talks with a smile.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 98, hindi: "बच्चे दादाजी से कहानी सुनते हैं।", english: "Children listen to stories from grandfather.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 99, hindi: "मैं अपनी पढ़ाई पर ध्यान देता हूँ।", english: "I focus on my studies.", category: "Present Simple", level: "Beginner" },
  { rowNumber: 100, hindi: "हम सब मिलकर आगे बढ़ते हैं।", english: "We all progress together.", category: "Present Simple", level: "Beginner" },
];

/**
 * Converts Excel rows into DailySentence objects compatible with the reader & game engine
 */
export function convertExcelRowsToDailySentences(rows: ExcelSentenceRow[]): DailySentence[] {
  return rows.map((r, idx) => {
    const rawEnglish = r.english.trim();
    const jumbleWords = rawEnglish.split(/\s+/).filter(Boolean);

    return {
      id: `excel-s-${r.rowNumber || idx + 1}-${Date.now().toString(36).substring(4)}`,
      day: Math.min(12, Math.floor(idx / 10) + 1), // distributes nicely across days 1-10
      dayTitle: r.category || "Present Simple",
      hindi: r.hindi.trim(),
      english: rawEnglish,
      category: r.category.trim() || "Present Simple",
      level: (r.level?.trim() || "Beginner") as "Beginner" | "Intermediate" | "Expert",
      audioText: rawEnglish,
      jumbleWords,
    };
  });
}
