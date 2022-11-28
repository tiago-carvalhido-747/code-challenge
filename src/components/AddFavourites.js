import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';


const AddFavourite = () => {
    return (
        <>
            <Tooltip title="Add to Favourites">
                <HeartOutlined />
            </Tooltip>

        </>
    );
};

export default AddFavourite;