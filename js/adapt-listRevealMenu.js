define(function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');
    var MenuView = require('coreViews/menuView');
    
    var ListRevealMenuView = MenuView.extend({
        
        postRender: function() {
            var nthChild = 0;
            this.model.getChildren().each(function(item) {
                if(item.get('_isAvailable')) {
                    nthChild ++;
                    this.$('.menu-items-inner').append(new ListRevealMenuItemView({model:item, nthChild:nthChild}).$el);
                }
            });
        }

    }, {
        template:'listRevealMenu'
    });

    var ListRevealMenuItemView = MenuView.extend({

        className: function() {
            return [
                'menu-item',
                'menu-item-' + this.model.get('_id') ,
                'nth-child-' + this.options.nthChild,
                this.options.nthChild % 2 === 0  ? 'nth-child-even' : 'nth-child-odd'
            ].join(' ');
        },

        preRender: function() {
            this.model.getCompleteComponentsAsPercentage();
        },

        postRender: function() {
            this.setReadyStatus();
            /*this.$el.imageready(_.bind(function() {
                
            }, this));*/
        }

    }, {
        template:'listRevealMenu-item'
    });
    
    Adapt.on('router:menu', function(model) {

        $('#wrapper').append(new ListRevealMenuView({model:model}).$el);
    
    });
    
});
