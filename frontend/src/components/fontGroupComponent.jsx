import React, { useEffect, useState } from 'react';

const FontGroupComponent = () => {
  const [fontGroupName, setFontGroupName] = useState("");
  const [fontGroupFontIds, setFontGroupFontIds] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({ show: false, message: "" });
  const [fonts, setFonts] = useState([]);
  const [fontRows, setFontRows] = useState(1);
  const [fontData, setFontData] = useState([]);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch("http://localhost:8000/fonts");
        const data = await response.json();

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
    setFontRows(fontRows + 1);
  }

  const handleSelectFontId = (event) => {
    const selectedFontId = event.target.value;
    setFontGroupFontIds([...fontGroupFontIds, selectedFontId]);
    setFontData([ ...fontData, { id: selectedFontId,
                                 name: event }]);
  };

  console.log("Font Data", fontData);
  const handleRemove = (event) => {
    console.log("Remove triggered");
    const selectedFontId = event.target.value;
    setFontGroupFontIds((prevFontGroupFontIds) => {
      return prevFontGroupFontIds.filter((id) => id !== selectedFontId);
    });
    setFontRows(fontRows - 1);
  };

  const handleFontGroup = (event) => {
    console.log("Font group creation triggered");
    event.preventDefault();
    const body = {
      name: fontGroupName,
      fonts: fontGroupFontIds,
    }

    console.log("Font group name:", fontGroupName);
    console.log("Font group font ids:", fontGroupFontIds);
    fetch("http://localhost:8000/font_groups", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setUploadStatus({ show: true, message: "Font group created successfully!" });
          setTimeout(() => {
            setUploadStatus({ show: false, message: "" });
          }, 3000);
        } else {
          console.error("Error creating font group");
        }
      }
      )
      .catch((error) => {
        console.error("Error:", error);
      }
      );
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
              <>
                <input
                       key={i}
                       type='text'
                       placeholder="Font Name"
                       className='border border-1 border-gray-300 p-2 rounded-md' />
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


                <button onClick={handleRemove}>Remove</button>
              </>
            ))}
        </div>

        <div className='p-2 flex flex-row w-full justify-between'>
          <button
            className="bg-white text-blue-400 border-2 border-blue-400 p-2 rounded w-auto"
            onClick={handleAddRow}
            >
            Add Row +
          </button>
          <button className="bg-blue-500 text-white p-2 rounded w-auto"
            onClick={handleFontGroup}
            >
            Create
          </button>
        </div>

      </div>
    </>
  );
}

export default FontGroupComponent;
