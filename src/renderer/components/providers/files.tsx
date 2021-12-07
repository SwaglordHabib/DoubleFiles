import { createContext, FunctionComponent, useState } from 'react';
import { DirentPlus } from '../../../main/util/DirentPlus';
import { Loadable } from '../Loader/Loadable';
import { State } from '../Loader/State';

interface FileContxtType {
  all: Loadable<DirentPlus[]>;
  setAll: (all: Loadable<DirentPlus[]>) => void;
  nonUniqe: Loadable<DirentPlus[]>;
  setNonUniqe: (nonUniqe: Loadable<DirentPlus[]>) => void;
}

export const FileContext = createContext<FileContxtType>({
  all: { state: State.inital, data: [] },
  setAll: (all) => {},
  nonUniqe: { state: State.inital, data: [] },
  setNonUniqe: (nonUniqe) => {},
});

export const FileProvider: FunctionComponent = ({ children }) => {
  const [all, setAll] = useState<Loadable<DirentPlus[]>>({
    state: State.inital,
    data: [],
  });
  const [nonUniqe, setNonUniqe] = useState<Loadable<DirentPlus[]>>({
    state: State.inital,
    data: [],
  });

  return (
    <FileContext.Provider value={{ all, nonUniqe, setAll, setNonUniqe }}>
      {children}
    </FileContext.Provider>
  );
};
