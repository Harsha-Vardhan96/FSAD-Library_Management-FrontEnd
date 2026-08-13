/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Navigation
        explore: 'EXPLORE',
        resources: 'RESOURCES',
        courses: 'COURSES',
        login: 'User Login',
        // Admin
        adminConsole: 'Admin Console',
        systemOverview: 'System Overview',
        dashboardHome: 'Dashboard Home',
        resourcesHub: 'Resources Hub',
        userDirectory: 'User Directory',
        analytics: 'Analytics',
        settings: 'Settings',
        systemAnalytics: 'System Analytics',
        portalSettings: 'Portal Settings',
        // Hero
        heroTitlePrimary: 'Digital Library',
        heroTitleSecondary: 'of India',
        heroSubtitle: 'A paradigm shift in Indian education, providing universal access to millions of high-quality resources.',
        searchPlaceholder: 'Search for "Machine Learning"',
        searchButton: 'SEARCH',
        popular: 'Popular:',
        // Categories
        judicial: 'JUDICIAL RESOURCES',
        patents: 'PATENTS & STANDARDS',
        school: 'SCHOOL EDUCATION',
        higher: 'HIGHER EDUCATION',
        research: 'RESEARCH',
        career: 'CAREER DEVELOPMENT',
        cultural: 'CULTURAL ARCHIVES',
        news: 'NEWSPAPER ARCHIVES',
        // School Education
        eduHub: 'EduHub',
        subjects: 'Subjects',
        eduLevels: 'Educational Levels',
        indianLanguages: 'Contents in Indian Languages',
        stateBoards: 'State Boards',
        exploreMore: 'Explore More',
        // Footer
        ndliPortal: 'NDLI PORTAL',
        footerDescription: 'Library Management is a state-of-the-art digital ecosystem designed to empower learners across India. We provide seamless access to millions of books, research papers, and educational resources in multiple languages.',
        navigation: 'Navigation',
        commitment: 'Commitment',
        copyright: '© 2026 National Digital Library of India. Engineered for Excellence.',
    },
    hi: {
        // Navigation
        explore: 'अन्वेषण करें',
        resources: 'संसाधन',
        courses: 'पाठ्यक्रम',
        login: 'उपयोगकर्ता लॉगिन',
        // Admin
        adminConsole: 'एडमिन कंसोल',
        systemOverview: 'सिस्टम अवलोकन',
        dashboardHome: 'डैशबोर्ड होम',
        resourcesHub: 'संसाधन केंद्र',
        userDirectory: 'उपयोगकर्ता निर्देशिका',
        analytics: 'एनालिटिक्स',
        settings: 'सेटिंग्स',
        systemAnalytics: 'सिस्टम एनालिटिक्स',
        portalSettings: 'पोर्टल सेटिंग्स',
        // Hero
        heroTitlePrimary: 'भारत का',
        heroTitleSecondary: 'डिजिटल पुस्तकालय',
        heroSubtitle: 'भारतीय शिक्षा में एक आदर्श बदलाव, लाखों उच्च गुणवत्ता वाले संसाधनों तक सार्वभौमिक पहुंच प्रदान करता है।',
        searchPlaceholder: '"मशीन लर्निंग" के लिए खोजें',
        searchButton: 'खोजें',
        popular: 'लोकप्रिय:',
        // Categories
        judicial: 'न्यायिक संसाधन',
        patents: 'पेटेंट और मानक',
        school: 'स्कूली शिक्षा',
        higher: 'उच्च शिक्षा',
        research: 'अनुसंधान',
        career: 'कैरियर विकास',
        cultural: 'सांस्कृतिक अभिलेखागार',
        news: 'समाचार पत्र अभिलेखागार',
        // School Education
        eduHub: 'शिक्षा केंद्र',
        subjects: 'विषय',
        eduLevels: 'शैक्षिक स्तर',
        indianLanguages: 'भारतीय भाषाओं में सामग्री',
        stateBoards: 'राज्य बोर्ड',
        exploreMore: 'और जानें',
        // Footer
        ndliPortal: 'NDLI पोर्टल',
        footerDescription: 'लाइब्रेरी मैनेजमेंट एक अत्याधुनिक डिजिटल इकोसिस्टम है जिसे पूरे भारत में शिक्षार्थियों को सशक्त बनाने के लिए डिज़ाइन किया गया है। हम कई भाषाओं में लाखों पुस्तकों, शोध पत्रों और शैक्षिक संसाधनों तक निर्बाध पहुंच प्रदान करते हैं।',
        navigation: 'नेविगेशन',
        commitment: 'प्रतिबद्धता',
        copyright: '© 2026 भारत का राष्ट्रीय डिजिटल पुस्तकालय। उत्कृष्टता के लिए निर्मित।',
    },
    te: {
        // Navigation
        explore: 'అన్వేషించండి',
        resources: 'వనరులు',
        courses: 'కోర్సులు',
        login: 'వినియోగదారు లాగిన్',
        // Admin
        adminConsole: 'అడ్మిన్ కన్సోల్',
        systemOverview: 'సిస్టమ్ అవలోకనం',
        dashboardHome: 'డ్యాష్‌బోర్డ్ హోమ్',
        resourcesHub: 'వనరుల కేంద్రం',
        userDirectory: 'వినియోగదారు డైరెక్టరీ',
        analytics: 'విశ్లేషణలు',
        settings: 'సెట్టింగ్‌లు',
        systemAnalytics: 'సిస్టమ్ విశ్లేషణలు',
        portalSettings: 'పోర్టల్ సెట్టింగ్‌లు',
        // Hero
        heroTitlePrimary: 'భారత',
        heroTitleSecondary: 'డిజిటల్ లైబ్రరీ',
        heroSubtitle: 'భారతీయ విద్యలో ఒక విప్లవాత్మక మార్పు, లక్షలాది నాణ్యమైన వనరులకు సార్వత్రిక ప్రాప్తిని అందిస్తుంది.',
        searchPlaceholder: '"మెషిన్ లెర్నింగ్" కోసం వెతకండి',
        searchButton: 'వెతకండి',
        popular: 'ప్రసిద్ధమైనవి:',
        // Categories
        judicial: 'న్యాయ వనరులు',
        patents: 'పేటెంట్లు & ప్రమాణాలు',
        school: 'పాఠశాల విద్య',
        higher: 'ఉన్నత విద్య',
        research: 'పరిశోధన',
        career: 'కెరీర్ అభివృద్ధి',
        cultural: 'సాంస్కృతిక ఆర్కైవ్స్',
        news: 'వార్తాపత్రిక ఆర్కైవ్స్',
        // School Education
        eduHub: 'విద్యా కేంద్రం',
        subjects: 'విషయాలు',
        eduLevels: 'విద్యా స్థాయిలు',
        indianLanguages: 'భారతీయ భాషల్లో కంటెంట్',
        stateBoards: 'రాష్ట్ర బోర్డులు',
        exploreMore: 'మరింత అన్వేషించండి',
        // Footer
        ndliPortal: 'NDLI పోర్టల్',
        footerDescription: 'లైబ్రరీ మేనేజ్‌మెంట్ అనేది భారతదేశవ్యాప్తంగా అభ్యాసకులను శక్తివంతం చేయడానికి రూపొందించబడిన ఒక అత్యాధునిక డిజిటల్ పర్యావరణ వ్యవస్థ. మేము మిలియన్ల కొద్దీ పుస్తకాలు, పరిశోధనా పత్రాలు మరియు విద్యా వనరులకు బహుళ భాషల్లో అతుకులు లేని ప్రాప్తిని అందిస్తాము.',
        navigation: 'నావిగేషన్',
        commitment: 'అంకితభావం',
        copyright: '© 2026 నేషనల్ డిజిటల్ లైబ్రరీ ఆఫ్ ఇండియా. అత్యుత్తమ రిజల్ట్స్ కోసం అభివృద్ధి చేయబడింది.',
    },
    kn: {
        // Navigation
        explore: 'ಅನ್ವೇಷಿಸಿ',
        resources: 'ಸಂಪನ್ಮೂಲಗಳು',
        courses: 'ಕೋರ್ಸ್‌ಗಳು',
        login: 'ಬಳಕೆದಾರ ಲಾಗಿನ್',
        // Admin
        adminConsole: 'ಅಡ್ಮಿನ್ ಕನ್ಸೋಲ್',
        systemOverview: 'ಸಿಸ್ಟಮ್ ಅವಲೋಕನ',
        dashboardHome: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಹೋಮ್',
        resourcesHub: 'ಸಂಪನ್ಮೂಲ ಕೇಂದ್ರ',
        userDirectory: 'ಬಳಕೆದಾರ ಡೈರೆಕ್ಟರಿ',
        analytics: 'ಅನಾಲಿಟಿಕ್ಸ್',
        settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
        systemAnalytics: 'ಸಿಸ್ಟಮ್ ಅನಾಲಿಟಿಕ್ಸ್',
        portalSettings: 'ಪೋರ್ಟಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
        // Hero
        heroTitlePrimary: 'ಭಾರತದ',
        heroTitleSecondary: 'ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯ',
        heroSubtitle: 'ಭಾರತೀಯ ಶಿಕ್ಷಣದಲ್ಲಿ ಒಂದು ಮಾದರಿ ಬದಲಾವಣೆ, ಲಕ್ಷಾಂತರ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಸಂಪನ್ಮೂಲಗಳಿಗೆ ಸಾರ್ವತ್ರಿಕ ಪ್ರವೇಶವನ್ನು ನೀಡುತ್ತದೆ.',
        searchPlaceholder: '"ಮಷಿನ್ ಲರ್ನಿಂಗ್" ಗಾಗಿ ಹುಡುಕಿ',
        searchButton: 'ಹುಡುಕಿ',
        popular: 'ಜನಪ್ರಿಯ:',
        // Categories
        judicial: 'ನ್ಯಾಯಾಂಗ ಸಂಪನ್ಮೂಲಗಳು',
        patents: 'ಪೇಟೆಂಟ್‌ಗಳು ಮತ್ತು ಮಾನದಂಡಗಳು',
        school: 'ಶಾಲಾ ಶಿಕ್ಷಣ',
        higher: 'ಉನ್ನತ ಶಿಕ್ಷಣ',
        research: 'ಸಂಶೋಧನೆ',
        career: 'ವೃತ್ತಿ ಅಭಿವೃದ್ಧಿ',
        cultural: 'ಸಾಂಸ್ಕೃತಿಕ ಆರ್ಕೈವ್ಸ್',
        news: 'ಸುದ್ದಿಪತ್ರಿಕೆ ಆರ್ಕೈವ್ಸ್',
        // School Education
        eduHub: 'ಶಿಕ್ಷಣ ಕೇಂದ್ರ',
        subjects: 'ವಿಷಯಗಳು',
        eduLevels: 'ಶೈಕ್ಷಣಿಕ ಮಟ್ಟಗಳು',
        indianLanguages: 'ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿನ ವಿಷಯಗಳು',
        stateBoards: 'ರಾಜ್ಯ ಮಂಡಳಿಗಳು',
        exploreMore: 'ಇನ್ನಷ್ಟು ಅನ್ವೇಷಿಸಿ',
        // Footer
        ndliPortal: 'NDLI ಪೋರ್ಟಲ್',
        footerDescription: 'ಲೈಬ್ರರಿ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ಇಡೀ ಭಾರತದಾದ್ಯಂತ ಕಲಿಯುವವರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಅತ್ಯಾಧುನಿಕ ಡಿಜಿಟಲ್ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯಾಗಿದೆ. ನಾವು ಬಹು ಭಾಷೆಗಳಲ್ಲಿ ಲಕ್ಷಾಂತರ ಪುಸ್ತಕಗಳು, ಸಂಶೋಧನಾ ಪ್ರಬಂಧಗಳು ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಸಂಪನ್ಮೂಲಗಳಿಗೆ ತಡೆರಹಿತ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸುತ್ತೇವೆ.',
        navigation: 'ನ್ಯಾವಿಗೇಷನ್',
        commitment: 'ಬದ್ಧತೆ',
        copyright: '© 2026 ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯ. ಶ್ರೇಷ್ಠತೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
    }
};

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(() => localStorage.getItem('language') || 'en');

    useEffect(() => {
        localStorage.setItem('language', currentLanguage);
    }, [currentLanguage]);

    const changeLanguage = useCallback((lang) => {
        setCurrentLanguage(lang);
    }, []);

    const t = useCallback((key) => {
        return translations[currentLanguage]?.[key] || translations['en']?.[key] || key;
    }, [currentLanguage]);

    const value = React.useMemo(() => ({
        currentLanguage,
        t,
        changeLanguage
    }), [currentLanguage, t, changeLanguage]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
