import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';

interface SettingsPanelProps {
  selectedNode: Node | null;
  onNodeChange: (nodeId: string, data: any) => void;
  onClose: () => void;
}

/**
 * SettingsPanel Component
 * Displays settings for the selected node
 * Currently only supports editing text for Text nodes
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onNodeChange,
  onClose,
}) => {
  const [text, setText] = useState('');

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.text || '');
    }
  }, [selectedNode]);

  // Handle text change and update the node
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (selectedNode) {
      onNodeChange(selectedNode.id, { text: e.target.value });
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="bg-gray-50 border-l border-gray-200 p-5 w-60 h-full overflow-y-auto">
      <h3 className="mt-0 mb-5 text-base text-gray-700 flex items-center">
        <button 
          className="bg-transparent border-none text-base cursor-pointer mr-2.5 text-gray-500 hover:text-gray-700" 
          onClick={onClose}
        >
          &larr;
        </button>
        Message
      </h3>
      
      <div className="mb-4">
        <label className="block mb-1.5 text-sm text-gray-600">
          Text
        </label>
        <textarea 
          className="w-full p-2 border border-gray-300 rounded text-sm min-h-[100px] resize-vertical focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          value={text} 
          onChange={handleTextChange} 
          placeholder="Enter message text..."
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
