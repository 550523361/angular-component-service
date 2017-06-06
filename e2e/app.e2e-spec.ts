import { AngularComponentServicePage } from './app.po';

describe('angular-component-service App', () => {
  let page: AngularComponentServicePage;

  beforeEach(() => {
    page = new AngularComponentServicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
