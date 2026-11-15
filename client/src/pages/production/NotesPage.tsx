import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotesPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const notes = [
    {
      title: "1. चरकानुसार सर्प विष की मात्रा",
      content: "चरक चिकित्सा अध्याय 23 (विष चिकित्सा): दर्वीकर सर्प विष की घातक मात्रा 4 यव (या 1 रत्ती) मानी गई है। मण्डली सर्प विष की घातक मात्रा 8 यव तथा राजिमान सर्प विष की घातक मात्रा 6 यव निर्दिष्ट है।"
    },
    {
      title: "2. चरकानुसार सर्प दंत",
      content: "सर्प के 4 विषदंत होते हैं: कराली, मकरी, कालरात्री, और यमदूती। कराली दंश से वातज, मकरी से पित्तज, कालरात्री से कफज तथा यमदूती से सन्निपातज लक्षण उत्पन्न होते हैं।"
    },
    {
      title: "3. चरकानुसार सामान्य विष उपक्रम",
      content: "चरक ने 24 विष उपक्रमों (चतुर्विंशति उपक्रम) का वर्णन किया है: मन्त्र, अरिष्टा, उत्कर्तन, निष्पीड़न, आचूषण, अग्नि, परिषेक, अवगाह, रक्तमोक्षण, वमन, विरेचन, उपधान, गर्दभाण्ड, अंजन, नस्य, धूमा, लेह, औषध, प्रशमन, प्रतिसारण, विषघ्न, संज्ञासंस्थापन, लेप, और मृतसंजीवन।"
    },
    {
      title: "4. चरक व वाग्भट के अनुसार विष दाता की पहचान",
      content: "विष दाता मनुष्य शंकित दृष्टि, स्वेद, कम्प, शुष्क मुख, अधोमुख तथा असंगत प्रलाप करता है। अन्न को अग्नि में डालने पर मयूरकण्ठ सदृश ज्वाला निकलती है।"
    },
    {
      title: "5. सर्प विष में वेगानुसार सुश्रुतोक्त चिकित्सा",
      content: "सुश्रुत कल्पस्थान अध्याय 5: प्रथम वेग में रक्तमोक्षण व अगदपान, द्वितीय वेग में वमन, तृतीय वेग में विरेचन व नस्य, चतुर्थ वेग में अतीव तीक्ष्ण शिरोविरेचन, पंचम वेग में कफघ्न लेप व अंजन, षष्ठ वेग में संज्ञासंस्थापन तथा सप्तम वेग में अवपीड नस्य व तीक्ष्ण अंजन।"
    },
    {
      title: "6. सुश्रुतानुसार सर्प विष में अरिष्ट बंधन",
      content: "दंश स्थान से 4 अंगुल ऊपर कोमल व मजबूत रज्जु अथवा चर्म से अरिष्ट बंधन (टूर्निकेट) बांधना चाहिए। अरिष्ट बंधन विष को संपूर्ण शरीर में प्रसरित होने से रोकता है।"
    },
    {
      title: "7. सुश्रुतानुसार पक्षियों में विष वेग",
      content: "पक्षियों में विष के केवल 3 वेग होते हैं: प्रथम वेग में रोमहर्ष व क्लम, द्वितीय वेग में विह्वल भ्रमण व निमीलन, तृतीय वेग में पक्षपात व मृत्यु।"
    },
    {
      title: "8. सुश्रुतानुसार पशु में विष वेग",
      content: "चौपायों (पशुओं) में विष के 4 वेग होते हैं: प्रथम वेग में मोह व लालास्राव, द्वितीय वेग में कम्पन व मूत्र-पुरीष त्याग, तृतीय वेग में स्तम्भ व कर्णपात, चतुर्थ वेग में श्वास अवरोध व मृत्यु।"
    },
    {
      title: "9. सुश्रुतानुसार राजिमान सर्प दष्टवेग",
      content: "राजिमान सर्प कफ प्रधान होता है। प्रथम वेग में पाण्डु वर्ण रक्त, द्वितीय में अतिगौरव, तृतीय में कफप्रसेक व मन्यास्तम्भ, चतुर्थ में घुरघुराहट, पंचम में दृष्टिनाश, षष्ठ में श्वासरोध व सप्तम में मृत्यु।"
    },
    {
      title: "10. सुश्रुतानुसार मण्डली सर्प दष्टवेग",
      content: "मण्डली सर्प पित्त प्रधान होता है। प्रथम वेग में कृष्ण रक्तस्राव, द्वितीय में दाह व पीत वर्णता, तृतीय में मांसपाक व तृष्णा, चतुर्थ में ज्वर, पंचम में सर्वांगदाह, षष्ठ में मूर्छा व सप्तम में मरण।"
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Top Header Bar */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-file-text-o"></i>
          <span>SHORT NOTES</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/notes')}
          style={{
            backgroundColor: '#e67e22',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '6px 16px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <i className="fa fa-bullseye"></i>
          <span>Sticky Notes</span>
        </button>
      </div>

      {/* 10 Hindi Short Notes Accordion */}
      <div style={{ maxWidth: 1100, margin: '15px auto', padding: '0 15px' }}>
        {notes.map((note, idx) => {
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
                  {note.title}
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
                  {note.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

