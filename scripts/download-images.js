const https = require('https');
const fs = require('fs');
const path = require('path');

const courseImages = [
  {
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
    filename: 'python-beginners.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    filename: 'dsa-advanced.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    filename: 'web-dev-bootcamp.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    filename: 'ml-fundamentals.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    filename: 'react-native.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
    filename: 'devops-cloud.jpg'
  }
];

const instructorImages = [
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    filename: 'john-doe.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    filename: 'jane-smith.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    filename: 'mike-johnson.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    filename: 'sarah-chen.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    filename: 'alex-rodriguez.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    filename: 'david-wilson.jpg'
  }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
}

async function downloadAllImages() {
  const coursesDir = path.join(process.cwd(), 'public', 'courses');
  const instructorsDir = path.join(process.cwd(), 'public', 'instructors');

  // Create directories if they don't exist
  if (!fs.existsSync(coursesDir)) {
    fs.mkdirSync(coursesDir, { recursive: true });
  }
  if (!fs.existsSync(instructorsDir)) {
    fs.mkdirSync(instructorsDir, { recursive: true });
  }

  // Download course images
  for (const image of courseImages) {
    const filepath = path.join(coursesDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
      console.log(`Downloaded ${image.filename}`);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error);
    }
  }

  // Download instructor images
  for (const image of instructorImages) {
    const filepath = path.join(instructorsDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
      console.log(`Downloaded ${image.filename}`);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error);
    }
  }
}

downloadAllImages().then(() => {
  console.log('All images downloaded successfully!');
}).catch(error => {
  console.error('Error downloading images:', error);
}); 