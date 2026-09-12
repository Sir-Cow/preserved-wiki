---
description: Sparkling Blackstone is a fragile block found in bastion remnants that matures over time.

hide:
  - footer

social_image: https://sir-cow.github.io/preserved-wiki/img/inferno/sparkling_blackstone.gif
---

{% from "includes/block_info.md" import block_info with context %}

# Sparkling Blackstone

---

Sparkling Blackstone is a fragile block found in bastion remnants that matures over time. It drops nothing if broken at its first stage, but will drop increasing amounts of gold nuggets as it matures. It cannot be moved from where it is found.

{{ block_info(
    name="Sparkling Blackstone",
    image="../../img/inferno/sparkling_blackstone.gif",
    renewable="No",
    stackable="Yes (64)",
    tool="Pickaxe",
    blast_resistance="6",
    hardness="1.5",
    luminous="No",
    transparent="No",
    flammable="No",
    catches_fire_from_lava="No",
    map_color="18 COLOR_YELLOW",
    note_block_instrument="Bass drum"
) }}

## Obtaining

---

Sparkling blackstone can only be obtained via the Creative inventory or with commands.

It is unobtainable in Survival; using a tool enchanted with Silk Touch does not drop anything at its first stage.

### Breaking

The suitable tool to break sparkling blackstone is a pickaxe. Breaking sparkling blackstone will reduce its maturity stage by 1 and drop gold nuggets unless it is at stage 0, in which it will break and drop nothing.

| Block    | Rhyolite |
| -------- | :------: |
| Hardness | 1.5      |
| Tool     | Pickaxe  |

### Natural Generation

Sparkling blackstone generates naturally as part of bastion remnants, replacing some of the hidden gold blocks.

## Usage

---

### Maturing Gold

A sparkling blackstone goes through 4 stages of maturity before reaching its 5th and final growth stage where it drops the most gold nuggets when mined. Breaking it at other maturity stages will also drop varying amounts of gold nuggets depending on the stage unless it is at stage 0, in which it will break and drop nothing.

| Stage | Gold Nuggets |
| ----- | :----------: |
| 0     | Block breaks |
| 1     | 2            |
| 2     | 4            |
| 3     | 8            |
| 4     | 16           |

### Piston Interactivity

Sparkling blackstone is destroyed when pushed by a piston. It cannot be pulled by a sticky piston, or honey and slime blocks.

## History

---

| Version    | Change                                               |
| ---------- | -----------------------------------------------------|
| beta-1.4.0 | Added sparkling blackstone.                          |
| beta-1.4.3 | Doubled gold nugget drops from sparkling blackstone. |
