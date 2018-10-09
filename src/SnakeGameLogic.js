import {ROWS, COLS} from './config';

// NOTE: ROWS, COLS에는 행의 개수, 열의 개수가 저장되어 있습니다.
// 이 변수를 활용해서 코드를 작성하세요!

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [
    // {x: 5, y: 0},
    // {x: 4, y: 0},
    // {x: 3, y: 0},
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0},
  ];

  // 먹이의 좌표
  this.fruit = {x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS)};

  // 현재 방향 상태
  this.direction = 'right'
}

SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  console.log('up');
  this.direction = 'up'
}

SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');
  this.direction = 'down'
}

SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');
  this.direction = 'left'
}

SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');
  this.direction = 'right'
}

SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  // console.log(`nextState`);
  
  // 움직임 조작 + 자동 움직임 + 진행방향 반대 움직임 시 게임 종료
  const pop = this.joints.pop()
  if(this.direction === 'right') {
    pop.x = this.joints[0].x + 1
    pop.y = this.joints[0].y
    
    // 몸통 박치기 하면 게임 종료
    if(this.joints.some(joint => joint.x === pop.x && joint.y === pop.y)) {
      return false
    } else {
      this.joints.unshift(pop)
    }
  } else if(this.direction === 'left') {
      pop.x = this.joints[0].x - 1
      pop.y = this.joints[0].y

      // 몸통 박치기 하면 게임 종료
      if(this.joints.some(joint => joint.x === pop.x && joint.y === pop.y)) {
        return false
      } else {
        this.joints.unshift(pop)
      }      
  } else if(this.direction === 'up') {
      pop.x = this.joints[0].x
      pop.y = this.joints[0].y - 1

      // 몸통 박치기 하면 게임 종료
      if(this.joints.some(joint => joint.x === pop.x && joint.y === pop.y)) {
        return false
      } else {
        this.joints.unshift(pop)
      }
  } else if(this.direction === 'down') {
      pop.x = this.joints[0].x
      pop.y = this.joints[0].y + 1

      // 몸통 박치기 하면 게임 종료
      if(this.joints.some(joint => joint.x === pop.x && joint.y === pop.y)) {
        return false
      } else {
        this.joints.unshift(pop)
      }
  }

  // 벽에 부딪히면 게임 끝남
  if(this.joints[0].x < 0 || this.joints[0].x >= COLS) {
    return false
  } else if(this.joints[0].y < 0 || this.joints[0].y >= ROWS) {
    return false
  }

  // 과일 먹으면 길이 늘어나고 과일 위치 바뀜
  if((this.joints[0].x === this.fruit.x) && (this.joints[0].y === this.fruit.y)) {
    console.log('Get Fruit!')
    // 과일 위치 랜덤하게 바뀜
    this.fruit = {x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS)}
    // 과일 먹으면 길이 늘어남
    if(this.direction === 'up') {
      this.joints.unshift({x: this.joints[0].x, y: this.joints[0].y - 1})
    } else if(this.direction === 'down') {
      this.joints.unshift({x: this.joints[0].x, y: this.joints[0].y + 1})
    } else if(this.direction === 'left') {
      this.joints.unshift({x: this.joints[0].x - 1, y: this.joints[0].y})
    } else if(this.direction === 'right') {
      this.joints.unshift({x: this.joints[0].x + 1, y: this.joints[0].y})
    }
  }

  return true;
}

export default SnakeGameLogic;
