// Generated by CoffeeScript 1.6.2
var SparseDemo, global,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

global = typeof exports !== "undefined" && exports !== null ? exports : window;

if (!global.SparseDemo) {
  SparseDemo = global.SparseDemo = {};
}

(function($) {
  'use strict';
  var _ref;

  return SparseDemo.ModelView = (function(_super) {
    var _ref1;

    __extends(ModelView, _super);

    function ModelView() {
      _ref = ModelView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ModelView.prototype.reset = function() {
      this['form'].model.clear();
      return this['form'].model.set(this['form'].__defaults);
    };

    ModelView.prototype.subviews = {
      'form': SparseDemo.ModelForm = (function(_super1) {
        var SparseClass, _ref2;

        __extends(ModelForm, _super1);

        function ModelForm() {
          _ref1 = ModelForm.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        ModelForm.prototype.__defaults = {
          name: 'Record One',
          description: 'This record created with sParse'
        };

        ModelForm.prototype.init = function(o) {
          var _this = this;

          this.events = _.extend(this.events, ModelForm.__super__.events);
          this.delegateEvents();
          this.model.on('change', function() {
            var n;

            return _this.$el.find('#create_model').attr('disabled', !(n = _this.model.isNew())).siblings().attr('disabled', n);
          });
          return rivets.bind(this.el, {
            model: this.model
          });
        };

        ModelForm.prototype.model = new (SparseClass = (function(_super2) {
          __extends(SparseClass, _super2);

          function SparseClass() {
            _ref2 = SparseClass.__super__.constructor.apply(this, arguments);
            return _ref2;
          }

          return SparseClass;

        })(sparse.Model));

        ModelForm.prototype.events = {
          'click #create_model': function(evt) {
            var _this = this;

            return this.model.save(null, {
              success: function(m, r, o) {
                return _this.__parent.__parent.collection.destroy(m);
              },
              error: function(m, r, o) {
                return console.log('failed to create model');
              }
            });
          },
          'click #update_model': function(evt) {
            var _this = this;

            evt.preventDefault();
            this.model.save({
              success: function(m, r, o) {},
              error: function(m, r, o) {
                return console.log('failed to update model');
              }
            });
            return false;
          },
          'click #destroy_model': function(evt) {
            var _this = this;

            evt.preventDefault();
            this.model.destroy({
              success: function(m, r, o) {
                _this.__parent.__parent.collection.remove(_.filter(_this.__parent.__parent.collection.models, function(o) {
                  return o.attributes.path.match(new RegExp("\/" + _this.model.id + "+$"));
                }));
                return _this.__parent.reset();
              },
              error: function(m, r, o) {
                return console.log('failed to destroy model');
              }
            });
            return false;
          }
        };

        return ModelForm;

      })(SparseDemo.APIFormView)
    };

    return ModelView;

  })(SparseDemo.BaseView);
})(jQuery);
