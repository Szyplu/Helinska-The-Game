/*:
 * @plugindesc Conditional Skill Activation Plugin
 * @help This plugin allows you to create skills that activate based on specific conditions.
 */

(function() {
    var _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        if (this.item().meta.conditionalSkill) {
            var allMembers = $gameParty.members();
            var hpBelow50 = allMembers.every(function(member) {
                return member.hpRate() < 0.5;
            });
            if (hpBelow50) {
                allMembers.forEach(function(member) {
                    member.addState(18); // Zmień 8 na odpowiednie ID stanu Sleep
                });
            }
        }
        _Game_Action_apply.call(this, target);
    };
})();
