import React, { useState, useEffect } from 'react';
import FontGroupSelect from '../components/FontGroupSelect';

const FontGroupPage = () => {
    const [fontGroups, setFontGroups] = useState([]);
    const [selectedFontGroup, setSelectedFontGroup] = useState('');

    useEffect(() => {
        // Fetch font groups from the API
        fetch('/font_groups')
            .then((response) => response.json())
            .then((data) => setFontGroups(data.data || []));
    }, []);

    const handleFontGroupChange = (newFontGroupId) => {
        setSelectedFontGroup(newFontGroupId);
        console.log('Selected Font Group ID:', newFontGroupId);
    };

    return (
        <div>
            <h1>Font Groups</h1>
            <FontGroupSelect
                fontGroups={fontGroups}
                selectedFontGroup={selectedFontGroup}
                onChange={handleFontGroupChange}
            />
        </div>
    );
};

export default FontGroupPage;
