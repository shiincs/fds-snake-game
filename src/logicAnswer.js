import { ROWS, COLS } from "./config";

// NOTE: ROWS, COLS에는 행의 개수, 열의 개수가 저장되어 있습니다.
// 이 변수를 활용해서 코드를 작성하세요!

// - 설정 파일(config.js)를 편집해 게임 난이도를 바꾸어보세요.

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
  // 키보드를 누르지 않아도 이동할 수 있도록 방향 상태를 저장
  this.direction = "right";
  // 먹이의 좌표
  this.fruit = { x: 3, y: 5 };
}

SnakeGameLogic.prototype.up = function() {
  // 방향 상태 변경
  this.direction = "up";
};

SnakeGameLogic.prototype.down = function() {
  // 방향 상태 변경
  this.direction = "down";
};

SnakeGameLogic.prototype.left = function() {
  // 방향 상태 변경
  this.direction = "left";
};

SnakeGameLogic.prototype.right = function() {
  // 방향 상태 변경
  this.direction = "right";
};

SnakeGameLogic.prototype.nextState = function() {
  console.log(`nextState`);
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  let newHead;
  let newFruit = {};

  if (this.direction === "up") {
    newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y - 1
    };
  } else if (this.direction === "down") {
    newHead = {
      x: this.joints[0].x,
      y: this.joints[0].y + 1
    };
  } else if (this.direction === "right") {
    newHead = {
      x: this.joints[0].x + 1,
      y: this.joints[0].y
    };
  } else if (this.direction === "left") {
    newHead = {
      x: this.joints[0].x - 1,
      y: this.joints[0].y
    };
  }

  // 뱀이 벽에 부딪히거나, 몸통박치기 하면 게임 종료
  if (
    newHead.y >= ROWS ||
    newHead.y < 0 ||
    newHead.x >= COLS ||
    newHead.x < 0 ||
    this.joints.some(joint => joint.x === newHead.x && joint.y === newHead.y)
  ) {
    return false;
  }

  // 과일을 먹을 경우 if문 내부로 진입
  if (newHead.x === this.fruit.x && newHead.y === this.fruit.y) {
    do {  // 과일을 먹었을 경우 우선 새로운 좌표에 과일을 만든다.
      newFruit.x = Math.floor(Math.random() * COLS);
      newFruit.y = Math.floor(Math.random() * ROWS);
      this.fruit = newFruit;
    } while ( // 만약 새로운 과일의 좌표가 뱀 머리의 좌표와 같거나, 뱀의 몸통 중 하나의 좌표와 같을 경우 
              // while문이 true가 되면서 do 구문에 있는 실행문이 실행된다.
      (newFruit.x === newHead.x && newFruit.y === newHead.y) ||
      this.joints.some(
        joint => joint.x === newFruit.x && joint.y === newFruit.y
      )
    );
  } else {  // 과일을 먹지 않았을 경우 꼬리를 뗀다. (과일을 먹는 경우에는 꼬리를 떼지 않는다.)
    this.joints.pop();
  }
  
  // 생성된 머리좌표를 붙인다.
  this.joints.unshift(newHead);
  return true;
};

export default SnakeGameLogic;