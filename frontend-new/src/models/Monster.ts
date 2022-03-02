export interface Welcome {
    name?:                   string;
    size?:                   string;
    type?:                   string;
    subtype?:                string;
    alignment?:              string;
    armor_class?:            number;
    hit_points?:             number;
    hit_dice?:               string;
    speed?:                  string;
    strength?:               number;
    dexterity?:              number;
    constitution?:           number;
    intelligence?:           number;
    wisdom?:                 number;
    charisma?:               number;
    constitution_save?:      number;
    intelligence_save?:      number;
    wisdom_save?:            number;
    history?:                number;
    perception?:             number;
    damage_vulnerabilities?: string;
    damage_resistances?:     string;
    damage_immunities?:      string;
    condition_immunities?:   string;
    senses?:                 string;
    languages?:              string;
    challenge_rating?:       string;
    special_abilities?:      Action[];
    actions?:                Action[];
    legendary_actions?:      Action[];
    medicine?:               number;
    religion?:               number;
    dexterity_save?:         number;
    charisma_save?:          number;
    stealth?:                number;
    persuasion?:             number;
    insight?:                number;
    deception?:              number;
    arcana?:                 number;
    athletics?:              number;
    acrobatics?:             number;
    strength_save?:          number;
    reactions?:              Action[];
    survival?:               number;
    investigation?:          number;
    nature?:                 number;
    intimidation?:           number;
    performance?:            number;
    license?:                string[];
}

export interface Action {
    name:          string;
    desc:          string;
    attack_bonus:  number;
    damage_dice?:  string;
    damage_bonus?: number;
}

export enum Alignment {
    AnyAlignment = "any alignment",
    AnyChaoticAlignment = "any chaotic alignment",
    AnyEvilAlignment = "any evil alignment",
    AnyNonGoodAlignment = "any non-good alignment",
    AnyNonLawfulAlignment = "any non-lawful alignment",
    ChaoticEvil = "chaotic evil",
    ChaoticGood = "chaotic good",
    ChaoticNeutral = "chaotic neutral",
    LawfulEvil = "lawful evil",
    LawfulGood = "lawful good",
    LawfulNeutral = "lawful neutral",
    Neutral = "neutral",
    NeutralEvil = "neutral evil",
    NeutralGood = "neutral good",
    NeutralGood50OrNeutralEvil50 = "neutral good (50%) or neutral evil (50%)",
    Unaligned = "unaligned",
}

export enum DamageVulnerabilities {
    Bludgeoning = "bludgeoning",
    BludgeoningFire = "bludgeoning, fire",
    Cold = "cold",
    Empty = "",
    Fire = "fire",
    PiercingFromMagicWeaponsWieldedByGoodCreatures = "piercing from magic weapons wielded by good creatures",
    Radiant = "radiant",
    Thunder = "thunder",
}

export enum Size {
    Gargantuan = "Gargantuan",
    Huge = "Huge",
    Large = "Large",
    Medium = "Medium",
    Small = "Small",
    Tiny = "Tiny",
}

export enum Subtype {
    AnyRace = "any race",
    Demon = "demon",
    Devil = "devil",
    Dwarf = "dwarf",
    ELF = "elf",
    Empty = "",
    Gnoll = "gnoll",
    Gnome = "gnome",
    Goblinoid = "goblinoid",
    Grimlock = "grimlock",
    Human = "human",
    Kobold = "kobold",
    Lizardfolk = "lizardfolk",
    Merfolk = "merfolk",
    Orc = "orc",
    Sahuagin = "sahuagin",
    Shapechanger = "shapechanger",
    Titan = "titan",
}

export enum Type {
    Aberration = "aberration",
    Beast = "beast",
    Celestial = "celestial",
    Construct = "construct",
    Dragon = "dragon",
    Elemental = "elemental",
    Fey = "fey",
    Fiend = "fiend",
    Giant = "giant",
    Humanoid = "humanoid",
    Monstrosity = "monstrosity",
    Ooze = "ooze",
    Plant = "plant",
    SwarmOfTinyBeasts = "swarm of Tiny beasts",
    Undead = "undead",
}
