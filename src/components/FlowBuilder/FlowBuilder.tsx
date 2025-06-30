import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Controls,
  Background,
  NodeTypes,
  OnConnect,
  NodeMouseHandler,
  XYPosition,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeType } from '../../types';
import TextNode from '../Nodes/TextNode';
import NodesPanel from '../Panels/NodesPanel';
import SettingsPanel from '../Panels/SettingsPanel';

// Define the node types for ReactFlow
const nodeTypes: NodeTypes = {
  [NodeType.TEXT]: TextNode,
};

/**
 * FlowBuilder Component
 * Main component that integrates ReactFlow with our custom components
 */
const FlowBuilder: React.FC = () => {
  // ReactFlow states
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // UI states
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<any>(null);

  // Handle node selection
  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  // Handle node data changes (from settings panel)
  const handleNodeChange = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...newData,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Handle closing the settings panel
  const handleCloseSettings = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle connecting nodes
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      // Check if source already has an outgoing connection
      const sourceHasConnection = edges.some(
        (edge) => edge.source === connection.source
      );
      
      if (sourceHasConnection) {
        // Remove the existing connection
        const newEdges = edges.filter(
          (edge) => edge.source !== connection.source
        );
        setEdges((eds) => addEdge(connection, newEdges));
      } else {
        // Add the new connection
        setEdges((eds) => addEdge(connection, eds));
      }
    },
    [edges, setEdges]
  );

  // Handle drag over for dropping new nodes
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle dropping new nodes
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeType = event.dataTransfer.getData('application/reactflow') as NodeType;
      
      // Check if the dropped element is valid
      if (!nodeType) {
        return;
      }

      const position = reactFlowInstance.current.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }) as XYPosition;

      // Create a new node
      const newNode = {
        id: `node_${Date.now()}`,
        type: nodeType,
        position,
        data: { 
          text: 'New message',
          type: nodeType
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  // Handle saving the flow
  const handleSave = useCallback(() => {
    setError(null);
    
    // Check if there are multiple nodes
    if (nodes.length > 1) {
      // Count nodes with empty target handles (no incoming connections)
      const nodesWithoutIncoming = nodes.filter(
        (node) => !edges.some((edge) => edge.target === node.id)
      );
      
      // If more than one node has no incoming connections, show error
      if (nodesWithoutIncoming.length > 1) {
        setError('Cannot save Flow: More than one node has empty target handles');
        return;
      }
    }
    
    // Save the flow (in a real app, this would send data to a backend)
    const flowData = {
      nodes,
      edges,
    };
    
    console.log('Flow saved:', flowData);
    alert('Flow saved successfully!');
  }, [nodes, edges]);

  // Handle drag start for node panel items
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex w-full h-screen">
      <ReactFlowProvider>
        <div className="flex-grow h-full relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onInit={(instance) => {
              reactFlowInstance.current = instance;
            }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
          
          
          <div 
            className={`absolute top-[70px] right-[280px] p-2.5 px-4 bg-red-50 text-red-700 rounded text-sm z-10 shadow-sm transition-opacity duration-300 ${error ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            {error}
          </div>
        </div>
        <button
          onClick={handleSave}
          className="absolute top-2 right-[280px] py-2 px-4 bg-blue-500 text-white border-none rounded text-sm cursor-pointer z-10 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Save Changes
        </button>
        
        {selectedNode ? (
          <SettingsPanel
            selectedNode={selectedNode}
            onNodeChange={handleNodeChange}
            onClose={handleCloseSettings}
          />
        ) : (
          <NodesPanel onDragStart={onDragStart} />
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder;
