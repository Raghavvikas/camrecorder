import React from "react";

const Table = ({ name, title, blob, time }) => {
  return (
    <div>
      <table className="table">
        {/* <p className="table-caption">Table Data</p> */}
        <thead className="table-header">
          <tr className="row">
            <th className="cell">Title</th>
            <th className="cell">Preview</th>
            <th className="cell">Name</th>
            <th className="cell">Duration</th>
            <th className="cell">Button</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr className="row">
            <td className="cell">{title}</td>
            <td className="cell">
              <VideoPreviewPage data={{ videoBlob: blob }} />
            </td>
            <td className="cell">{name}</td>
            <td className="cell">{time + " secs"}</td>
            <td>
              <span className="table-remove">
                <button type="button">Remove</button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const VideoPreviewPage = (props) => {
  const getBlob = (b64) => {
    const byteCharacters = atob(b64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "video/mp4" });
    return blob;
  };

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
  }

  return (
    <div className="App">
      <h1>Video preview</h1>

      {props.data && props.data.videoBlob && (
        <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
          <video
            src={
                window.URL.createObjectURL((props.data.videoBlob))
            //   dataURItoBlob()
            }
            width={380}
            height={440}
            
            loop
            controls
          />
        </div>
      )}
    </div>
  );
};
export default Table;

// window.URL.createObjectURL(props.data.videoBlob)
