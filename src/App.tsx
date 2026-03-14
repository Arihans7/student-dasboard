/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { SmartPlanner } from './pages/SmartPlanner';
import { TaskGenerator } from './pages/TaskGenerator';
import { Journal } from './pages/Journal';
import { MemoryAssistant } from './pages/MemoryAssistant';
import { IdeaGenerator } from './pages/IdeaGenerator';
import { Insights } from './pages/Insights';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'planner':
        return <SmartPlanner />;
      case 'tasks':
        return <TaskGenerator />;
      case 'journal':
        return <Journal />;
      case 'memory':
        return <MemoryAssistant />;
      case 'ideas':
        return <IdeaGenerator />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

