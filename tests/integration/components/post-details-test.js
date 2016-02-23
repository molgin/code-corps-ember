import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let mockSession = Ember.Service.extend({
  isAuthenticated: true,
  session: {
    authenticated: {
      user_id: 1
    }
  }
});

let mockPost = Ember.Object.create({
  title: 'A post',
  body: 'A <strong>body</strong>',
  postType: 'issue',
  user: {
    id: 1
  }
});


moduleForComponent('post-details', 'Integration | Component | post details', {
  integration: true,
  beforeEach() {
    this.container.registry.register('service:session', mockSession);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{post-details}}`);

  assert.equal(this.$('.post-details').length, 1, 'The component\'s element is rendered');
});


test('it renders all the ui elements properly bound', function(assert) {
  this.set('post', mockPost);

  this.render(hbs`{{post-details post=post}}`);

  assert.equal(this.$('.post-details .title').text().trim(), 'A post', 'Title is correctly bound and rendered');
  assert.equal(this.$('.post-details .body').text().trim(), 'A body', 'Body is correctly bound and rendered');
  assert.equal(this.$('.post-details.issue .post-icon').length, 1, 'Post type is correctly bound and rendered');
});

test('the post body is rendered as unescaped html', function (assert) {
  this.set('post', { title: 'A post', body: 'A <strong>body</strong>', postType: 'issue' });

  this.render(hbs`{{post-details post=post}}`);
  assert.equal(this.$('.post-details .body strong').length, 1, 'A html element within the body element is rendered unescaped');
});

test('user can switch between view and edit mode for post body', function(assert) {
  assert.expect(3);
  this.set('post', mockPost);

  this.render(hbs`{{post-details post=post}}`);
  assert.equal(this.$('.post-body .edit').length, 1, 'The edit button is rendered');

  this.$('.post-body .edit').click();
  assert.equal(this.$('.post-body .cancel').length, 1, 'The cancel button is rendered');

  this.$('.post-body .cancel').click();
  assert.equal(this.$('.post-body .edit').length, 1, 'The edit button is rendered');
});