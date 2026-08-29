import axios from 'axios';
import React, { useState } from 'react'
import "./upload.css"
import { FaImage, FaUpload, FaSpinner } from "react-icons/fa6";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";


const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dy4qrdhen";
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "my_upload";


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image first!");
      return;
    }
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      setUploadedUrl(res.data.secure_url);
    } catch (err) {
      console.error(err);
      setError("Upload failed, check console");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='loading-image'>
      <div className='upload-card'>
        <h2><FaImage /> Upload an Image</h2>
        <input type="file" onChange={handleImageChange} />

        {preview && (
          <>
            <img src={preview} alt="Preview" className="upload-preview" />
          </>
        )}

        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? <FaSpinner className="spin" /> : <FaUpload />}
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {error && <p className="upload-error">{error}</p>}

        {uploadedUrl && (
          <div className="upload-result">
            <h4>Uploaded Successfully!</h4>
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
            <img src={uploadedUrl} alt="Uploaded" className="upload-result-img" />
          </div>
        )}
        <ApiDetails meta={API_DETAILS.uploadimg} />
      </div>
    </div>
  );
}



export default UploadImage