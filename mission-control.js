// Set up the canvas structure
const canvas = document.createElement('canvas');
canvas.width = 1920;
canvas.height = 1080;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Define the layout and colors
const backgroundColor = '#0f0f0f';
const primaryColor = '#7b68ee';
const secondaryColor = '#00ffff';
const textColor = '#ffffff';

// Draw the background
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw the header
ctx.fillStyle = primaryColor;
ctx.fillRect(0, 0, canvas.width, 50);
ctx.fillStyle = textColor;
ctx.font = '24px Arial';
ctx.fillText('Mission Control', 20, 35);

// Draw the sidebar
ctx.fillStyle = primaryColor;
ctx.fillRect(0, 50, 200, canvas.height - 50);

// Draw the sidebar items
ctx.fillStyle = textColor;
ctx.font = '18px Arial';
ctx.fillText('Tasks', 20, 90);
ctx.fillText('Content', 20, 130);
ctx.fillText('Approvals', 20, 170);
ctx.fillText('Council', 20, 210);
ctx.fillText('Calendar', 20, 250);
ctx.fillText('Projects', 20, 290);
ctx.fillText('Memory', 20, 330);
ctx.fillText('Docs', 20, 370);
ctx.fillText('People', 20, 410);
ctx.fillText('Office', 20, 450);
ctx.fillText('Team', 20, 490);

// Draw the main content area
ctx.fillStyle = secondaryColor;
ctx.fillRect(200, 50, canvas.width - 200, canvas.height - 50);

// Add dynamic content (tasks, live activity, etc.)
// This is where we would integrate the data from your various systems
ctx.fillStyle = textColor;
ctx.font = '16px Arial';
ctx.fillText('3 new', 220, 90);
ctx.fillText('3 in progress', 220, 110);
ctx.fillText('25 total', 220, 130);
ctx.fillText('40% completion', 220, 150);

ctx.fillText('Live Activity', 220, 190);
ctx.fillText('henry', 220, 210);
ctx.fillText('Started last10days research, challenges people are having with OpenClaw', 220, 230);
ctx.fillText('henry', 220, 260);
ctx.fillText('Fixed memory path bug — was pointing to /Users/henrietta/Documents instead of...', 220, 280);
// Add more dynamic content as needed