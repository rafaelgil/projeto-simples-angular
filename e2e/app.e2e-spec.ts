import { ProjetoSimplesAngularPage } from './app.po';

describe('projeto-simples-angular App', () => {
  let page: ProjetoSimplesAngularPage;

  beforeEach(() => {
    page = new ProjetoSimplesAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
