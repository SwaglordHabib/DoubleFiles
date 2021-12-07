/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
import { Toolbar } from '@mui/material';
import { useContext, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { DirentPlus } from '../main/util/DirentPlus';
import './App.css';
import SiteHeader from './components/SiteHeader/SiteHeader';
import { sortByName } from './util/sortByName';
import { Dashboard } from './components/Dashboard/Dashboard';
import { VerticalBox } from './components/Boxes/VerticalBox';
import { HorizontalBox } from './components/Boxes/HorizontalBox';
import {
  LocaleContext,
  LocaleProvider,
  SupportedLanguage,
  translationsPerLocale,
} from './components/providers/i18n';
import { ApiContext, ApiProvider } from './components/providers/api';
import { State } from './components/Loader/State';
import { FileContext, FileProvider } from './components/providers/files';
import { extractDoubles } from './util/extractDoubles';

export const drawerWidth = 240;

const ActualApp = () => {
  const { api } = useContext(ApiContext);
  const { setAll, setNonUniqe } = useContext(FileContext);

  const [tab] = useState('File search');
  const [folder, setFolder] = useState('');

  const handleScan = () => {
    setAll({ state: State.loading, data: [] });
    setNonUniqe({
      state: State.loading,
      data: [],
    });
    api.ipcRenderer
      .scanFolder(folder)
      .then((files: DirentPlus[]) => {
        setAll({ state: State.finished, data: files.sort(sortByName) });
        setNonUniqe({
          state: State.finished,
          data: extractDoubles(files).sort(sortByName),
        });
      })
      .catch((error) => {
        console.error(error);
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
            handleScan={handleScan}
            handleOpenFolder={handleOpenFolder}
          />
        </VerticalBox>
      </HorizontalBox>
    </>
  );
};

export function App() {
  const { locale } = useContext(LocaleContext);
  const messages = translationsPerLocale[locale as SupportedLanguage];

  return (
    <LocaleProvider>
      <IntlProvider locale={locale} messages={messages}>
        <FileProvider>
          <ApiProvider>
            <Router>
              <Switch>
                <Route path="/" component={ActualApp} />
              </Switch>
            </Router>
          </ApiProvider>
        </FileProvider>
      </IntlProvider>
    </LocaleProvider>
  );
}
