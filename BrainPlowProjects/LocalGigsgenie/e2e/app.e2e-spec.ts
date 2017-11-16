import { VersionPage } from './app.po';

describe('version App', () => {
  let page: VersionPage;

  beforeEach(() => {
    page = new VersionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
