const tags = {
  // Existing tags...
  "FPS": { color: "red-600" },
  "Text": { color: "sky-500" },
  "Code": { color: "green-600" },
  "Movie": { color: "amber-500" },
  "Object": { color: "fuchsia-700" },
  "Sound": { color: "purple-600" },
  "Classic": { color: "indigo-500" },
  
  // New gaming-related tags
  "RPG": { color: "blue-600" },
  "Adventure": { color: "emerald-600" },
  "Strategy": { color: "orange-600" },
  "Horror": { color: "stone-800" },
  "Game": { color: "emerald-500" },
  
  // New media-related tags
  "Animation": { color: "pink-500" },
  "SciFi": { color: "cyan-600" },
  "Fantasy": { color: "violet-600" },
  "Reference": { color: "yellow-600" },
  "Character": { color: "rose-600" },
  "Location": { color: "teal-600" },
  
  // Meta tags
  "Hidden": { color: "gray-600" },
  "Secret": { color: "red-800" },
  "Crossover": { color: "lime-600" },
  "Breaking4thWall": { color: "amber-800" }
};

// Generate Tailwind safelist comment
const tailwindClasses = Object.values(tags)
  .map(tag => `bg-${tag.color} border-${tag.color}`)
  .join(' ');

module.exports = {
  tags,
  // Use this in your CSS build process or add to your template
  tailwindSafelist: `/* ${tailwindClasses} */`
};
