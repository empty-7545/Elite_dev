import { create } from 'zustand';

interface TerminalState {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  isExpanded: false,
  toggleExpanded: () => set((state) => ({ 
    isExpanded: !state.isExpanded
  })),
}));