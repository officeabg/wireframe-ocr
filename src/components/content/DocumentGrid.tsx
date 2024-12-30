import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { MoreHorizontal, FileText, Image, File } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "other";
  dateAdded: string;
  thumbnail?: string;
}

interface DocumentGridProps {
  documents?: Document[];
  onDocumentSelect?: (doc: Document) => void;
}

const defaultDocuments: Document[] = [
  {
    id: "1",
    name: "Invoice_2023.pdf",
    type: "pdf",
    dateAdded: "2023-12-01",
  },
  {
    id: "2",
    name: "Scan_001.jpg",
    type: "image",
    dateAdded: "2023-12-02",
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: "3",
    name: "Document.pdf",
    type: "pdf",
    dateAdded: "2023-12-03",
  },
];

const DocumentGrid = ({
  documents = defaultDocuments,
  onDocumentSelect = () => {},
}: DocumentGridProps) => {
  const getDocumentIcon = (type: Document["type"]) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "image":
        return <Image className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onDocumentSelect(doc)}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {doc.type === "image" && doc.thumbnail ? (
                    <img
                      src={doc.thumbnail}
                      alt={doc.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                      {getDocumentIcon(doc.type)}
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <h3 className="font-medium text-sm truncate" title={doc.name}>
                  {doc.name}
                </h3>
                <p className="text-xs text-gray-500">{doc.dateAdded}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentGrid;
