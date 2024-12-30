import React from "react";
import { LayoutGrid, List, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import UploadZone from "./UploadZone";
import DocumentList from "./DocumentList";

interface ContentAreaProps {
  onViewChange?: (view: "grid" | "list") => void;
  currentView?: "grid" | "list";
  onFilesUpload?: (files: FileList) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  extractionsUsed?: number;
  extractionsLimit?: number;
  storageUsed?: number;
  storageLimit?: number;
  planName?: string;
  onUpgrade?: () => void;
}

const ContentArea = ({
  onViewChange = () => {},
  currentView = "list",
  onFilesUpload = () => {},
  isUploading = false,
  uploadProgress = 0,
  extractionsUsed = 3,
  extractionsLimit = 10,
  storageUsed = 30000, // in bytes
  storageLimit = 104857600, // 100MB in bytes
  planName = "Free Plan",
  onUpgrade = () => {},
}: ContentAreaProps) => {
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Documents</h2>
        <div className="flex items-center space-x-4">
          <Tabs
            value={currentView}
            onValueChange={(value) => onViewChange(value as "grid" | "list")}
          >
            <TabsList>
              <TabsTrigger value="grid">
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button>Sort by</Button>
        </div>
      </div>
      <div className="flex gap-6 h-[180px]">
        <div className="w-1/2 bg-white rounded-lg shadow-md">
          <div className="p-6 h-full">
            <UploadZone
              onFilesSelected={onFilesUpload}
              isUploading={isUploading}
              progress={uploadProgress}
            />
          </div>
        </div>
        <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold text-sm">{planName}</h3>
              <p className="text-xs text-gray-500">Current usage</p>
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600"
              onClick={onUpgrade}
            >
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Extractions</span>
                <span className="text-gray-900 font-medium">
                  {extractionsUsed} of {extractionsLimit}
                </span>
              </div>
              <Progress
                value={(extractionsUsed / extractionsLimit) * 100}
                className="h-2 bg-gray-100"
                indicatorClassName="bg-gradient-to-r from-violet-500 via-blue-500 to-purple-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Storage</span>
                <span className="text-gray-900 font-medium">
                  {formatBytes(storageUsed)} of {formatBytes(storageLimit)}
                </span>
              </div>
              <Progress
                value={(storageUsed / storageLimit) * 100}
                className="h-2 bg-gray-100"
                indicatorClassName="bg-gradient-to-r from-violet-500 via-blue-500 to-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex-1 overflow-auto min-h-0">
        <DocumentList />
      </div>
    </div>
  );
};

export default ContentArea;
