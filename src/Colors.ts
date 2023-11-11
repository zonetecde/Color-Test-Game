export class Color {
  /**
   * The color code
   */
  hexCode: string;

  /**
   * The inverse color
   */
  invertHex: string;

  /**
   * The color name
   */
  name: string;

  constructor(hexCode: string, name: string, invertHex: string) {
    this.hexCode = hexCode;
    this.name = name;
    this.invertHex = invertHex;
  }
}

const colors = [
  new Color('#ff0008', 'rouge', '#00FFFF'),
  new Color('#008000', 'vert', '#f5c1d5'),
  new Color('#0000FF', 'bleu', '#eda1b9'),
  new Color('#FFFF00', 'jaune', '#0000FF'),
  new Color('#840bb0', 'violet', '#edd81a'),
  new Color('#ff8cc8', 'rose', '#143d1c'),
  new Color('#FFA500', 'orange', '#005AFF'),
  new Color('#000000', 'noir', '#FFFFFF'),
  new Color('#FFFFFF', 'blanc', '#000000'),
  new Color('#A52A2A', 'brun', '#93c4f5'),
  new Color('#808080', 'gris', '#ffffff'),
];

export const getRandomColor = (oldColor: Color): Color => {
  const _colors = colors.filter(x => x.hexCode !== oldColor.hexCode);
  return _colors[Math.floor(Math.random() * _colors.length)];
};

/**
 * Get 3 random propositions for the color to guess
 * @param color  The color that needs to be guessed
 * @returns 4 random propositions (3 wrong + 1 correct)
 */
export const getRandomPropositions = (
  color: Color,
  oldPropositions: Color[],
): Color[] => {
  let colorsShuffle = colors.sort(() => Math.random() - 0.5); // Shuffle the colors
  colorsShuffle = colorsShuffle.filter(
    c =>
      c.hexCode !== color.hexCode &&
      oldPropositions.some(x => x.hexCode === c.hexCode) === false,
  ); // Remove the color to guess from the propositions
  let propositions = colorsShuffle.slice(0, 3); // Get 3 random propositions
  propositions.push(color); // Add the color to guess
  propositions = propositions.sort(() => Math.random() - 0.5); // Shuffle the propositions
  return propositions;
};
