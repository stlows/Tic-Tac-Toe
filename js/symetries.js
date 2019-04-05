var symetries = {
  n: symetryN,
  x: symetryX,
  y: symetryY,
  xy: symetryXY,
  d: symetryD,
  dx: symetryDX,
  dy: symetryDY,
  dxy: symetryDXY
};
var inverseSymetries = {
  n: symetryN,
  x: symetryX,
  y: symetryY,
  xy: symetryXY,
  d: symetryD,
  dx: symetryXD,
  dy: symetryYD,
  dxy: symetryXYD
};
function symetryN(i, j) {
  return { i: i, j: j };
}
function symetryX(i, j) {
  switch (j) {
    case 0:
      return { i: i, j: 2 };
    case 1:
      return { i: i, j: 1 };
    case 2:
      return { i: i, j: 0 };
  }
}
function symetryY(i, j) {
  switch (i) {
    case 0:
      return { i: 2, j: j };
    case 1:
      return { i: 1, j: j };
    case 2:
      return { i: 0, j: j };
  }
}
function symetryXY(i, j) {
  var symX = symetryX(i, j);
  return symetryY(symX.i, symX.j);
}
function symetryD(i, j) {
  return { i: j, j: i };
}
function symetryDX(i, j) {
  var symD = symetryD(i, j);
  return symetryX(symD.i, symD.j);
}
function symetryXD(i, j) {
  var symX = symetryX(i, j);
  return symetryD(symX.i, symX.j);
}
function symetryDY(i, j) {
  var symD = symetryD(i, j);
  return symetryY(symD.i, symD.j);
}
function symetryYD(i, j) {
  var symY = symetryY(i, j);
  return symetryD(symY.i, symY.j);
}
function symetryDXY(i, j) {
  var symD = symetryD(i, j);
  return symetryXY(symD.i, symD.j);
}
function symetryXYD(i, j) {
  var symXY = symetryXY(i, j);
  return symetryD(symXY.i, symXY.j);
}
