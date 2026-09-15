import { CategoryInfo, VocabCategory } from "@/lib/types";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "fruits",
    label: "Fruits",
    hindiHint: "फल (Phal)",
    description: "Everyday and exotic fruits with real culinary & conversational examples.",
    icon: "Apple",
    bannerImage: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "animals",
    label: "Animals",
    hindiHint: "जानवर (Jaanwar)",
    description: "Domestic, wild, and urban fauna found across India and the globe.",
    icon: "Dog",
    bannerImage: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "body-parts",
    label: "Body Parts",
    hindiHint: "शरीर के अंग (Shareer ke ang)",
    description: "Anatomical terms, posture words, and medical visit vocabulary.",
    icon: "Activity",
    bannerImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "relationships",
    label: "Relationships",
    hindiHint: "रिश्ते और नाते (Rishte)",
    description: "Family members, colleagues, friendships, and professional ties.",
    icon: "Users",
    bannerImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "objects",
    label: "Objects & Everyday Items",
    hindiHint: "दैनिक वस्तुएं (Vastuyein)",
    description: "Common accessories, tools, luggage, and personal belongings.",
    icon: "Briefcase",
    bannerImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "nature",
    label: "Nature & Weather",
    hindiHint: "प्रकृति और मौसम (Prakriti)",
    description: "Monsoons, skies, terrains, seasons, and ecological vocabulary.",
    icon: "CloudRain",
    bannerImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "spices",
    label: "Spices & Herbs",
    hindiHint: "मसाले और जड़ी-बूटियाँ (Masale)",
    description: "Essential aromatic spices, curry staples, and tea infusions.",
    icon: "Flame",
    bannerImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "kitchen-equipment",
    label: "Kitchen Equipment",
    hindiHint: "रसोई के बर्तन व उपकरण (Rasoi)",
    description: "Cookware, culinary cutlery, utensils, and appliances.",
    icon: "Utensils",
    bannerImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "house-vocabulary",
    label: "House & Architecture",
    hindiHint: "घर और इमारतें (Ghar)",
    description: "Rooms, interior features, verandas, fixtures, and balconies.",
    icon: "Home",
    bannerImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
];

export function getCategoryMeta(id: VocabCategory): CategoryInfo | undefined {
  return CATEGORIES.find((cat) => cat.id === id);
}
