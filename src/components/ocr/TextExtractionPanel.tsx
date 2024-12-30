import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Copy, Edit, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

interface TextExtractionPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  documentName?: string;
  extractedText?: string;
  onTextEdit?: (text: string) => void;
  onCopy?: () => void;
}

const TextExtractionPanel = ({
  isOpen = true,
  onClose = () => {},
  documentName = "Sample Document.pdf",
  extractedText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  onTextEdit = () => {},
  onCopy = () => {},
}: TextExtractionPanelProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(extractedText);

  const handleEditToggle = () => {
    if (isEditing) {
      onTextEdit(editedText);
    }
    setIsEditing(!isEditing);
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed right-0 top-0 h-screen w-[400px] bg-white shadow-lg flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Extracted Text</h3>
          <p className="text-sm text-gray-500 truncate">{documentName}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 p-4 border-b">
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={handleEditToggle}
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          disabled={isEditing}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {isEditing ? (
          <Textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="min-h-[200px] resize-none"
          />
        ) : (
          <div className="whitespace-pre-wrap">{extractedText}</div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default TextExtractionPanel;
