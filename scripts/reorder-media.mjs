import fs from "fs";

const path = "media.html";
let html = fs.readFileSync(path, "utf8");
const re = /<article class="media-card[\s\S]*?<\/article>/g;
const articles = html.match(re);
if (!articles) throw new Error("No articles found");

const by = (needle) => {
  const i = articles.findIndex((a) => a.includes(needle));
  if (i < 0) throw new Error("Missing: " + needle);
  const [x] = articles.splice(i, 1);
  return x;
};

const orderNeedles = [
  "media-orientsec-quantaalpha-special-report-cover", // 1 东方证券 PDF
  "media-wechat-04.png", // 2 QuantML
  "media-x-02-dongxi-nlp.png", // 3 马东锡
  "se-agent-qbitai",
  "repomaster-ai-tech-review",
  "gittaskbench-ifeng",
  "idea2story-wechat-cover",
  "epochx-techwalker",
  "quantaalpha-qbitai-mirror",
  "videodr-wechat-cover",
  "memgovern-36kr",
  "idea2paper-wechat-cover",
  "media-wechat-05.png",
  "cse-techwalker",
  "media-wechat-06.png",
  "clonemem-baai",
  "media-wechat-07.png",
  "spider-sense-sohu",
  "media-wechat-08.png",
  "fin-r1-aibase",
  "media-wechat-09.png",
  "media-wechat-10.png",
  "media-wechat-11.png",
  "media-x-01-akhaliq",
  "media-x-06-tom-doerr.png",
  "media-x-05-jiqizhixin.png",
  "media-x-03-huggingpapers.png",
  "media-x-04-dongxi-nlp-arxiv.png",
  "media-sohu-techwalker-quantaalpha",
  "media-bilibili-quantaalpha-opus",
  "media-sina-quantaalpha-fin-engineering.png",
];

const picked = orderNeedles.map((n) => by(n));
if (articles.length) {
  console.warn("Leftover articles:", articles.length);
  picked.push(...articles);
}

function aos(i) {
  const d = i % 3;
  if (d === 0) return ' data-aos="fade-up"';
  return ` data-aos="fade-up" data-aos-delay="${d * 50}"`;
}

const body = picked
  .map((block, i) =>
    block.replace(
      /<article class="media-card glass-card rounded-2xl overflow-hidden"[^>]*>/,
      `<article class="media-card glass-card rounded-2xl overflow-hidden"${aos(i)}>`
    )
  )
  .join("\n\n                ");

const start = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3');
const marker = "\n            </div>\n        </div>\n    </section>";
const mi = html.indexOf(marker, start);
if (start < 0 || mi < 0) throw new Error("markers not found");
const end = mi + "\n            </div>".length;
const newGrid = `            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 lg:gap-10">
                ${body}
            </div>`;
html = html.slice(0, start) + newGrid + html.slice(end);
fs.writeFileSync(path, html);
console.log("OK, articles:", picked.length);
