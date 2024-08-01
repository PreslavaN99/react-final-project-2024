import React, { useState } from 'react';
import './addImgStyle.css';

const AddImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className={'add-img'}>
                <input type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.gif"/>
                    Add Image
                </label>
            </form>
        </div>
    );
};

export default AddImg;