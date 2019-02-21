import OffensiveFood from './OffensiveFood';
import Armor from './Armor';


interface DigiPet{
    tamName: string;
    hp: number;
    foods: OffensiveFood[];
    defend(): Armor;
    attack(): OffensiveFood;
    takeDamage(damage: number): void;
    getHP(): number;
    getFighterName(): string;
}
export default DigiPet;