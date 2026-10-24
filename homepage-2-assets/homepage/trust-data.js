// Fictional content for the local design prototype. Never use as business facts.
export const demoDepartments = [
  {
    id: 'sales', title: 'Отдел продаж', image: 'demo-sales-team.jpg',
    imageAlt: 'Команда отдела продаж: четыре коллеги в офисе',
    tasks: ['Сопроводим покупку, продажу или аренду', 'Подберём жилую или коммерческую недвижимость', 'Организуем показы и переговоры'],
  },
  {
    id: 'legal', title: 'Юридический отдел', image: 'demo-legal-team.jpg',
    imageAlt: 'Команда юридического отдела: два коллеги за документами',
    tasks: ['Проверим документы', 'Выявим ограничения и объясним риски', 'Подготовим договор и согласуем порядок расчётов'],
  },
  {
    id: 'mortgage', title: 'Ипотечные брокеры', image: 'demo-mortgage-team.jpg',
    imageAlt: 'Команда ипотечного направления: два коллеги обсуждают расчёты',
    tasks: ['Сравним ипотечные программы', 'Рассчитаем ежемесячный платёж', 'Подготовим заявку в банк'],
    note: 'Условия и решение по кредиту определяет банк.',
  },
];

export const demoVideoReviews = [
  { image: 'demo-review-buy.jpg', name: 'Анна и Сергей', service: 'Покупка квартиры', title: '«Нам было важно понимать каждый шаг»', description: 'История о выборе квартиры, просмотрах и подготовке к сделке.' },
  { image: 'demo-review-sell.jpg', name: 'Марина', service: 'Продажа квартиры', title: '«Было понятно, что происходит с продажей»', description: 'История о показах, переговорах и поддержке агента.' },
];

export const demoTextReviews = [
  { name: 'Алина', service: 'Покупка с ипотекой', quote: 'Сначала разобрались с бюджетом и платежом, потом стали смотреть квартиры. Мне объясняли условия простыми словами — было легче принимать решения.' },
  { name: 'Олег', service: 'Продажа и покупка', quote: 'Нужно было связать две сделки. Больше всего помогло, что был один человек, которому можно позвонить и уточнить, какой у нас следующий шаг.' },
  { name: 'Елена', service: 'Юридическое сопровождение', quote: 'Обратилась за проверкой документов. Мне объяснили, что уточнить у продавца и какие условия включить в договор. Стало понятнее, как готовиться к сделке.' },
];

// Organization identity checked against its address and the original Kvadrat reference.
// Platform ratings are deliberately not copied into the illustrative rating component.
export const reviewPlatforms = [
  { name: 'Яндекс Карты', label: 'Отзывы на Яндекс Картах', href: 'https://yandex.ru/maps/org/kvadrat/241011064676/reviews/', logo: 'yandex-maps-official.svg' },
  { name: '2ГИС', label: 'Отзывы в 2ГИС', href: 'https://2gis.ru/orenburg/firm/70000001031559221/tab/reviews', logo: '2gis-official.svg' },
];
