/**
 * Run this script ONCE from the project root to copy the Meta Insights screenshots:
 *   node copyAssets.js
 */
const fs = require('fs');
const path = require('path');

const uploads = [
  {
    src: path.join('C:/Users/gautam patel/.gemini/antigravity/brain/d1591916-2040-4205-bf80-b13255c617c3/.user_uploaded', 'media_1791098370280.png'),
    dest: path.join(__dirname, 'public/fb_insights.png'),
    label: 'Facebook Insights'
  },
  {
    src: path.join('C:/Users/gautam patel/.gemini/antigravity/brain/d1591916-2040-4205-bf80-b13255c617c3/.user_uploaded', 'media_1791098370335.png'),
    dest: path.join(__dirname, 'public/ig_insights.png'),
    label: 'Instagram Insights'
  },
];

uploads.forEach(({ src, dest, label }) => {
  try {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${label} → ${path.basename(dest)}`);
  } catch (err) {
    console.error(`✗ Failed to copy ${label}: ${err.message}`);
  }
});

console.log('\nDone. Now run: npm run dev');
