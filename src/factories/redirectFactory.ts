import { type Actions } from "gatsby";

export type RedirectConfig = {
  fromPaths: string[];
  toPath: (values: string[]) => string;
  isPermanent?: boolean;
};

export class RedirectFactory {
  constructor(
    private readonly actions: Actions,
    private readonly redirectConfigurations: Record<string, RedirectConfig>,
  ) {}

  createRedirects(values: string[]): void {
    Object.values(this.redirectConfigurations).forEach((config) => {
      config.fromPaths.forEach((fromPath) => {
        const toPath =
          typeof config.toPath === "function"
            ? config.toPath(values)
            : config.toPath;
        this.actions.createRedirect({
          fromPath,
          toPath,
          isPermanent: config.isPermanent ?? true,
        });
      });
    });
  }
}
