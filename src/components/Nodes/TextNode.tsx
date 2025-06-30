import React from 'react';
import { Handle, Position } from 'reactflow';

// Using Tailwind CSS classes instead of styled-components

interface TextNodeProps {
  data: {
    text: string;
    type?: string;
  };
  isConnectable: boolean;
  selected?: boolean;
}

/**
 * TextNode Component
 * Represents a text message node in the chatbot flow
 * Has one source handle (output) and one target handle (input)
 */
const TextNode: React.FC<TextNodeProps> = ({ data, isConnectable, selected }) => {
  return (
    <div 
      className="p-2.5 rounded bg-white border border-gray-300 shadow-sm w-[200px]"
      style={{ borderColor: selected ? '#1a192b' : '#ddd' }}
    >
      {/* Target handle - can have multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      
      <div className="p-1.5 bg-emerald-200 rounded text-xs font-bold mb-2">
        Send Message
      </div>
      <div className="p-1.5 text-sm text-gray-700 break-words">
        {data.text}
      </div>
      
      {/* Source handle - can only have one outgoing connection */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TextNode;
