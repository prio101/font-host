import React, { useEffect, useState } from 'react';

const FontListComponent = () => {
  const [fonts, setFonts] = useState([]);
  const [showUploadStatus, setShowUploadStatus] = useState({ show: false, message: "" });
  const [showDeleteStatus, setShowDeleteStatus] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch("http://localhost:8000/fonts");
        const data = await response.json();
        console.log("Fonts data:", data);
        if(data.status == 'success') {
          setFonts(data.data);
          setShowUploadStatus({ show: true, message: "Fonts fetched successfully!" });
          setTimeout(() => {
            setShowUploadStatus({ show: false, message: "" });
          }, 3000);
        } else {
          console.error("Error fetching fonts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching fonts:", error);
      }
    };

    fetchFonts();
  }, []);

  const handleDelete = (font) => {
    fetch(`http://localhost:8000/fonts/${font.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setFonts(fonts.filter((f) => f.id !== font.id));
          setShowDeleteStatus({ show: true, message: "Font deleted successfully!" });
          setTimeout(() => {
            setShowDeleteStatus({ show: false, message: "" });
          }, 3000);
        } else {
          console.error("Error deleting font");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const formatFontName = (name) => {
    const index = name.lastIndexOf(".");
    if (index !== -1) {
      return name.substring(0, index);
    }
    return name;
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
      {showDeleteStatus.show && (
        <div className="fixed top-0 right-0 p-4">
          <div className="bg-red-500 text-white p-2 rounded">
            {showDeleteStatus.message}
          </div>
        </div>
      )}

      <div className='flex flex-col items-center justify-center w-full p-4 rounded-lg shadow-md'>
        <div className="overflow-x-auto overflow-y-auto w-full h-96">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className='bg-blue-200'>
                <th className="px-4 py-2 border-b">Font Name</th>
                <th className="px-4 py-2 border-b">Preview</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fonts.map((font) => (
                <tr key={font.id}>
                  <td className="px-4 py-2 border-b border-gray-200">{font.name}</td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <div style={{ fontFamily: font.name, fontSize: '20px' }}>
                      Example Text
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <button onClick={() => handleDelete(font)}
                            className="text-red-500 p-2 rounded-md border border-red-400 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default FontListComponent;
