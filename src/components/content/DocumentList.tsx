import React from "react";
import { FileText, Image, Eye, Download, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "other";
  size: string;
  dateAdded: string;
  thumbnail?: string;
}

interface DocumentListProps {
  documents?: Document[];
  onView?: (doc: Document) => void;
  onDownload?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
}

const defaultDocuments: Document[] = [
  {
    id: "1",
    name: "Invoice_2023.pdf",
    type: "pdf",
    size: "2.5 MB",
    dateAdded: "2023-12-01",
  },
  {
    id: "2",
    name: "Scan_001.jpg",
    type: "image",
    size: "1.8 MB",
    dateAdded: "2023-12-02",
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: "3",
    name: "Document.pdf",
    type: "pdf",
    size: "3.2 MB",
    dateAdded: "2023-12-03",
  },
];

const DocumentList = ({
  documents = defaultDocuments,
  onView = () => {},
  onDownload = () => {},
  onDelete = () => {},
}: DocumentListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="min-w-full divide-y divide-gray-200">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center px-6 py-4 hover:bg-gray-50"
          >
            <div className="flex items-center flex-1 min-w-0">
              <div className="flex-shrink-0 h-10 w-10 mr-4">
                {doc.type === "image" && doc.thumbnail ? (
                  <img
                    src={doc.thumbnail}
                    alt={doc.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                    {doc.type === "pdf" ? (
                      <FileText className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Image className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {doc.name}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <p className="text-sm text-gray-500 w-20 text-right">
                  {doc.size}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView(doc)}
                className="h-8 w-8"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDownload(doc)}
                className="h-8 w-8"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(doc)}
                className="h-8 w-8 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
