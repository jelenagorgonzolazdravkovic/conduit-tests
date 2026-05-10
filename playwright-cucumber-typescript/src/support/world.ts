import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { APIRequestContext, Browser, BrowserContext, Page } from 'playwright';

export class ConduitWorld extends World {
  // UI state
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  lastArticleTitle?: string;
  initialFavoriteCount?: number;

  // API state
  apiReq?: APIRequestContext;
  apiToken?: string;
  apiStatus?: number;
  apiBody?: any;
  apiArticleSlug?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(ConduitWorld);
