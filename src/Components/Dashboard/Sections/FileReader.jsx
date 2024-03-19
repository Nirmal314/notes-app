import React from "react";
import ClearIcon from "@mui/icons-material/Clear"; // Import ClearIcon from Material UI
import GetAppIcon from "@mui/icons-material/GetApp"; // Import GetAppIcon for download

const FileReader = ({ file, onClose }) => {
  const renderContent = () => {
    const fileType = file.name.split(".").pop().toLowerCase();

    switch (fileType) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return (
          <img
            src={file.previewUrl}
            alt={file.name}
            className="max-w-auto max-h-96"
          />
        );
      case "pdf":
        return (
          <iframe
            src={file.previewUrl}
            title={file.name}
            className="w-full h-96"
          ></iframe>
        );
      case "mp3":
        return (
          <audio controls src={file.previewUrl} className="max-w-full h-24">
            Your browser does not support the audio element.
          </audio>
        );
      case "mp4":
        return (
          <video controls src={file.previewUrl} className="w-full max-h-96">
            Your browser does not support the video tag.
          </video>
        );
      case "txt":
        // Assuming the content of the txt file is passed as a string in file.content
        // This might require fetching the content separately or adjusting how files are handled
        return (
          <pre className="text-left whitespace-pre-wrap">{file.content}</pre>
        );
      // For unsupported formats, consider providing a download link or instructions
      default:
        return (
          <div>
            <p>File format not supported for preview.</p>
            <a
              href={file.previewUrl}
              download
              className="text-blue-600 hover:text-blue-800"
            >
              Click here to download the file
            </a>
          </div>
        );
    }
  };

  const displayName =
    file.name.length > 15 ? `${file.name.slice(0, 65)}...` : file.name;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2
            className="text-lg font-bold cursor-pointer mr-4"
            title={file.name}
          >
            {displayName}
          </h2>
          <div className="flex items-center space-x-4">
            <a
              href={file.previewUrl}
              download
              className="text-blue-600 hover:text-blue-800"
              title="Download"
            >
              <GetAppIcon />
            </a>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
              title="Close"
            >
              <ClearIcon />
            </button>
          </div>
        </div>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default FileReader;
