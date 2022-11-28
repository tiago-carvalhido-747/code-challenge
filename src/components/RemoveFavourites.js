import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const RemoveFavourites = () => {
    return (
        <>
            <Tooltip title="Add to Favourites">
                <DeleteOutlined />
            </Tooltip>
        </>
    );
};

export default RemoveFavourites;