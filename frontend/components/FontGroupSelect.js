import React, { useState, useEffect } from 'react';

const FontGroupSelect = ({ fontGroups, selectedFontGroup, onChange }) => {
    const [value, setValue] = useState(selectedFontGroup || '');

    useEffect(() => {
        setValue(selectedFontGroup || '');
    }, [selectedFontGroup]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <select value={value} onChange={handleChange}>
            <option value="">Select a Font Group</option>
            {fontGroups.map((group) => (
                <option key={group.id} value={group.id}>
                    {group.name}
                </option>
            ))}
        </select>
    );
};

export default FontGroupSelect;
