import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const videoDir = join(root, 'videos');
const productHtml = readFileSync(join(root, 'product.html'), 'utf8');
const appJs = readFileSync(join(root, 'app.js'), 'utf8');

const videos = [
  'epochx-step1-bounty.mp4',
  'epochx-step2-agent.mp4',
  'event_auto_research.mp4',
  'quantaalpha.mp4',
  'repomaster-demo.mp4',
  'semaclaw-demo.mp4',
  'semacode-demo.mp4',
];
const expectedSrcs = videos.map((file) => `videos/${file}`).sort();

const maxBytes = {
  'epochx-step1-bounty.mp4': 620_000,
  'epochx-step2-agent.mp4': 2_200_000,
  'event_auto_research.mp4': 4_500_000,
  'quantaalpha.mp4': 4_200_000,
  'repomaster-demo.mp4': 9_900_000,
  'semaclaw-demo.mp4': 11_100_000,
  'semacode-demo.mp4': 13_800_000,
};

function fail(message) {
  throw new Error(message);
}

function ffprobeJson(args) {
  return JSON.parse(execFileSync('ffprobe', ['-v', 'error', ...args], { encoding: 'utf8' }));
}

function atomOrder(path) {
  const result = spawnSync('ffprobe', ['-v', 'trace', path], { encoding: 'utf8' });
  const trace = `${result.stdout || ''}\n${result.stderr || ''}`;
  return [...trace.matchAll(/type:'(moov|mdat)'/g)].map((match) => match[1]);
}

for (const file of videos) {
  const path = join(videoDir, file);
  const size = statSync(path).size;
  if (size > maxBytes[file]) {
    fail(`${file}: expected optimized size <= ${maxBytes[file]} bytes, got ${size}`);
  }

  const data = ffprobeJson([
    '-select_streams', 'v:0',
    '-show_entries', 'stream=codec_name,width,height,pix_fmt,avg_frame_rate',
    '-of', 'json',
    path,
  ]);
  const stream = data.streams?.[0];
  if (!stream) fail(`${file}: missing video stream`);
  if (stream.codec_name !== 'h264') {
    fail(`${file}: expected h264 video, got ${stream.codec_name}`);
  }
  if (stream.pix_fmt !== 'yuv420p') {
    fail(`${file}: expected yuv420p pixel format, got ${stream.pix_fmt}`);
  }
  if (stream.height > 1080 || stream.width > 1920) {
    fail(`${file}: expected <=1920x1080, got ${stream.width}x${stream.height}`);
  }

  const atoms = atomOrder(path);
  if (atoms[0] !== 'moov') {
    fail(`${file}: expected faststart moov atom before media data`);
  }
}

const inlinePlaybackHandlers = /onmouse(?:over|out)\s*=/.test(productHtml);
if (inlinePlaybackHandlers) {
  fail('product.html: inline video hover playback handlers should be managed from app.js');
}

const videoTags = [...productHtml.matchAll(/<video\b[^>]*>/g)].map((match) => match[0]);
const previewVideos = videoTags.filter((tag) => !tag.includes('id="vmodal-video"'));
if (previewVideos.length !== 7) {
  fail(`product.html: expected 7 preview videos, got ${previewVideos.length}`);
}

const cardVideoPairs = [
  ...productHtml.matchAll(
    /<div\b(?=[^>]*\bvideo-card\b)[^>]*\bdata-src="([^"]+)"[^>]*>\s*<video\b([^>]*)>/g,
  ),
];
if (cardVideoPairs.length !== previewVideos.length) {
  fail(`product.html: expected every preview video to be inside a data-src video card`);
}

const cardSrcs = [];
const previewSrcs = [];
for (const [, cardSrc, videoTag] of cardVideoPairs) {
  const videoSrc = videoTag.match(/\bdata-src="([^"]+)"/)?.[1];
  if (!videoSrc) fail(`product.html: preview video missing data-src: ${videoTag}`);
  if (videoSrc !== cardSrc) {
    fail(`product.html: video card src mismatch, card=${cardSrc}, video=${videoSrc}`);
  }
  cardSrcs.push(cardSrc);
  previewSrcs.push(videoSrc);
}

const actualSrcs = [...new Set([...cardSrcs, ...previewSrcs])].sort();
if (JSON.stringify(actualSrcs) !== JSON.stringify(expectedSrcs)) {
  fail(`product.html: referenced videos ${actualSrcs.join(', ')} did not match checked videos ${expectedSrcs.join(', ')}`);
}

for (const tag of previewVideos) {
  if (/\ssrc=/.test(tag)) {
    fail(`product.html: preview video should not have eager src: ${tag}`);
  }
  if (!/data-src=/.test(tag)) {
    fail(`product.html: preview video should expose data-src for managed lazy loading: ${tag}`);
  }
  if (!/preload="none"/.test(tag)) {
    fail(`product.html: preview video should use preload="none": ${tag}`);
  }
  if (!/muted/.test(tag) || !/playsinline/.test(tag)) {
    fail(`product.html: preview video should remain muted and playsinline: ${tag}`);
  }
}

for (const requiredSnippet of [
  'pauseAllPreviewVideos',
  'unloadPreviewVideo',
  'setupManagedVideoPreviews',
  'matchMedia(\'(hover: hover) and (pointer: fine)\')',
]) {
  if (!appJs.includes(requiredSnippet)) {
    fail(`app.js: expected managed preview logic containing ${requiredSnippet}`);
  }
}

console.log(`Performance checks passed for ${videos.length} videos and ${previewVideos.length} previews.`);
