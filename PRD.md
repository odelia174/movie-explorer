# Movie Explorer — PRD

## מטרת הפרויקט
אפליקציה לגילוי וחיפוש סדרות טלוויזיה באמצעות TVmaze API.

המשתמש יכול לצפות ברשימת סדרות, לחפש סדרה, לפתוח את הפרטים שלה, לשמור מועדפים ולהשוות בין שתי סדרות.

## טכנולוגיות
- React + Vite + TypeScript
- React Router
- TVmaze API
- Vitest + Vitest UI
- CSS רספונסיבי

## עמודי האפליקציה

### 1. רשימת סדרות — /
מציג רשימת סדרות עם תמונות, שמות, דירוגים וחיפוש לפי שם.

### 2. פרטי סדרה — /items/:id
מציג תמונה, תקציר, ז'אנרים, דירוג וסטטוס של הסדרה.

### 3. מועדפים — /favorites
מציג את הסדרות שהמשתמש בחר לשמור ומאפשר להסיר אותן.

### 4. השוואת סדרות — /compare
מאפשר לבחור שתי סדרות ולהשוות ביניהן לפי דירוג, ז'אנרים וסטטוס.

## סיפורי משתמש וקריטריוני קבלה

- When I open the home page, I see a list of shows loaded from TVmaze.
- When I search for a show, I see only matching shows.
- When I click a show, I see its details at /items/:id.
- When I add a show to favorites, I see it on the favorites page.
- When I choose two shows, I see their details side by side.
- When data is loading, I see a loading message.
- When the API fails, I see an error message.

## דרישות טכניות
- לפחות 4 רכיבים מותאמים אישית, מלבד העמודים.
- טיפוסי TypeScript לנתוני API ול־props, ללא any.
- React Router עם Link, NavLink ו־useParams.
- שימוש ב־fetch בתוך useEffect.
- שימוש ב־map עם key ייחודי.
- חיפוש או סינון סדרות.
- לפחות 5 בדיקות Vitest ללוגיקה אמיתית.
- הפעלת בדיקות גם באמצעות Vitest UI.
- עיצוב מותאם למחשב ולנייד.
- npm run build ו־npm test עוברים ללא שגיאות.
- תיעוד README.md, tasks.md ו־PROMPTS.md.