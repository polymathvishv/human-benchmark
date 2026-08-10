import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Support running locally with .env if needed
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  });
}

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

async function submitToIndexNow() {
  console.log('--- IndexNow Auto-Submit ---');
  
  if (!INDEXNOW_KEY) {
    console.warn('⚠️ INDEXNOW_KEY environment variable is not set. Skipping IndexNow submission.');
    return;
  }

  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Could not find public/sitemap.xml');
    process.exit(1);
  }

  try {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Extract all <loc> URLs from the sitemap
    const urlMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urlList = urlMatches.map(m => m[1].trim());

    if (urlList.length === 0) {
      console.warn('⚠️ No URLs found in sitemap to submit.');
      return;
    }

    // Determine the host dynamically based on the first URL
    // (Assuming all URLs in sitemap have the same host)
    const firstUrl = new URL(urlList[0]);
    const host = firstUrl.hostname; // e.g. "humanbenchmark.in"

    console.log(`📡 Preparing to submit ${urlList.length} URLs for host: ${host}`);

    const payload = {
      host: host,
      key: INDEXNOW_KEY,
      urlList: urlList
    };

    console.log('🔄 Submitting to https://api.indexnow.org/indexnow...');
    
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ Successfully submitted URLs to IndexNow!');
      console.log(`Status: ${response.status} ${response.statusText}`);
    } else {
      console.error(`❌ Failed to submit to IndexNow. Status: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error('Response details:', text);
    }
  } catch (error) {
    console.error('❌ An error occurred during IndexNow submission:', error);
  }
}

submitToIndexNow();
