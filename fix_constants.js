import fs from 'fs';

let content = fs.readFileSync('constants.tsx', 'utf8');
content = content.replace(
    'slug: "yapay-zeka-chatbot-whatsapp-ig",',
    'slug: "yapay-zeka-chatbot", // changed from yapay-zeka-chatbot-whatsapp-ig\n    features: [],\n    benefits: [],\n    aiFeatures: { title: "Yapay Zeka Destekli Chatbot Özellikleri", subtitle: "Müşterilerinizi anında karşılayın", features: [] },\n    targetAudience: [],'
);
fs.writeFileSync('constants.tsx', content);

// Let's also check if there are other usages of `yapay-zeka-chatbot-whatsapp-ig` in YapayZekaUygulamalarPage
let content2 = fs.readFileSync('pages/YapayZekaUygulamalarPage.tsx', 'utf8');
content2 = content2.replace(/yapay-zeka-chatbot-whatsapp-ig/g, 'yapay-zeka-chatbot');
fs.writeFileSync('pages/YapayZekaUygulamalarPage.tsx', content2);
