import DigiPet from './DigiPet';
import Armor from './Armor';
import OffensiveFood from './OffensiveFood';

class FighterA implements DigiPet{
    tamName: string;
    hp: number;
    defenseCharacteristics: Armor = {strongAgainst: "fruit", weakAgainst:"meat"};
    foods: OffensiveFood[];
    constructor(tamName: string){
        this.tamName = tamName;
        this.hp = 60;
        console.log(`my name is ${this.tamName}`);
        this.foods = [
            {foodName:"bananas", foodCat:"fruit", damage:4},
            {foodName:"beef stroganoff", foodCat:"meat", damage:12},
            {foodName:"rice", foodCat:"grain", damage:1},
        ]
    }
    public getFighterName(): string{
        return this.tamName;
    }
    defend(): Armor{
        return this.defenseCharacteristics;
    }
    attack(): OffensiveFood{
        let foodNum = Math.floor(Math.random()*this.foods.length);
        return this.foods[foodNum];
    }
    takeDamage(damage: number): void{
        this.hp -= damage;
        //console.log("taken damage");
        //console.log(this.hp);
    }
    public getHP(): number{
        return this.hp;
    }
}
export default FighterA;