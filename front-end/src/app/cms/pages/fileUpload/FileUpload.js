import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import imageToBase64 from "image-to-base64";

// import { create } from "doka";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  padding: 20,
  alignItems: "center",
  justifyContent: "center",
};

const thumb = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const uploadButton = {
  border: "1px dashed black",
  padding: "12px 10px",
  cursor: "pointer",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const thumbButton = {
  position: "absolute",
  right: 10,
  bottom: 10,
  background: "rgba(0,0,0,.8)",
  // background: "ffffff",
  color: "#fff",
  border: 0,
  borderRadius: ".325em",
  cursor: "pointer",
};

export default function Doka(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  console.log("file23124", files[0]?.preview);
  imageToBase64(files[0]?.preview) // Path to the image
    .then((response) => {
      console.log("adasd", response); // "cGF0aC90by9maWxlLmpwZw=="
    })
    .catch((error) => {
      console.log(error); // Logs an error if there was one
    });

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })} style={uploadButton}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
