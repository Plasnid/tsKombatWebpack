import DigiPet from './DigiPet';
import FightClub from './FightClub';
import CombatRoles from './CombatRoles';
import OffensiveFood from './OffensiveFood';
import Armor from './Armor';

class Arena implements FightClub{
    fighter1: DigiPet;
    fighter2: DigiPet;
    fighters: DigiPet[];
    startingPlayer: number = 0;
    constructor(fighter1: DigiPet, fighter2: DigiPet){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighters = [this.fighter1, this.fighter2];
        console.log(`%c welcome ${fighter1.tamName} and ${fighter2.tamName} to MORTAL KOMBAT!!!!`,"font-size: 2em; color:red; font-weight:bold; background:black;");
        this.initMatch();
    }
    //initialize the match!
    initMatch(): void{
        console.log("Fight!");
        this.startingPlayer =  this.determineFirstFighter();
        this.meleRound(this.fighters, this.startingPlayer);
    }
    //random first strike
    determineFirstFighter(): number{
        let firstFighter: number;
        let fighterChance = Math.random();
        if(fighterChance>.5){
            firstFighter = 0;
        }else{
            firstFighter = 1;
        }
        return firstFighter;
    }
    //meleRounds run until a player reaches 0 hit points
    meleRound(fighters: DigiPet[], playerNum: number): void{
        //console.log("run a round of fighting!");
        //define who the attacker is:
        let combatants: CombatRoles = this.determineCombatRoles(playerNum); 
        //define the attacker and defender roles:
        //console.log(`attacker: ${combatants.attacker}  defender:${combatants.defender}`);
        let attacker: DigiPet = fighters[combatants.attacker] as DigiPet;
        let defender: DigiPet = fighters[combatants.defender] as DigiPet;
        //now we get the food type to attack with
        let foodWeapon: OffensiveFood = attacker.attack();
        //console.log(foodWeapon);
        //we get the defense from the opposing player
        let defense: Armor = defender.defend();
        //check if the attack hit
        let foodHit: boolean = this.determineStrikeOutcome(foodWeapon, defense);
        //apply the damage
        if(foodHit===true){
            console.log(`%c${attacker.getFighterName()} hits ${defender.getFighterName()} with ${foodWeapon.foodName} for ${foodWeapon.damage}!`,"font-size: 2em; color: red; background: black;");
            defender.takeDamage(foodWeapon.damage);
        }else{
            console.log(`%c${attacker.getFighterName()} misses ${defender.getFighterName()} with ${foodWeapon.foodName}!`,"font-size: 2em; color:green;background:yellow;");
        }
        console.log(`${attacker.getFighterName()}: ${attacker.getHP()} ${defender.getFighterName()}: ${defender.getHP()}`);
        //check for 0 and show result
        if(defender.getHP()<=0){
            console.log(`%c${attacker.getFighterName()} has won!`,"font-size: 3em; color:goldenrod; background:blue; border: 2px solid black;");
        }else{
            let nextAttacker: number;
            if (playerNum==0){
                nextAttacker = 1;
            }else{
                nextAttacker = 0;
            }
            this.meleRound(fighters, nextAttacker);
        }
    }
    determineCombatRoles(activeAttacker: number): CombatRoles{
        //console.log("determine the combat roles");
        let defender: number = 0;
        if(activeAttacker==0){
            defender = 1;
        }
        return {attacker: activeAttacker, defender};
    }
    determineStrikeOutcome(foodWeapon: OffensiveFood, defend: Armor): boolean{
        //console.log("will the strike land?");
        let successRate: number = 0.45;
        if(foodWeapon.foodCat == defend.weakAgainst){
            //console.log(`I am weak against: ${foodWeapon.foodCat}`);
            successRate*=2;
            //console.log(`successRate: ${successRate}`); 
        }
        if(foodWeapon.foodCat == defend.strongAgainst){
           // console.log(`I am strong against: ${foodWeapon.foodCat}`);
            successRate /=2;
            //console.log(`successRate: ${successRate}`); 
        }
        let hitSuccess = Math.random();
        if(hitSuccess>=successRate){
            return true;
        }
        return false;
    }
}
export default Arena;