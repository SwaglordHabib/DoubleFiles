import { DirentPlus } from '../../../main/DirentPlus';

export interface DashboardProps {
  tab: string;
  handleOpenFolder: () => void;
  handleScan: () => void;
  loading: boolean;
  files: DirentPlus[];
}
