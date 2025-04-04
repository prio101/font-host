import React, {useEffect, useState} from 'react';

const FontGroupList = () => {
  const [fontGroups, setFontGroups] = useState([]);

  useEffect(() => {
    const fetchFontGroups = async () => {
      try {
        const response = await fetch("http://localhost:8000/font_groups");
        const data = await response.json();
        console.log("Font groups data:", data);
        if(data.status == 'success') {
          setFontGroups(data.data);
        } else {
          console.error("Error fetching font groups:", data.message);
        }
      } catch (error) {
        console.error("Error fetching font groups:", error);
      }
    };

    fetchFontGroups();
  }
  , []);

  const handleDelete = (group) => {
    fetch(`http://localhost:8000/font_groups/${group.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setFontGroups(fontGroups.filter((g) => g.id !== group.id));
        } else {
          console.error("Error deleting font group");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return(
    <>
      <div className='flex flex-col items-center justify-center w-full'>
        <h2 className='flex flex-row text-blue-400 font-bold text-2xl'>
          Font Groups
        </h2>
        <div className="flex flex-col items-center justify-center w-full">
          {fontGroups.map((group) => (
            <div key={group.id} className="flex flex-row items-center justify-between w-72 my-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Font Group Name</th>
                    <th className="px-4 py-2 text-left">Fonts</th>
                    <th className="px-4 py-2 text-left">Counts</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">{group.name}</td>
                    <td className="border px-4 py-2">
                      {group.fonts?.map((font) => (
                        <div key={font.id} className='font-bold'>{font.name},</div>
                      ))}
                    </td>
                    <td className="border px-4 py-2">
                      {group.fonts?.length}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(group)}
                      >
                        Delete
                      </button>
                      <button
                        className='bg-blue-500 text-white px-4 py-2 rounded ml-2'
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FontGroupList;
