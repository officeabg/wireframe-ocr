import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  FolderPlus,
  Folder,
  Search,
  ChevronRight,
  MoreVertical,
  FolderOpen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface FolderItem {
  id: string;
  name: string;
  children?: FolderItem[];
  isExpanded?: boolean;
}

interface SidebarProps {
  folders?: FolderItem[];
  onFolderSelect?: (folder: FolderItem) => void;
  selectedFolderId?: string;
}

const defaultFolders: FolderItem[] = [
  {
    id: "1",
    name: "Documents",
    children: [
      { id: "1-1", name: "Invoices" },
      { id: "1-2", name: "Contracts" },
    ],
    isExpanded: true,
  },
  {
    id: "2",
    name: "Images",
    children: [
      { id: "2-1", name: "Screenshots" },
      { id: "2-2", name: "Photos" },
    ],
  },
  { id: "3", name: "Archives" },
];

const Sidebar = ({
  folders = defaultFolders,
  onFolderSelect = () => {},
  selectedFolderId = "1",
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const renderFolderItem = (folder: FolderItem, depth = 0) => {
    const isSelected = folder.id === selectedFolderId;
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id}>
        <div
          className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer ${isSelected ? "bg-gray-100" : "hover:bg-gray-50"}`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => onFolderSelect(folder)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 mr-1"
            onClick={(e) => {
              e.stopPropagation();
              folder.isExpanded = !folder.isExpanded;
            }}
          >
            {hasChildren && (
              <ChevronRight
                className={`h-3 w-3 transition-transform ${folder.isExpanded ? "transform rotate-90" : ""}`}
              />
            )}
          </Button>
          {folder.isExpanded ? (
            <FolderOpen className="h-4 w-4 mr-2 text-gray-500" />
          ) : (
            <Folder className="h-4 w-4 mr-2 text-gray-500" />
          )}
          <span className="flex-1 text-sm truncate">{folder.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Move</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {hasChildren && folder.isExpanded && (
          <div>
            {folder.children.map((child) => renderFolderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[280px] h-full border-r bg-white p-4 flex flex-col">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Button className="w-full justify-start space-x-2">
          <FolderPlus className="h-4 w-4" />
          <span>New Folder</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 mt-4 -mx-4 px-4">
        <div className="space-y-1">
          {folders.map((folder) => renderFolderItem(folder))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
