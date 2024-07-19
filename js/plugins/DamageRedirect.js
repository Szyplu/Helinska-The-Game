/*:
 * @plugindesc Damage Redirect Plugin
 * @help This plugin allows you to create an effect where a specific enemy can intercept attacks directed at other enemies.
 */

(function() {
    var _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        if (target.isEnemy() && target.isDamageRedirectActive()) {
            var allies = target.friendsUnit().aliveMembers();
            var redirector = allies.find(function(member) {
                return member.isDamageRedirector();
            });
            if (redirector && redirector !== target) {
                this.subject()._targetIndex = redirector.index();
                target = redirector;
            }
        }
        _Game_Action_apply.call(this, target);
    };

    Game_Enemy.prototype.isDamageRedirectActive = function() {
        return this.traitObjects().some(function(trait) {
            return trait.meta.damageRedirect;
        });
    };

    Game_Enemy.prototype.isDamageRedirector = function() {
        return this.traitObjects().some(function(trait) {
            return trait.meta.damageRedirector;
        });
    };
})();
