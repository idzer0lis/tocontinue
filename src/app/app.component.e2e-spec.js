/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
describe('App', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual("Survey");
  });

  it('should have <header>', function () {
    expect(element(by.css('my-app header')).isPresent()).toEqual(true);
  });

  it('should have <main>', function () {
    expect(element(by.css('my-app main')).isPresent()).toEqual(true);
  });

  it('should have <footer>', function () {
    expect(element(by.css('my-app footer')).isPresent()).toEqual(true);
  });

});
