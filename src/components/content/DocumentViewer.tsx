import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    name: string;
    type: "pdf" | "image" | "other";
    url?: string;
    extractedText?: string;
  };
}

const DocumentViewer = ({ isOpen, onClose, document }: DocumentViewerProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (document.extractedText) {
      await navigator.clipboard.writeText(document.extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[80vh] p-0 gap-0">
        <div className="flex h-full">
          {/* Document Preview */}
          <div className="w-1/2 h-full border-r">
            {document.type === "image" ? (
              <img
                src={document.url}
                alt={document.name}
                className="w-full h-full object-contain bg-gray-50"
              />
            ) : (
              <iframe
                src={document.url}
                title={document.name}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Extracted Text */}
          <div className="w-1/2 h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Extracted Text</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Text
                  </>
                )}
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="whitespace-pre-wrap">
                {document.extractedText}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
