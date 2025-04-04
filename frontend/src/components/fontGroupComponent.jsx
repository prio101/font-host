import React, { useEffect, useState } from 'react';

const FontGroupComponent = () => {
  const [fontGroupName, setFontGroupName] = useState("");
  const [fontGroupFontIds, setFontGroupFontIds] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({ show: false, message: "" });
  const [fonts, setFonts] = useState([]);
  const [fontRows, setFontRows] = useState(1);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch("http://localhost:8000/fonts");
        const data = await response.json();
        console.log("Fonts data:", data);
        if(data.status == 'success') {
          setFonts(data.data);
        } else {
          console.error("Error fetching fonts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching fonts:", error);
      }
    };

    fetchFonts();
  }
  , []);

  const handleAddRow = () => {
    console.log("Add Row triggered");
    setFontRows(fontRows + 1);
  }

  const handleSelectFontId = (event) => {
    const selectedFontId = event.target.value;
    setFontGroupFontIds((prevFontGroupFontIds) => {
        if (prevFontGroupFontIds.includes(selectedFontId)) {
          return prevFontGroupFontIds.filter((id) => id !== selectedFontId);
        } else {

          setFonts((prevFonts) => {
            const selectedFont = prevFonts.find(font => font.id === selectedFontId);
            if (selectedFont) {
              return prevFonts.filter(font => font.id !== selectedFontId);
            }
            return prevFonts;
          }
          );

          return [...prevFontGroupFontIds, selectedFontId];
        }
      }
    );

    console.log("Selected Font IDs:", fontGroupFontIds);
  };

  return (
    <>
      <div className="flex flex-col w-full m-2">
        <div className="p-2 flex flex-col items-start justify-between w-full">
          <h2 className='flex flex-row text-black font-semibold text-2xl'>
            Create Font Group
          </h2>
          <p className=''>You have to select at least two fonts.</p>
        </div>
        <div className='p-2 flex flex-row w-full'>
          <input type="text" placeholder="Group Title"
            value={fontGroupName}
            onChange={(e) => setFontGroupName(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className='p-2 flex flex-col w-full'>

          {[...Array(fontRows)].map((i) => (
              <select
                key={i}
                value={fontGroupFontIds[i]}
                onChange={handleSelectFontId}
                className="border-2 border-gray-300 my-2 p-2 rounded w-40"
              >
                <option value="" disabled>
                  Select Fonts
                </option>
                {fonts.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.name}
                  </option>
                ))}
              </select>
            ))}
        </div>

        <div className='p-2 flex flex-row w-full justify-between'>
          <button
            className="bg-white text-blue-400 border-2 border-blue-400 p-2 rounded w-auto"
            onClick={handleAddRow}
            >
            Add Row +
          </button>
          <button className="bg-blue-500 text-white p-2 rounded w-auto">
            Create
          </button>
        </div>

      </div>
    </>
  );
}

export default FontGroupComponent;
