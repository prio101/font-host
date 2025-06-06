import React, { useState } from 'react';
import fontkit from 'fontkit';

const FontUploadComponent = () => {
  const [fontFile, setFontFile] = useState(null);
  const [fontName, setFontName] = useState("");
  const [showUploadStatus, setShowUploadStatus] = useState({ show: false, message: "" });

  const getFontFamilyName = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const font = fontkit.create(new Uint8Array(arrayBuffer));
    return font.familyName;
  }

  const handleFontUpload = (event) => {
    console.log("Font upload triggered");
    event.preventDefault();

    const file = event.target.files[0];
    if (file) {
      setFontFile(file);
      setFontName(getFontFamilyName(file));
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file["name"]);

    fetch("http://localhost:8000/fonts", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setShowUploadStatus({ show: true, message: "Font uploaded successfully!" });
          setTimeout(() => {
            setShowUploadStatus({ show: false, message: "" });
          }, 3000);
        } else {
          console.error("Error uploading font");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      {showUploadStatus.show && (
        <div className="fixed top-0 right-0 p-4">
          <div className="bg-green-500 text-white p-2 rounded">
            {showUploadStatus.message}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-center w-72">
            <label for="dropzone-file" className="flex flex-col items-center
                        justify-center w-full h-64 border-2 border-gray-300
                        border-dashed rounded-lg cursor-pointer bg-gray-50
                        dark:hover:bg-gray-800 dark:bg-gray-700
                        hover:bg-gray-100 dark:border-gray-600
                        dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500
                                    dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16">
                        <path stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Only Accepts ttf and otf files</p>
                </div>
                <input  id="dropzone-file"
                        type="file"
                        accept=".ttf, .otf"
                        className="hidden"
                        onChange={handleFontUpload}
                       />
            </label>
        </div>
      </div>
    </>
  );
};

export default FontUploadComponent;
