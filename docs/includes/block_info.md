{% macro block_info(
    name,
    image,
    renewable,
    stackable,
    tool,
    blast_resistance,
    hardness,
    luminous,
    transparent,
    flammable,
    catches_fire_from_lava,
    map_color,
    note_block_instrument
) %}
<div style="float: right; width: 300px; margin-left: 20px;">

<table>
<tr>
<th colspan="2"><center>{{ name }}</center></th>
</tr>

<tr>
<td colspan="2" align="center">
<img src="{{ image }}" alt="{{ name }}" width="200">
</td>
</tr>

<tr>
<th align="left">Renewable</th>
<td>{{ renewable }}</td>
</tr>

<tr>
<th align="left">Stackable</th>
<td>{{ stackable }}</td>
</tr>

<tr>
<th align="left">Tool</th>
<td>{{ tool }}</td>
</tr>

<tr>
<th align="left">Blast resistance</th>
<td>{{ blast_resistance }}</td>
</tr>

<tr>
<th align="left">Hardness</th>
<td>{{ hardness }}</td>
</tr>

<tr>
<th align="left">Luminous</th>
<td>{{ luminous }}</td>
</tr>

<tr>
<th align="left">Transparent</th>
<td>{{ transparent }}</td>
</tr>

<tr>
<th align="left">Flammable</th>
<td>{{ flammable }}</td>
</tr>

<tr>
<th align="left">Catches fire from lava</th>
<td>{{ catches_fire_from_lava }}</td>
</tr>

<tr>
<th align="left">Map color</th>
<td>{{ map_color }}</td>
</tr>

<tr>
<th align="left">Note block instrument</th>
<td>{{ note_block_instrument }}</td>
</tr>

</table>

</div>
{% endmacro %}
