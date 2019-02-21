import DigiPet from './DigiPet';
import CombatRoles from './CombatRoles';
import Armor from './Armor';
import OffensiveFood from './OffensiveFood';

interface FightClub{
    fighter1: DigiPet;
    fighter2: DigiPet;
    fighters: DigiPet[];
    initMatch(): void;
    determineFirstFighter(): number;
    meleRound(fighters: DigiPet[], playerNum: number): void;
    determineCombatRoles(activeAttacker: number): CombatRoles;
    determineStrikeOutcome(foodWeapon: OffensiveFood, defend: Armor): boolean;
}
export default FightClub;