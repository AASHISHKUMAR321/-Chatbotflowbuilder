import { Edge } from 'reactflow';

// Define node types
export enum NodeType {
  TEXT = 'text',
  // Future node types can be added here
}

// Define the data structure for our nodes
export interface NodeData {
  text: string;
  type: NodeType;
}

// Custom edge type if needed in the future
export type ChatbotEdge = Edge;

// Interface for the flow state
export interface FlowState {
  nodes: any[];
  edges: ChatbotEdge[];
}
