import React from "react";
import Sidebar from "./layout/Sidebar";
import ContentArea from "./content/ContentArea";
import TextExtractionPanel from "./ocr/TextExtractionPanel";
import Header from "./layout/Header";

interface HomeProps {
  onFolderSelect?: (folderId: string) => void;
  onViewChange?: (view: "grid" | "list") => void;
  onFilesUpload?: (files: FileList) => void;
  selectedFolderId?: string;
  currentView?: "grid" | "list";
  isUploading?: boolean;
  uploadProgress?: number;
  isExtractionPanelOpen?: boolean;
  selectedDocument?: {
    name: string;
    extractedText: string;
  };
}

const Home = ({
  onFolderSelect = () => {},
  onViewChange = () => {},
  onFilesUpload = () => {},
  selectedFolderId = "1",
  currentView = "grid",
  isUploading = false,
  uploadProgress = 0,
  isExtractionPanelOpen = true,
  selectedDocument = {
    name: "Sample Document.pdf",
    extractedText: "This is a sample extracted text from the document.",
  },
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar
          selectedFolderId={selectedFolderId}
          onFolderSelect={(folder) => onFolderSelect(folder.id)}
        />

        <main className="flex-1 flex">
          <ContentArea
            currentView={currentView}
            onViewChange={onViewChange}
            onFilesUpload={onFilesUpload}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />

          <TextExtractionPanel
            isOpen={isExtractionPanelOpen}
            documentName={selectedDocument.name}
            extractedText={selectedDocument.extractedText}
            onClose={() => {}}
            onTextEdit={(text) => {}}
            onCopy={() => {
              navigator.clipboard.writeText(selectedDocument.extractedText);
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
