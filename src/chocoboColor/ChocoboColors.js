export const CHOCOBO_COLORS = {
  'Snow White': [228, 223, 208],
  'Ash Grey': [172, 168, 162],
  'Goobbue Grey': [137, 135, 132],
  'Slate Grey': [101, 101, 101],
  'Charcoal Grey': [72, 71, 66],
  'Soot Black': [43, 41, 35],
  'Rose Pink': [230, 159, 150],
  'Lilac Purple': [131, 105, 105],
  'Rolanberry Red': [91, 23, 41],
  'Dalamud Red': [120, 26, 26],
  'Rust Red': [98, 34, 7],
  'Wine Red': [69, 21, 17],
  'Coral Pink': [204, 108, 94],
  'Blood Red': [145, 59, 48],
  'Salmon Pink': [228, 170, 138],
  'Sunset Orange': [183, 92, 45],
  'Mesa Red': [125, 57, 6],
  'Bark Brown': [106, 75, 55],
  'Chocolate Brown': [110, 61, 36],
  'Russet Brown': [79, 45, 31],
  'Kobold Brown': [48, 33, 27],
  'Cork Brown': [201, 145, 86],
  'Qiqirn Brown': [153, 110, 63],
  'Opo-Opo Brown': [123, 92, 45],
  'Aldgoat Brown': [162, 135, 92],
  'Pumpkin Orange': [197, 116, 36],
  'Acorn Brown': [142, 88, 27],
  'Orchard Brown': [100, 66, 22],
  'Chestnut Brown': [61, 41, 13],
  'Gobbiebag Brown': [185, 164, 137],
  'Shale Brown': [146, 129, 108],
  'Mole Brown': [97, 82, 69],
  'Loam Brown': [63, 51, 41],
  'Bone White': [235, 211, 160],
  'Ul Brown': [183, 163, 112],
  'Desert Yellow': [219, 180, 87],
  'Honey Yellow': [250, 198, 43],
  'Millioncorn Yellow': [228, 158, 52],
  'Coeurl Yellow': [188, 136, 4],
  'Cream Yellow': [242, 215, 112],
  'Halatali Yellow': [165, 132, 48],
  'Raisin Brown': [64, 51, 17],
  'Mud Green': [88, 82, 48],
  'Sylph Green': [187, 187, 138],
  'Lime Green': [171, 176, 84],
  'Moss Green': [112, 115, 38],
  'Meadow Green': [139, 156, 99],
  'Olive Green': [75, 82, 50],
  'Marsh Green': [50, 54, 33],
  'Apple Green': [149, 174, 92],
  'Cactuar Green': [101, 130, 65],
  'Hunter Green': [40, 75, 38],
  'Ochu Green': [64, 99, 57],
  'Adamantoise Green': [95, 117, 88],
  'Nophica Green': [59, 77, 60],
  'Deepwood Green': [30, 42, 33],
  'Celeste Green': [150, 189, 185],
  'Turquoise Green': [67, 114, 144],
  'Morbol Green': [31, 70, 70],
  'Ice Blue': [178, 196, 206],
  'Sky Blue': [131, 176, 210],
  'Seafog Blue': [100, 129, 160],
  'Peacock Blue': [59, 104, 134],
  'Rhotano Blue': [28, 61, 84],
  'Corpse Blue': [142, 155, 172],
  'Ceruleam Blue': [79, 87, 102],
  'Woad Blue': [47, 56, 81],
  'Ink Blue': [26, 31, 39],
  'Raptor Blue': [91, 127, 192],
  'Othard Blue': [47, 88, 137],
  'Storm Blue': [35, 65, 114],
  'Void Blue': [17, 41, 68],
  'Royal Blue': [39, 48, 103],
  'Midnight Blue': [24, 25, 55],
  'Shadow Blue': [55, 55, 71],
  'Abyssal Blue': [49, 45, 87],
  'Lavender Purple': [135, 127, 174],
  'Gloom Purple': [81, 69, 96],
  'Currant Purple': [50, 44, 59],
  'Iris Purple': [183, 158, 188],
  'Grape Purple': [59, 42, 61],
  'Lotus Pink': [254, 206, 245],
  'Colibri Pink': [220, 155, 202],
  'Plum Purple': [121, 82, 108],
  'Regal Purple': [102, 48, 78],
};

export const CHOCOBO_FRUITS = {
  'Xelphatol Apple': fruitFunctionBuilder(5, -5, -5),
  'Mamook Pear': fruitFunctionBuilder(-5, 5, -5),
  "O'Ghomoro Berries": fruitFunctionBuilder(-5, -5, 5),
  'Doman Plum': fruitFunctionBuilder(-5, 5, 5),
  Valfruit: fruitFunctionBuilder(5, -5, 5),
  'Cieldalaes Pineapple': fruitFunctionBuilder(5, 5, -5),
  'Han Lemon': (color) => CHOCOBO_COLORS['Desert Yellow'],
};

export function fruitFunctionBuilder(rMod, gMod, bMod) {
  return (color) => {
    return [color[0] + rMod, color[1] + gMod, color[2] + bMod].map((x) =>
      Math.min(Math.max(x, 0), 255)
    );
  };
}

export function createStyleColor(colorValue) {
  return `rgb(${colorValue.join(',')})`;
}

export function RGBtoHSV(colorValue) {
  const [r, g, b] = colorValue.map((x) => x / 255);
  const maxAll = Math.max(r, g, b);
  const minAll = Math.min(r, g, b);
  const scope = maxAll - minAll;

  let hue;
  if (r === maxAll) {
    hue = (g - b) / scope;
  } else if (g === maxAll) {
    hue = 2 + (b - r) / scope;
  } else {
    hue = 4 + (r - g) / scope;
  }
  hue = (hue * 60) / 360;
  while (hue < 0) {
    hue += 1;
  }

  const saturation = scope;
  const value = maxAll;

  return [isNaN(hue) ? 0 : hue, Math.min(saturation, 1), value];
}

export function HSVtoRGB(hsv) {
  const [hue, saturation, value] = hsv;

  const h2 = ((hue * 360) % 360) / 60;
  const c = saturation * value;
  const x = c * (1 - Math.abs((h2 % 2) - 1));
  const m = value - c;

  let r, g, b;
  if (h2 < 1) {
    r = c;
    g = x;
    b = 0;
  } else if (h2 < 2) {
    r = x;
    g = c;
    b = 0;
  } else if (h2 < 3) {
    r = 0;
    g = c;
    b = x;
  } else if (h2 < 4) {
    r = 0;
    g = x;
    b = c;
  } else if (h2 < 5) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return [r, g, b].map((x) => parseInt((x + m) * 255));
}

export function getContrastingColor(colorValue) {
  const hsv = RGBtoHSV(colorValue);
  const valueDist = 0.5;
  return HSVtoRGB([
    hsv[0],
    hsv[1],
    Math.min(
      Math.max(hsv[2] > 0.5 ? hsv[2] - valueDist : hsv[2] + valueDist, 0),
      1
    ),
  ]);
}
