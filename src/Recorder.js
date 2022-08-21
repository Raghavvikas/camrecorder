import React, { useState, useEffect } from "react";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
import getBlobDuration from "get-blob-duration";

import Table from "./Table";

const OPTIONS = {
  filename: "test-filename",
  title: "v-1",
  fileType: "mp4",
  width: 400,
  height: 400,
};

const Recorder = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [dur, setDuration] = useState(0);
  const [item, setItem] = useState([]);
  const [videoblob, setVideoBlob] = useState();

  // useEffect(()=>{
  //   setName(OPTIONS.filename);
  //   setTitle(OPTIONS.title);
  //   setItem([...item,{name:name, title:title}])
  //   localStorage.setItem('data',JSON.stringify(item))

  // },[]);

  const recordWebcam = useRecordWebcam(OPTIONS);

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const getRecordingFileHooks = async () => {
    const reader = new FileReader();
    console.log(recordWebcam);
    const blob = await recordWebcam.getRecording();
    setVideoBlob(blob);
    getBlobDuration(blob).then(function (duration) {
      setDuration(duration);
      console.log(duration + " seconds");
    });
    blobToBase64(blob).then((res) => {
      // console.log(res); // res is base64 now
      // setVideoBlob(res);
    });
    setName(OPTIONS.filename);
    setTitle(OPTIONS.title);
  };

  // eslint-disable-next-line no-unused-vars
  const getRecordingFileRenderProp = async (blob) => {
    console.log("blob" + { blob });
  };

  return (
    <div>
      <div className="container">
        <h1>react-record-webcam</h1>
        <p className="status">Camera status: {recordWebcam.status}</p>
        <div className="btns">
          <button
            disabled={
              recordWebcam.status === CAMERA_STATUS.OPEN ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW
            }
            onClick={recordWebcam.open}
          >
            Open camera
          </button>
          <button
            disabled={
              recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW
            }
            onClick={recordWebcam.close}
          >
            Close camera
          </button>
          <button
            disabled={
              recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW
            }
            onClick={recordWebcam.start}
          >
            Start recording
          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
            onClick={recordWebcam.stop}
          >
            Stop recording
          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
            onClick={recordWebcam.retake}
          >
            Retake
          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
            onClick={recordWebcam.download}
          >
            Download
          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
            onClick={getRecordingFileHooks}
          >
            Get recording
          </button>
        </div>

        <video
          className="video"
          ref={recordWebcam.webcamRef}
          style={{
            display: `${
              recordWebcam.status === CAMERA_STATUS.OPEN ||
              recordWebcam.status === CAMERA_STATUS.RECORDING
                ? "block"
                : "none"
            }`,
          }}
          autoPlay
          muted
        />
        <video
          className="video"
          ref={recordWebcam.previewRef}
          style={{
            display: `${
              recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"
            }`,
          }}
          controls
        />
      </div>
      <Table name={name} title={title} blob={videoblob} time={dur} />
    </div>
  );
};

export default Recorder;

// blob ==> base64 ==> localstorage ==> base64==> blob ==> preview
