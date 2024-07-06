import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { theme } from '../StyledComponents/Theme';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { initializeFragrances } from '../../reducers/fragranceReducer';
import { useDispatch } from 'react-redux';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StorefrontIcon from '@mui/icons-material/Storefront';

export const SearchBar = () => {
    const [jsonResults, setJsonResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFragrances = async () => {
            const fragrances = await dispatch(initializeFragrances());
            setJsonResults(fragrances);
        };

        fetchFragrances();
    }, [dispatch]);

    return (
        <Autocomplete
            freeSolo
            id="search-autocomplete"
            disableClearable
            options={jsonResults.map((option) => option.name + ' - reviewed by ' + option.user.username)}
            sx={{
                width: 450,
                height: 40,
                backgroundColor: "white",
                borderRadius: 10,
                boxShadow: "none",
                position: 'fixed',
                top: 100,
                left: 650,
                zIndex: 9999
            }}
            renderOption={(props, option) => (
                <li {...props}>
                    <Link to="/fragrances" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {option}
                    </Link>
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="search for user reviews"
                    variant="outlined"
                    size="small"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
            )}
        />
    );
};

export const NavBar = () => {

    return (
        <Box sx={{ position: 'fixed', height: '100vh', ...theme.mixins.toolbar }}>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 730, left: 700, backgroundColor: "white", boxShadow: "none" }}>
                <ToolBar>
                    <Stack direction="row" spacing={2}>
                        <Box display="flex" alignItems="center">
                            <RateReviewIcon
                                color="tertiary"
                                sx={{ fontSize: '1.8rem' }}
                            />
                            <Button color="tertiary">
                                <Link to="/fragrances" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>reviews</Link>
                            </Button>
                            <ArrowDropDownIcon color="tertiary" />
                        </Box>

                        <StorefrontIcon
                            color="tertiary"
                            sx={{ fontSize: '1.8rem' }}
                        />

                        <Button color="tertiary">
                            <Link to="/brands" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>brands</Link>
                        </Button>
                    </Stack>
                </ToolBar>
            </AppBar>
        </Box>
    );
};


const NavBarModels = () => {
    return (
        <div>
            <SearchBar />
            <NavBar />
        </div>
    );
};

export default NavBarModels;
