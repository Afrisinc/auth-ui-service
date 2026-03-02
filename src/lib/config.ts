export interface RuntimeConfig {
  serverUrl: string;
}

let config: RuntimeConfig | null = null;
let configLoaded = false;

export async function loadRuntimeConfig(): Promise<RuntimeConfig> {
  if (configLoaded) {
    return config!;
  }

  try {
    const response = await fetch('/config.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to load config.json: ${response.status}`);
    }

    const runtimeConfig = await response.json();

    // Priority: VITE_API_URL env var (set at build time) > config.json > empty string
    config = {
      serverUrl: import.meta.env.VITE_API_URL || runtimeConfig.serverUrl || '',
    };

    if (config.serverUrl) {
      const source = import.meta.env.VITE_API_URL ? 'build-time VITE_API_URL' : 'config.json';
      // console.log(`[Config] Using ${source}:`, config.serverUrl);
    } else {
      console.warn('[Config] serverUrl not configured. Set VITE_API_URL env var at build time.');
    }

    configLoaded = true;
    return config;
  } catch (error) {
    console.warn('[Config] Could not load config.json, falling back to build-time VITE_API_URL', error);
    config = {
      serverUrl: import.meta.env.VITE_API_URL || '',
    };
    configLoaded = true;
    if (config.serverUrl) {
      // console.log('[Config] Using VITE_API_URL:', config.serverUrl);
    } else {
      console.warn('[Config] Warning: VITE_API_URL not configured. API calls will fail.');
    }
    return config;
  }
}

export function getRuntimeConfig(): RuntimeConfig {
  if (!configLoaded || !config) {
    throw new Error('Configuration not loaded. Call loadRuntimeConfig() first.');
  }
  return config;
}

export function getConfigValue(key: keyof RuntimeConfig): string {
  const cfg = getRuntimeConfig();
  return cfg[key] || '';
}

export function isRuntimeConfigLoaded(): boolean {
  return configLoaded;
}
