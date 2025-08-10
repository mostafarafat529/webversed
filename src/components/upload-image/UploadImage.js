import axios from 'axios';
import React, { useState } from 'react'
import "./upload.css"
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const UploadImage = () => {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

const navigation = useNavigate("");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_upload"); 
    formData.append("cloud_name", "dy4qrdhen"); 

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dy4qrdhen/image/upload", formData );
      setUploadedUrl(res.data.secure_url);
    } catch (err) {
      alert("Upload failed, check console");
    }
  };

  return (
    <div className='loading-image' style={{ padding: "30px", fontFamily: "sans-serif" ,minHeight:"100vh" ,color:"#fff" ,
    display:"flex" ,justifyContent:"center" ,alignItems:"center" ,flexDirection:"column" ,border:"1px solid #fff" }}>
      <h2>Upload an Image</h2>
      <input type="file" onChange={handleImageChange} />
      <br /><br />
      {preview && (
        <>
          <img src={preview} alt="Preview" style={{ width: "200px", marginBottom: "10px" }} />
          <br />
        </>
      )}
      <button onClick={handleUpload}>Upload</button>

      {uploadedUrl && (
        <div style={{ marginTop: "20px",    display:"flex" ,justifyContent:"center" ,alignItems:"center" ,flexDirection:"column" }}>
          <h4>✅ Uploaded Successfully!</h4>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
          <br />
          <img src={uploadedUrl} alt="Uploaded" style={{ width: "200px", marginTop: "10px" }} />
        </div>
      )}
                    <div className='arrow_back' onClick={()=>navigation("/")} ><FaLongArrowAltLeft/></div>
      
    </div>
  );
}



export default UploadImage