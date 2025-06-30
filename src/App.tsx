import React from 'react';
import './App.css';
import FlowBuilder from './components/FlowBuilder/FlowBuilder';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <div className="App">
      <h1>Chatbot Flow Builder</h1>
      <div style={{ width: '100%', height: '80vh' }}>
        <ReactFlowProvider>
          <FlowBuilder />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;
