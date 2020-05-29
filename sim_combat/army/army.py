from characters.character import Character
from characters.chicken import Chicken
from characters.jedi import Jedi
from characters.soldier import Soldier
from characters.spartan import Spartan
from characters.trex import Trex
from characters.clan import Clan
from characters.character_type import CharacterType
from army.army_deploy import ArmyDeploy
from map.map import Map

import math
import random


class Army:

    def __init__(self, army_clan: Clan) -> None:
        self._clan_id = army_clan
        self._deployment = ArmyDeploy.UNDEFINED
        self._army_type = CharacterType.UNDEFINED
        self._size = 0
        self._army = []

    def __str__(self) -> str:
        str_val = str("(%s) Type: %s\n" % (self._clan_id.name, self._army_type.name))
        str_val += str("Deployment strategy: %s\n" % self._deployment.name)
        str_val += str("Size: %d\n" % self._size)
        str_val += str(self._army)
        return str_val

    @property
    def deploy(self) -> ArmyDeploy:
        return self._deployment

    @deploy.setter
    def deploy(self, value: ArmyDeploy) -> None:
        self._deployment = value

    @property
    def army_type(self) -> CharacterType:
        return self._army_type

    @army_type.setter
    def army_type(self, value: CharacterType) -> None:
        self._army_type = value

    @property
    def army(self):
        return self._army

    @property
    def boundingBox(self) -> ((float, float), (float, float)):
        range=self._army[0].range
        get_x = lambda val: int(val.x)
        get_y = lambda val: int(val.y)
        xs = list(map(get_x, self._army))
        ys = list(map(get_y, self._army))
        return (min(xs) - range, min(ys) - range), (max(xs) + range, max(ys) + range)

    def _addElement(self, x: int, y: int) -> None:
        if self._army_type == CharacterType.SOLDIER:
            element = Soldier(x, y)
        elif self._army_type == CharacterType.CHICKEN:
            element = Chicken(x, y)
        elif self._army_type == CharacterType.JEDI_KNIGHT:
            element = Jedi(x, y)
        elif self._army_type == CharacterType.SPARTAN:
            element = Spartan(x, y)
        elif self._army_type == CharacterType.T_REX:
            element = Trex(x, y)
        element.clan = self._clan_id
        self._army.append(element)

    def _overlap(self, cbox: (float, float)) -> bool:
        bbox = self.boundingBox
        l1 = cbox[0]
        r1 = cbox[1]
        l2 = bbox[0]
        r2 = bbox[1]
        # If one rectangle is on left side of other
        if l1[0] >= r2[0] or l2[0] >= r1[0]:
            return False
        # If one rectangle is above other
        if l1[1] >= r2[1] or l2[1] >= r1[1]:
            return False
        return True

    def _deployHorizontal(self):
        min_x = 50
        max_x = Map.getMap().width
        if self._clan_id == Clan.RED:
            min_y = 0
            max_y = Map.getMap().height / 3
        else:
            min_y = (Map.getMap().height / 3) * 2
            max_y = Map.getMap().height
        pos_x = min_x + 1
        pos_y = min_y + 1
        for p in range(self._size):
            self._addElement(pos_x, pos_y)
            pos_x += 1
            if pos_x == max_x - 1:
                pos_x = min_x + 1
                pos_y += 1
    def _deploySquare(self):
        min_x = 50
        max_x = Map.getMap().width
        if self._clan_id == Clan.RED:
            min_y = 0
            max_y = Map.getMap().height / 3
        else:
            min_y = (Map.getMap().height / 3) * 2
            max_y = Map.getMap().height
        pos_x = min_x + 1
        pos_y = min_y + 1
        for p in range(self._size):
            self._addElement(pos_x, pos_y)
            pos_x += 1
            if pos_x == self._size/2:
                pos_x = min_x + 1
                pos_y += 1
    def _deployDiagonal(self):
        min_x = 50
        max_x = Map.getMap().width
        if self._clan_id == Clan.RED:
            min_y = 0
            max_y = Map.getMap().height / 3
        else:
            min_y = (Map.getMap().height / 3) * 2
            max_y = Map.getMap().height
        pos_x = min_x + 1
        pos_y = min_y + 1
        for p in range(self._size):
            self._addElement(pos_x, pos_y)
            pos_x += 1
            if pos_x > 1:
                pos_x += 1
                pos_y += 1
                if pos_y>Map.getMap().height or pos_y<0:
                    pos_y=min_y
                elif pos_x>Map.getMap().width or pos_x<0:
                    pos_x=min_x

    def _deployRandom(self):
        min_x = 50
        max_x = Map.getMap().width
        if self._clan_id == Clan.RED:
            min_y = 0
            max_y = Map.getMap().height / 3
        else:
            min_y = (Map.getMap().height / 3) * 2
            max_y = Map.getMap().height
        pos_x = min_x + 1
        pos_y = min_y + 1
        for p in range(self._size):
            self._addElement(pos_x, pos_y)
            pos_x += 1
            rand = random.randint(1, 5)
            randGrand = random.randint(25, 50)
            if pos_x > randGrand:
                pos_x = rand
                pos_y += rand

    def _deployVertical(self):
        min_y = 50
        max_y = Map.getMap().height
        if self._clan_id == Clan.RED:
            min_x = 0
            max_x = Map.getMap().width / 3
        else:
            min_x = (Map.getMap().width / 3) * 2
            max_x = Map.getMap().width
        pos_x = min_x + 1
        pos_y = min_y + 1
        for p in range(self._size):
            self._addElement(pos_x, pos_y)
            pos_y += 1
            if pos_y == max_y - 1:
                pos_y = min_y + 1
                pos_x += 1

    def _move(self, enemy) -> None:
        # Obtain the target coordinate
        e_center = enemy.getCenter()
        s_center = self.getCenter()
        # Get the direction. Produce the direction vector by subtracting the current location of my element
        #  minus the center of the enemy => Vg(x, y)
        Vg = (e_center[0] - s_center[0], e_center[1] - s_center[1])
        # Get the magnitude of the direction vector => sqrt(x^2 + y^2) = Mag
        Mag = math.sqrt(Vg[0] ** 2 + Vg[1] ** 2)
        # Get the meaning of 1 unit moved on the vector => Vm(x/Mag, y/Mag)
        Vm = (Vg[0] / Mag, Vg[1] / Mag)
        # Update the movement of the character
        arr = [x.move(Vm) for x in self._army]

    def getCenter(self) -> (float, float):
        avg_x = 0
        avg_y = 0
        for x in range(self._size):
            avg_x += self._army[x].x
            avg_y += self._army[x].y
        return (avg_x / self._size), (avg_y / self._size)

    def getHealthState(self) -> (float):
        counter=0
        for x in range(self._size):
            if self._army[x].health==0:
                counter=counter+1
        return (counter)

    def createArmy(self, size: int) -> None:
        self._size = size
        self._army = []
        # TODO: create the mechanism to define the deploy shape of the army
        if self._deployment == ArmyDeploy.HORIZONTAL:
            self._deployHorizontal()
        elif self._deployment == ArmyDeploy.VERTICAL:
            self._deployVertical()
        elif self._deployment == ArmyDeploy.UP_DIAGONAL:
            self._deployDiagonal()
        elif self._deployment == ArmyDeploy.DOWN_DIAGONAL:
            pass
        elif self._deployment == ArmyDeploy.RADIAL:
            pass
        elif self._deployment == ArmyDeploy.SQUARE:
            self._deploySquare()
        elif self._deployment == ArmyDeploy.TRIANGLE:
            pass
        elif self._deployment == ArmyDeploy.RANDOM:
            self._deployRandom()
        else:  # Random
            pass
        pass

    def step(self, enemy) -> None:
        if self._overlap(enemy.boundingBox):
            #enemy._army.pop(1)
            for x in range(self._size):
                distance=99999
                distInd=-1
                selfX = self._army[x].x
                selfY = self._army[x].y
                for y in range(enemy._size):
                    if enemy._army[y].alive:
                        enemyX=enemy._army[y].x
                        enemyY=enemy._army[y].y
                        currDistance= math.sqrt((enemyX - selfX)**2 + (enemyY - selfY)**2)

                        if currDistance > distance:
                            distance=currDistance
                            distInd=y
                        if currDistance <= self._army[0].range:
                            enemy._army[y].health = enemy._army[y].health - (
                                        (self._army[x].damage ) / enemy._army[y].protection)
                e_center = (enemy._army[distInd].x, enemy._army[distInd].y)
                s_center = (selfX, selfY)
                Vg = (e_center[0] - s_center[0], e_center[1] - s_center[1])
                Mag = math.sqrt(Vg[0] ** 2 + Vg[1] ** 2)
                Vm = (Vg[0] / Mag, Vg[1] / Mag)
                self._army[x].move(Vm)






        else:
            self._move(enemy)
