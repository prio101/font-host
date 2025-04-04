import React, { useEffect, useRef } from 'react';


const FontPreview = ({ fontName, fontFileUrl }) => {
  const iframeRef = useRef(null);

  async function getFontFamilyName(file) {
    const arrayBuffer = await file.arrayBuffer();
    const font = fontkit.create(new Uint8Array(arrayBuffer));
    return font.familyName; // 👈 This is what you want
  }
  useEffect(() => {
    if (iframeRef.current && fontFileUrl) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      console.log("Font file URL:", fontFileUrl);
      doc.open();
      doc.write(`
        <style>
          @font-face {
            font-family: Lovedays;
            src: url('/assets/fonts/${fontName}') format('truetype');
          }
          body {
            font-family: 'Lovedays', sans-serif;
            font-size: 24px;
            padding: 20px;
            margin: 0;
          }
        </style>
        <div>The quick brown fox jumps over the lazy dog.</div>
      `);
      doc.close();
    }
  }, [fontName, fontFileUrl]);

  return (
    <>
      {fontFileUrl && (
        <iframe
          ref={iframeRef}
          title="Font Preview"
          style={{ width: '100%', height: '150px', border: '1px solid #ccc', marginTop: '10px' }}
        />
      )}
    </>
  );
};

export default FontPreview;
