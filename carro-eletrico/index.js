const MAXN = 1000;

const points = [];
const adj = new Array(MAXN);
const visited = new Array(MAXN);

//function
function dist(p1, p2) {
  return 100 * (Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y));
}

function dfs(s) {
  visited[s] = true;
  for (let i = 0; i < adj[s].length; i++) {
    let v = adj[s][i];
    if (!visited[v]) {
      dfs(v);
    }
  }
}

//input
const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

const arrayLine = input.split('\n');

let line;

line = arrayLine[0].split(' ');

let x = line[0], y = line[1];

line = arrayLine[1].split(' ');

let n = line[0], a = line[1];

for (let i = 0; i < n; i++) {
  line = arrayLine[2 + i].split(' ');
  points.push({ x: line[0], y: line[1] });
}
//end input

for (let i = 0; i < n; i++) adj[i] = [];

for (let i = 0; i < n - 1; i++) {
  for (let j = i + 1; j < n; j++) {
    if (dist(points[i], points[j]) <= a) {
      adj[i].push(j);
      adj[j].push(i);
    }
  }
}

let ans = 0;

for (let i = 0; i < n; i++) visited[i] = false;

for (let i = 0; i < n; i++) {
  if (!visited[i]) {
    dfs(i);
    ans++;
  }
}

console.log(ans - 1);