import React from 'react';
import { NodeType } from '../../types';

interface NodesPanelProps {
  onDragStart: (event: React.DragEvent, nodeType: NodeType) => void;
}

/**
 * NodesPanel Component
 * Displays available node types that can be dragged onto the canvas
 * Currently only supports Text node, but designed to be extensible
 */
const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => {
  // Node types configuration - can be extended in the future
  const nodeTypes = [
    {
      type: NodeType.TEXT,
      label: 'Message',
      icon: 'M',
    },
    // Future node types can be added here
  ];

  return (
    <div className="bg-gray-50 border-l border-gray-200 p-5 w-60 h-full overflow-y-auto">
      <h3 className="mt-0 mb-5 text-base text-gray-700">Nodes Panel</h3>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
          className="p-2.5 bg-white border border-gray-300 rounded mb-2.5 cursor-grab flex items-center hover:shadow-sm"
        >
          <div className="w-6 h-6 bg-emerald-200 rounded text-white flex items-center justify-center text-xs mr-2.5">
            {node.icon}
          </div>
          <span className="text-sm">{node.label}</span>
        </div>
      ))}
    </div>
  );
};

export default NodesPanel;
