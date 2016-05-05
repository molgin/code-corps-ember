import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-settings-form', 'Integration | Component | user settings form', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{user-settings-form}}`);

  assert.equal(this.$('.user-settings-form').length, 1);
});

let user = {
  name: 'Test User',
  twitter: '@testuser',
  website: 'example.com',
  biography: 'A test user',
};

test('it renders form elements properly', function(assert) {
  assert.expect(5);

  this.set('user', user);

  this.render(hbs`{{user-settings-form user=user}}`);

  assert.equal(this.$('input[name=name]').val(), 'Test User');
  assert.equal(this.$('input[name=twitter]').val(), '@testuser');
  assert.equal(this.$('input[name=website]').val(), 'example.com');
  assert.equal(this.$('input[name=biography]').val(), 'A test user');

  assert.equal(this.$('.save').length, 1);
});

test('it calls save on user when save button is clicked', function(assert) {
  assert.expect(2);

  user.save = function() {
    assert.ok(true, 'Save method was called on user');
    return Ember.RSVP.resolve();
  };

  this.set('user', user);

  const flashServiceStub = Ember.Service.extend({
    success() {
      assert.ok(true, 'Flash message service was called');
    }
  });

  this.register('service:flash-messages', flashServiceStub);


  this.render(hbs`{{user-settings-form user=user}}`);

  this.$('.save').click();
});