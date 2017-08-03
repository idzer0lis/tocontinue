/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
describe('Home', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <my-home>', function () {
    var home = element(by.css('my-app my-home'));
    expect(home.isPresent()).toEqual(true);
    expect(home.getText()).toEqual("Welcome!");
  });

});
