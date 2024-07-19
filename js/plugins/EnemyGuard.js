/*:
 * @plugindesc Enemy Guard Plugin
 * @help This plugin allows a specific enemy to intercept attacks directed at other enemies.
 */

(function() {
    var _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        if (target.isEnemy() && this.isAttack() && target.friendsUnit().hasGuard()) {
            var guard = target.friendsUnit().guard();
            if (guard && guard !== target) {
                this.subject()._targetIndex = guard.index();
                target = guard;
            }
        }
        _Game_Action_apply.call(this, target);
    };

    Game_Unit.prototype.hasGuard = function() {
        return this.aliveMembers().some(function(member) {
            return member.isGuard();
        });
    };

    Game_Unit.prototype.guard = function() {
        return this.aliveMembers().find(function(member) {
            return member.isGuard();
        });
    };

    Game_Battler.prototype.isGuard = function() {
        return this.isStateAffected($dataStates.findIndex(state => state && state.meta.GuardType === "2"));
    };
})();
