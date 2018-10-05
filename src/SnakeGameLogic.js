import {ROWS, COLS} from './config';

// NOTE: ROWS, COLS에는 행의 개수, 열의 개수가 저장되어 있습니다.
// 이 변수를 활용해서 코드를 작성하세요!

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [
    {x: 5, y: 0},
    {x: 4, y: 0},
    {x: 3, y: 0},
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0},
  ];

  // 먹이의 좌표
  this.fruit = {x: 3, y: 5};
}

SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  console.log('up');
  console.log(this.joints[0])
  console.log(this.joints[1])
  console.log(this.joints[2])
}

SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');

  const pop = this.joints.pop()
  pop.x = this.joints[0].x
  pop.y = this.joints[0].y + 1
  this.joints.unshift(pop)

  
  console.log(this.joints[0])
  console.log(this.joints[1])
  console.log(this.joints[2])
}

SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');

  const pop = this.joints.shift()
  pop.x = this.joints[this.joints.length-1].x - 1
  pop.y = this.joints[0].y
  this.joints.push(pop);

  
  console.log(this.joints[0])
  console.log(this.joints[1])
  console.log(this.joints[2])
}

SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');

  const pop = this.joints.pop()
  pop.x = this.joints[0].x + 1
  pop.y = this.joints[0].y
  this.joints.unshift(pop);

  
  console.log(this.joints[0])
  console.log(this.joints[1])
  console.log(this.joints[2])
}

SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  // console.log(`nextState`);
  if(this.joints[0].x < 0 || this.joints[0].x >= COLS) {
    return false
  } else if(this.joints[0].y < 0 || this.joints[0].y >= ROWS) {
    return false
  }

  return true;
}

export default SnakeGameLogic;
