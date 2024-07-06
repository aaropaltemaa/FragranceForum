import { fragranceBrands } from '../../types.js';
import { useEffect, useState } from "react";
import BrandSkeleton from './BrandSkeleton';
import PropTypes from 'prop-types';

const BrandCard = ({ brandName }) => {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', backgroundColor: 'ButtonShadow' }}>
            {brandName}
        </div>
    );
};

BrandCard.propTypes = {
    brandName: PropTypes.string
};


const FragranceBrandsPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }
        , []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px', marginLeft: '245px' }}>
            {loading ? fragranceBrands.map(brand => (
                <BrandSkeleton key={brand} />
            )) : fragranceBrands.map(brand => (
                <BrandCard key={brand} brandName={brand
                } />
            ))}
        </div>
    );
};

export default FragranceBrandsPage;