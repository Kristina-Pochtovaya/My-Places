import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import './ImageUpload.scss';

type Props = {
    id: string;
    isCentered: boolean;
    onInput: (id: string, pickedFile: unknown, isFileValid: boolean) => void;
    errorText: string;
}

export const ImageUpload = (props: Props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer>();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (!file) {
            return
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
           setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pickedFile = null;
        let isFileValid = isValid;
        if(event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile);
            setIsValid(true);
            isFileValid = true;
        } else {
            setIsValid(false);
            isFileValid = false;
        }

        props.onInput(props.id, pickedFile, isFileValid)
    };
    const pickImageHandler = () => {
         filePickerRef.current.click();
    };

    return (
        <div className='form-control'>
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type='file'
                accept='image/png, image/jpg, image/jpeg'
                onChange={pickHandler}
            />
            <div className={`image-upload ${props.isCentered && 'center'}`}>
                <div className='image-upload__preview'>
                    {previewUrl && <img src={previewUrl as string} alt='Preview'/>}
                    {!previewUrl && <p> Please pick an image. </p>}
                </div>
                <Button type='button' onClick={pickImageHandler}> PICK IMAGE </Button>
            </div>
            {!isValid && <p>{ props.errorText }</p>}
        </div>
    )
};
