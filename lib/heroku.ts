export interface AppJsonAddon {
  plan: string;
  as?: string;
  options?: Record<string, string>;
}

export interface AppJsonEnv {
  description?: string;
  value?: string;
  generator?: 'secret';
  required?: boolean;
}

export interface AppJsonFormation {
  quantity?: number;
  size: string;
}

export interface AppJson {
  env: Record<string, AppJsonEnv>;

  formation: Record<string, AppJsonFormation>;

  addons: Array<string | AppJsonAddon>;
}
