import { WeddingConfig } from '../types/wedding';

export const initialWeddingConfig: WeddingConfig = {
  groom: {
    name: {
      en: 'Zayd Al-Mansoor',
      ur: 'زید المنصور',
      ar: 'زيد المنصور',
    },
    parents: {
      en: 'Son of Mr. & Mrs. Tariq Al-Mansoor',
      ur: 'فرزند ارجمند جناب طارق المنصور و بیگم',
      ar: 'نجل السيد طارق المنصور وحرمه',
    },
  },
  bride: {
    name: {
      en: 'Ayla Noor Siddiqui',
      ur: 'عائلہ نور صدیقی',
      ar: 'عائلة نور الصديقي',
    },
    parents: {
      en: 'Daughter of Mr. & Mrs. Farhan Siddiqui',
      ur: 'دخترِ نیک اختر جناب فرحان صدیقی و بیگم',
      ar: 'كريمة السيد فرحان الصديقي وحرمه',
    },
  },
  nameOrder: 'groom_first',
  initials: 'Z & A',
  // Scheduled in November 2026 for a live active countdown
  eventDateTimeISO: '2026-11-20T17:30:00',
  nikah: {
    title: {
      en: 'The Nikah Ceremony',
      ur: 'مبارک تقریبِ نکاح',
      ar: 'عقد القران المبارك',
    },
    dayAndDate: {
      en: 'Friday, 20th November 2026',
      ur: 'جمعۃ المبارک، ۲۰ نومبر ۲۰۲۶ء',
      ar: 'الجمعة، ٢٠ نوفمبر ٢٠٢٦',
    },
    time: {
      en: '5:30 PM (Maghrib Prayers to Follow)',
      ur: 'شام ۵:۳۰ بجے (بعد نماز مغرب)',
      ar: 'الساعة ٥:٣٠ مساءً (تليها صلاة المغرب)',
    },
    venueName: {
      en: 'The Ivory Pavilion & Gardens',
      ur: 'دی آئیوری پیویلین اینڈ گارڈنز',
      ar: 'جناح العاج والحدائق الملكية',
    },
    venueAddress: {
      en: 'Royal Palm Avenue, Clifton Enclave',
      ur: 'رائل پام ایونیو، کلفٹن انکلیو',
      ar: 'شارع النخيل الملكي، كليفتون',
    },
    cityCountry: {
      en: 'Lahore, Pakistan',
      ur: 'لاہور، پاکستان',
      ar: 'لاهور، باكستان',
    },
    mapQuery: 'Royal Palm Avenue, Lahore, Pakistan',
  },
  dressCode: {
    en: 'Formal / Traditional Elegance in Pastel & Ivory Hues',
    ur: 'روایتی و باوقار لباس (ہلکے و پروقار رنگ)',
    ar: 'الزي التقليدي الأنيق / ألوان الباستيل والعاجي',
  },
  duaText: {
    en: '“May Allah bless you and bestow His blessings upon you, and unite you both in goodness and peace.”',
    ur: '”بارک اللہ لک وبارک علیک وجمع بینکما فی خیر“ — اللہ آپ کو برکت دے، آپ پر برکت نازل فرمائے اور آپ دونوں کو خیر میں یکجا کرے۔',
    ar: '«بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ»',
  },
};
