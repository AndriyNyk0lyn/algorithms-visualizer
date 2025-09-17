export class FeatureFlags {
    private static _instance: FeatureFlags | null = null;
    private flags = new Map<string, boolean>();
  
    private constructor() {
      this.flags.set("featureFlag1", true);
      this.flags.set("featureFlag2", false);
    }
  
    static get instance(): FeatureFlags {
      return this._instance ?? (this._instance = new FeatureFlags());
    }
  
    isEnabled(key: string): boolean {
      return this.flags.get(key) ?? false;
    }
  
    set(key: string, on: boolean) {
      this.flags.set(key, on);
    }
  }
  
  const flags = FeatureFlags.instance;
  console.log(flags.isEnabled("featureFlag1"));