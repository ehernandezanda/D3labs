
from terrain.terrain_type import *
from characters.soldier import Soldier
from characters.jedi import Jedi
from characters.clan import Clan
from army.army import Army
from map.map import Map
from map.field import *
from characters.character_type import CharacterType
from army.army_deploy import ArmyDeploy

m = Map(400, 400)
m.assign_type(TerrainType.FOREST)
# print(m)

deploy = ArmyDeploy.VERTICAL
deploy2 = ArmyDeploy.HORIZONTAL
deploy3 = ArmyDeploy.SQUARE
deploy4= ArmyDeploy.RANDOM
deploy5= ArmyDeploy.UP_DIAGONAL
size = 200

a = Army(Clan.BLUE)
a.army_type = CharacterType.SOLDIER
# a.deploy = ArmyDeploy.HORIZONTAL
a.deploy = deploy4
a.createArmy(size)

b = Army(Clan.RED)
b.army_type = CharacterType.SOLDIER
b.deploy = deploy3
b.createArmy(size)

launch(m, a, b)


