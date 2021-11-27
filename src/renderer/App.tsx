/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
import { Toolbar } from '@mui/material';
import { useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { DirentPlus } from '../main/DirentPlus';
import './App.css';
import SiteHeader from './components/SiteHeader/SiteHeader';
import { Api } from './Api';
import { sortByName } from './util/sortByName';
import { Dashboard } from './components/Dashboard/Dashboard';
import { VerticalBox } from './components/Boxes/VerticalBox';
import { HorizontalBox } from './components/Boxes/HorizontalBox';

export const drawerWidth = 240;

const ActualApp = () => {
  const [tab] = useState('File search');
  const [folder, setFolder] = useState('');
  const [files, setFiles] = useState<DirentPlus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const api = (window as any).api as Api;

  const handleScan = () => {
    setLoading(true);
    api.ipcRenderer.scanFolder(folder);
    api.ipcRenderer.on('scan-finshed', (scannedFiles: DirentPlus[]) => {
      setFiles([...new Set(scannedFiles)].sort(sortByName));
      setLoading(false);
    });
  };

  const handleOpenFolder = () => {
    api.ipcRenderer.openDialog();
    api.ipcRenderer.on(
      'selected-folder',
      (selectedFolder: string[] | undefined) => {
        if (selectedFolder) {
          setFolder(selectedFolder[0]);
        }
      }
    );
  };

  return (
    <>
      <SiteHeader />
      <HorizontalBox>
        <VerticalBox>
          <Toolbar />
          <Dashboard
            tab={tab}
            files={files}
            loading={loading}
            handleScan={handleScan}
            handleOpenFolder={handleOpenFolder}
          />
        </VerticalBox>
      </HorizontalBox>
    </>
  );
};

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ActualApp} />
      </Switch>
    </Router>
  );
}
