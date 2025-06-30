import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';

// Initial nodes
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start Node' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Process Node' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'End Node' },
    position: { x: 400, y: 200 },
  },
];

// Initial edges
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

const FlowChart: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
