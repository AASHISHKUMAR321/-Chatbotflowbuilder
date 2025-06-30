import React from 'react';
import './App.css';
import FlowChart from './components/FlowChart';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <div className="App">
      <h1>React Flow TypeScript Example</h1>
      <div style={{ width: '100%', height: '80vh' }}>
        <ReactFlowProvider>
          <FlowChart />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;
