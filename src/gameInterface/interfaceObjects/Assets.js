const assets = {
  images: [
    {
      name: 'background',
      file: './assets/background.png',
      isInteractive: false,
      scale: 1,
      origin: 0,
      coordinates: { x: 0, y: 0 }
    },
    {
      name: 'skillButton',
      file: './assets/skill.png',
      scale: 0.5,
      origin: 0.5,
      isInteractive: true,
      coordinates: { x: 314, y: 450 }
    }
  ],
  sprites: [
    {
      name: 'attackButton',
      file: './assets/button_spritesheet.png',
      scale: 1,
      origin: 0.5,
      isInteractive: true,
      coordinates: { x: 185, y: 552 },
      frame: { frameWidth: 232, frameHeight: 228 }
    }
  ]
};

module.exports = assets;
