import { createContext, FunctionComponent } from 'react';
import { Api } from '../../Api';

interface WindowWithElectronApi extends Window {
  api: Api;
}

interface ApiContxtType {
  api: Api;
}

export const ApiContext = createContext<ApiContxtType>({
  api: (window as unknown as WindowWithElectronApi).api,
});

export const ApiProvider: FunctionComponent = ({ children }) => {
  const { api } = window as unknown as WindowWithElectronApi;
  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};
