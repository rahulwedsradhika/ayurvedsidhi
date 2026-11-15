import React, { useState } from 'react';

export const MnemonicsPage: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const mnemonics = [
    {
      title: "1. पुनर्नवा अष्टक क्वाथ घटक द्रव्य",
      formula: "ट्रिक: 'पुनि नीम दारू हर कटु पटोल नागर'",
      content: "घटक (8 द्रव्य): पुनर्नवा, निम्ब, दारुहरिद्रा, हरीतकी, कटुकी, पटोलपत्र, शुण्ठी (नागर), देवदारु। रोगाधिकार: शोथ, उदररोग, पाण्डु, कास।"
    },
    {
      title: "2. कल्याण कुमार रस के घटक द्रव्य",
      formula: "ट्रिक: 'र ग अ लौ ता सु'",
      content: "घटक: रससिन्दूर, गन्धक, अभ्रक भस्म, लौह भस्म, ताम्र भस्म, सुवर्ण भस्म। भावना: शतावरी स्वरस। रोगाधिकार: वातव्याधि, शुक्रक्षय, क्षय।"
    },
    {
      title: "3. पारद के 7 दोष",
      formula: "ट्रिक: 'ना व च वि म म क'",
      content: "सप्त कंचुक दोष: नाग (सीसा), वंग (रांगा), चपल, वह्नि (अग्नि), मल, मन्द, कञ्चुक। शोधन द्वारा इन दोषों का निवारण किया जाता है।"
    },
    {
      title: "4. एकान्त हितकर द्रव्य",
      formula: "चरक सूत्र 25: शालि, यव, गोधूम, जांगल मांस, मुद्ग, घृत, दुग्ध, मधु, सैन्धव",
      content: "नित्यसेवनीय द्रव्य: षष्टिक शालि, यव, गोधूम, जांगल मांस, जीवन्ती, बालमूलक, हरीतकी, द्राक्षा, परूषक, शर्करा, घृत, दिव्य उदक, दुग्ध, क्षौद्र (मधु), सैन्धव।"
    },
    {
      title: "5. सुश्रुतानुसार सन्निपातज योनिव्यापद",
      formula: "सर्वदोषजा (सर्वलिंग समुद्भवा)",
      content: "तीनों दोषों के कुपित होने से योनि में दाह, पाक, श्वेत-पीत-पिच्छिल स्राव तथा वेदना होती है। यह योनिव्यापद असाध्य अथवा कष्टसाध्य माना गया है।"
    },
    {
      title: "6. सुश्रुतानुसार कफज योनिव्यापद",
      formula: "कफजा, उपप्लुता, विप्लुता, चरणा (अतिचरणा/प्राक्चरणा)",
      content: "कफज योनिव्यापद में पिच्छिल, शीतल, कण्डूयुक्त, मन्दवेदना तथा पाण्डु वर्ण का स्राव होता है। कटु-तिक्त-कषाय व रुक्ष चिकित्सा निर्दिष्ट है।"
    },
    {
      title: "7. सुश्रुतानुसार पित्तज योनिव्यापद",
      formula: "पित्तजा, रक्तयोनि, अरजस्का",
      content: "पित्तज योनिव्यापद में योनि में दाह, पाक, उष्णता, ज्वर तथा नील-पीत-रक्त वर्ण का स्राव होता है। शीतल व पित्तशामक चिकित्सा की जाती है।"
    },
    {
      title: "8. सुश्रुतानुसार वातज योनिव्यापद",
      formula: "वातजा, उदावर्तिनी, वन्ध्या, विप्लुता, परिप्लुता",
      content: "वातज योनिव्यापद में तोद, भेदन, स्तम्भ, सुप्ति, पिपीलिकासञ्चारवत् वेदना तथा कृष्ण-अरुण वर्ण का रुक्ष स्राव होता है। वातहर तैल व बस्ति मुख्य उपचार है।"
    },
    {
      title: "9. रसों की तरतम विषयक सारणी",
      formula: "वातशामक: मधुर > अम्ल > लवण | कफशामक: तिक्त > कटु > कषाय",
      content: "तिक्त रस सर्वाधिक कफघ्न, कटु रस सर्वाधिक दीपन व कषाय रस सर्वाधिक रोपण होता है। वात का परम शमन मधुर रस करता है।"
    },
    {
      title: "10. चरक व सुश्रुतानुसार कृमि के भेद",
      formula: "कुल 20 कृमि: पुरीषज (5), श्लेष्मज (7), रक्तज (6), बाह्य (2)",
      content: "चरक अनुसार बाह्य कृमि (यूका, पिपीलिका) स्वेद-मलज होते हैं। आभ्यन्तर कृमि 18 होते हैं (कफज 7, रक्तज 6, पुरीषज 5)। सुश्रुत ने भी कुल 20 भेद माने हैं।"
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Title */}
      <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <i className="fa fa-magic text-aqua"></i>
          <span>MNEMONICS</span>
        </h3>
      </div>

      {/* Accordion list */}
      <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 15px' }}>
        {mnemonics.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              style={{
                border: '1px solid #e5e5e5',
                borderRadius: 4,
                marginBottom: 10,
                overflow: 'hidden',
                backgroundColor: '#fff'
              }}
            >
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? '#fbfcfe' : '#fff'
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: '#2c3e50' }}>
                  {item.title}
                </div>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 3,
                  backgroundColor: '#d81b60',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700
                }}>
                  {isExpanded ? '−' : '+'}
                </div>
              </div>

              {isExpanded && (
                <div style={{
                  padding: '16px 20px',
                  backgroundColor: '#fefde8',
                  borderTop: '1px solid #fef08a',
                  fontSize: 14,
                  color: '#713f12',
                  lineHeight: 1.6
                }}>
                  <div style={{ fontWeight: 700, color: '#b7791f', marginBottom: 6 }}>
                    {item.formula}
                  </div>
                  <div>{item.content}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

