import { PagesModule } from './pages.module';

describe('PagesModule', () => {
  let mainModule: PagesModule;

  beforeEach(() => {
    mainModule = new PagesModule();
  });

  it('should create an instance', () => {
    expect(mainModule).toBeTruthy();
  });
});
