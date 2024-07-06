import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeFragrances } from "../../reducers/fragranceReducer.jsx";
import { Divider, Container, Typography, Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import FragranceCard from "./FragranceCard";
import FragranceModal from "../Forms/Modals/FragranceModal.jsx";
import Skeleton from "./Skeleton.jsx";


const FragranceListPage = ({ fragrances }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }
        , []);

    return (
        <Container>
            <Grid container>
                {fragrances.map(fragrance => (
                    <Grid item key={fragrance.id} xs={12} sm={6} md={4} lg={3} style={{ padding: '10px' }}>
                        {loading ? <Skeleton /> : <FragranceCard fragrance={fragrance} />}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

FragranceListPage.propTypes = {
    fragrances: PropTypes.array,
    users: PropTypes.array
};

const FragrancePage = () => {
    const dispatch = useDispatch();
    const fragrances = useSelector(state => state.fragrances);

    useEffect(() => {
        dispatch(initializeFragrances());
    }, [dispatch]);

    return (
        <div className="fragrance" style={{ paddingTop: '100px', marginRight: 145 }}>
            <Container>
                <Typography variant="h3" position="relative" style={{ paddingTop: '0px', marginLeft: 27, marginTop: '-100px' }}>
                    Reviews
                </Typography>
                <FragranceModal />
                <Divider hidden />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <FragranceListPage
                                fragrances={fragrances}

                            />
                        }
                    />
                </Routes>
            </Container>
        </div>
    );
}

export default FragrancePage;