# Chatbot Flow Builder

A visual editor for creating and managing chatbot conversation flows using React Flow and Tailwind CSS.

## Overview

Chatbot Flow Builder is a web application that allows you to visually design chatbot conversation flows. It uses React Flow for the interactive flow chart interface and Tailwind CSS for styling.

## Features

- Drag and drop interface for creating conversation nodes
- Visual connection between conversation steps
- Edit node content through a settings panel
- Save and validate flow configurations
- Responsive and modern UI with Tailwind CSS

## Tech Stack

- **React**: v19.1.0
- **TypeScript**: v4.9.5
- **React Flow**: v11.11.4 - For interactive node-based UI
- **Tailwind CSS**: v3.4.17 - For styling components

## Project Structure

```text
src/
├── components/
│   ├── FlowBuilder/
│   │   └── FlowBuilder.tsx - Main component integrating React Flow
│   ├── Nodes/
│   │   └── TextNode.tsx - Custom node component for text messages
│   └── Panels/
│       ├── NodesPanel.tsx - Panel for dragging new nodes
│       └── SettingsPanel.tsx - Panel for editing node properties
├── types/
│   └── index.ts - TypeScript type definitions
├── App.tsx - Main application component
├── index.tsx - Entry point
└── index.css - Global styles with Tailwind directives
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chaboat_flow_builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Usage

1. **Adding Nodes**: Drag node types from the Nodes Panel on the right side to the canvas.
2. **Connecting Nodes**: Click and drag from one node's handle to another node's handle to create connections.
3. **Editing Nodes**: Click on a node to open the Settings Panel where you can edit the node's content.
4. **Saving Flow**: Click the "Save Changes" button to validate and save your flow configuration.

## Styling

The project uses Tailwind CSS for styling. The main configuration is in `tailwind.config.js` and global styles are in `src/index.css`.

## Future Enhancements

- Additional node types (buttons, quick replies, media, etc.)
- Flow validation and testing
- Import/export functionality
- Integration with popular chatbot platforms
