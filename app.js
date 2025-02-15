const express = require('express');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const { marked } = require('marked');
const { tags } = require('./config/tags');

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
  smartLists: true,
  smartypants: true
});

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files in the public_html directory
app.use(express.static('/home/cp1749670p06/public_html/0451.eu'));

// Serve static files in the src directory (for output.css)
app.use(express.static(path.join(__dirname, 'src')));

// Serve static files in the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Add this function to read all markdown files
function getAllPages() {
  const pagesDir = path.join(__dirname, 'content', 'pages');
  const files = fs.readdirSync(pagesDir);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
      const { data } = matter(content);
      // Ensure we're working with tag names (strings), not objects
      const tagNames = data.tags.map(tag => typeof tag === 'object' ? tag.name : tag);
      // Enhance tags with their definitions
      const enhancedTags = tagNames.map(tagName => ({
        name: tagName,
        ...tags[tagName]
      }));
      
      return {
        title: data.title,
        slug: file.replace('.md', ''),
        description: data.description,
        image: data.image,
        type: data.type,
        tags: enhancedTags
      };
    });
}

// Define routes
app.get('/', (req, res) => {
  const cards = getAllPages();
  res.render('index', { cards });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/details/:title', (req, res) => {
  try {
    console.log('Requested title:', req.params.title);
    const filePath = path.join(__dirname, 'content', 'pages', `${req.params.title}.md`);
    console.log('Looking for file:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      res.status(404).send('Content file not found');
      return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    const htmlContent = marked.parse(content);

    // Ensure we're working with tag names (strings), not objects
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      const tagNames = frontmatter.tags.map(tag => typeof tag === 'object' ? tag.name : tag);
      frontmatter.tags = tagNames.map(tagName => {
        const tagData = tags[tagName];
        if (!tagData) {
          console.warn(`Warning: Tag "${tagName}" not found in tag definitions`);
          return { name: tagName, color: 'gray-400' }; // fallback color
        }
        return {
          name: tagName,
          ...tagData
        };
      });
    } else {
      frontmatter.tags = []; // ensure tags is always an array
    }

    res.render('details', {
      title: frontmatter.title,
      frontmatter,
      content: htmlContent
    });
  } catch (error) {
    console.error('Error loading content:', error);
    res.status(404).send('Error: ' + error.message);
  }
});

app.get('/secret', (req, res) => {
  res.render('secret', {
    message: "You found the secret page! 🎮"
  });
});

// Update the filter route with api prefix
app.get('/api/filter', (req, res) => {
  const type = req.query.type;
  const cards = getAllPages();
  const filteredCards = type 
    ? cards.filter(card => card.type === type)
    : cards;

  res.render('partials/cards', { cards: filteredCards });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
