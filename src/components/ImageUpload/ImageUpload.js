import React, { useRef } from "react";
import "./ImageUpload.scss";

const ImageUpload = ({ input: { value, onChange } }) => {
  const uploadedImage = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const inputRef = useRef();

  return (
    <div className="ImageUpload">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div
        className="BoulderUpload__Image"
        onClick={() => {
          inputRef.current.click();
        }}
      >
        {!uploadedImage ? (
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        ) : (
          <img className="ImageUpload__Preview" ref={uploadedImage} />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
