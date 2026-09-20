import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { parseTenantConfig, type TenantConfig } from '../config/tenant-config';
import { fetchTenantConfig } from '../services/tenant-config-api';
import type { TenantId, ThemeFamily } from '../theme/types';

const CONFIG_CACHE_KEY = 'surface-demo:tenant-config';
const MODE_KEY = 'surface-demo:mode';

interface TenantState {
  config: TenantConfig | null;
  family: ThemeFamily;
  isBootstrapping: boolean;
  isSwitching: boolean;
  error: string | null;
  bootstrap: () => Promise<void>;
  switchTenant: () => Promise<void>;
  toggleFamily: () => void;
  clearError: () => void;
}

let activeController: AbortController | null = null;
let bootstrapPromise: Promise<void> | null = null;

function readCachedConfig(): TenantConfig | null {
  try {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(CONFIG_CACHE_KEY);
    return cached ? parseTenantConfig(JSON.parse(cached)) : null;
  } catch {
    return null;
  }
}

function readMode(): ThemeFamily | null {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(MODE_KEY);
  return value === 'light' || value === 'dark' ? value : null;
}

function persistConfig(config: TenantConfig) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(config));
}

const initialConfig = readCachedConfig();

export const useTenantStore = create<TenantState>((set, get) => ({
  config: initialConfig,
  family: readMode() ?? initialConfig?.defaultMode ?? 'dark',
  isBootstrapping: true,
  isSwitching: false,
  error: null,

  bootstrap: async () => {
    if (bootstrapPromise) return bootstrapPromise;
    bootstrapPromise = (async () => {
      const cached = get().config;
      const requestedTenant: TenantId = cached?.themePreset ?? 'prism';
      try {
        const config = await fetchTenantConfig(requestedTenant);
        persistConfig(config);
        set({
          config,
          family: readMode() ?? config.defaultMode,
          isBootstrapping: false,
          error: null,
        });
      } catch {
        set({
          isBootstrapping: false,
          error: cached ? null : 'Unable to load tenant configuration.',
        });
      } finally {
        bootstrapPromise = null;
      }
    })();
    return bootstrapPromise;
  },

  switchTenant: async () => {
    const current = get().config?.themePreset ?? 'prism';
    const next: TenantId = current === 'prism' ? 'northstar' : 'prism';
    activeController?.abort();
    const controller = new AbortController();
    activeController = controller;
    set({ isSwitching: true, error: null });
    try {
      const config = await fetchTenantConfig(next, controller.signal);
      persistConfig(config);
      set({ config, error: null });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      set({ error: 'Tenant switch failed. The current theme was preserved.' });
    } finally {
      if (activeController === controller) {
        activeController = null;
        set({ isSwitching: false });
      }
    }
  },

  toggleFamily: () => {
    const family = get().family === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') localStorage.setItem(MODE_KEY, family);
    set({ family });
  },

  clearError: () => set({ error: null }),
}));

export function useTenantAppState() {
  return useTenantStore(
    useShallow((state) => ({
      config: state.config,
      family: state.family,
      isBootstrapping: state.isBootstrapping,
      isSwitching: state.isSwitching,
      error: state.error,
      bootstrap: state.bootstrap,
      switchTenant: state.switchTenant,
      toggleFamily: state.toggleFamily,
      clearError: state.clearError,
    })),
  );
}
