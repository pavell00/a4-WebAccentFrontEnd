import { A4WebAccentPage } from './app.po';

describe('a4-web-accent App', () => {
  let page: A4WebAccentPage;

  beforeEach(() => {
    page = new A4WebAccentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
