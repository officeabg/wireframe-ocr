import React from "react";
import { Upload, X } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

interface UploadZoneProps {
  onFilesSelected?: (files: FileList) => void;
  isUploading?: boolean;
  progress?: number;
  acceptedFileTypes?: string[];
}

const UploadZone = ({
  onFilesSelected = () => {},
  isUploading = false,
  progress = 0,
  acceptedFileTypes = [".pdf", ".jpg", ".jpeg", ".png"],
}: UploadZoneProps) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={`h-full border-2 border-dashed rounded-lg ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} transition-colors flex items-center justify-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!isUploading ? (
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gray-100 rounded-full">
            <Upload className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium">
              Drag and drop your files here
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: {acceptedFileTypes.join(", ")}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.multiple = true;
              input.accept = acceptedFileTypes.join(",");
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files) onFilesSelected(files);
              };
              input.click();
            }}
          >
            Browse
          </Button>
        </div>
      ) : (
        <div className="w-64 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Uploading...</span>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-100"
            indicatorClassName="bg-gradient-to-r from-violet-500 via-blue-500 to-purple-500"
          />
          <p className="text-xs text-gray-500 text-center">
            {progress}% complete
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
