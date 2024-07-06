import { useState } from 'react';

const usePopOver = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return {
        anchorEl,
        handlePopoverOpen,
        handlePopoverClose,
        open,
    };
};

export default usePopOver;
