import React, { useState } from 'react';

export const useSelectedItem = () => {
    const [selectedItem, setSelectedItem] = React.useState(0);

    const onSelectedItem = (index) => {
        setSelectedItem(index);
    };

    return {
        selectedItem, 
        onSelectedItem
    }
}