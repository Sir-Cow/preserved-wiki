---
description: An Angling Table is a block used to add and remove fishing rod parts from fishing rods.

hide:
  - footer

social_image: https://sir-cow.github.io/preserved-wiki/img/inferno/angling_table.png
---

{% from "includes/block_info.md" import block_info with context %}

# Angling Table

---

An Angling Table is a block used to add and remove fishing rod parts from fishing rods.

{{ block_info(
    name="Angling Table",
    image="../../img/inferno/angling_table.png",
    renewable="Yes",
    stackable="Yes (64)",
    tool="Axe",
    blast_resistance="3",
    hardness="2.5",
    luminous="No",
    transparent="No",
    flammable="Yes",
    catches_fire_from_lava="Yes",
    map_color="28 COLOR_RED",
    note_block_instrument="Bass"
) }}

## Obtaining

---

### Breaking

Angling tables can be mined by hand or with any tool, but axes are the quickest.

| Block    | Angling Table |
| -------- | :-----------: |
| Hardness | 2.5           |
| Tool     | Axe           |

### Crafting

![Angling Table Recipe](../img/inferno/angling_table_recipe.png){ width="300" }

## Usage

---

### Fishing Rod Parts

When used, an interface is displayed with four kinds of input slots. Only one slot is interactable when there is no fishing rod inserted. When there is a fishing rod in the angling table, the player may attach or remove a fishing hook, fishing line, or sinker on the fishing rod.

### Fuel

Angling tables can be used as fuel in furnaces to burn for 300 ticks.

## History

---

| Version     | Change                |
| ----------- | --------------------- |
| alpha-0.6.0 | Added angling tables. |
