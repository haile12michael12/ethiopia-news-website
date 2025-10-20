export function gregorianToEthiopian(date: Date): { year: number; month: number; day: number } {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let e_year: number, e_month: number, e_day: number;

  if (month === 1 && day <= 9) {
    e_year = year - 8;
    e_month = 4;
    e_day = day + 21;
  } else if (month >= 9 || (month === 9 && day >= 11)) {
    e_year = year - 7;
    if (month === 9) {
      e_month = 1;
      e_day = day - 10;
    } else if (month === 10) {
      e_month = day <= 10 ? 1 : 2;
      e_day = day <= 10 ? day + 20 : day - 10;
    } else if (month === 11) {
      e_month = day <= 9 ? 2 : 3;
      e_day = day <= 9 ? day + 21 : day - 9;
    } else if (month === 12) {
      e_month = day <= 9 ? 3 : 4;
      e_day = day <= 9 ? day + 21 : day - 9;
    } else {
      e_month = month - 8;
      e_day = day + 21;
    }
  } else {
    e_year = year - 7;
    e_month = month + 4;
    e_day = day + 21;
  }

  return { year: e_year, month: e_month, day: e_day };
}

export function formatEthiopianDate(date: Date, language: string = 'en'): string {
  const eth = gregorianToEthiopian(date);
  
  const months: Record<string, string[]> = {
    en: ['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit', 'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'],
    am: ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን']
  };
  
  const monthNames = months[language] || months.en;
  const monthName = monthNames[eth.month - 1] || '';
  
  return `${monthName} ${eth.day}, ${eth.year}`;
}
