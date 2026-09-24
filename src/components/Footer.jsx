import React from "react";

const groups = [
  ["产品 / PRODUCTS", [["Live", "/en/live/"], ["Push", "/en/push/"], ["Move", "/en/move/"], ["声音包", "/en/packs/"]]],
  ["学习 / LEARN", [["学习 Live", "/en/live/learn-live/"], ["学习音乐", "/en/classroom/support/learning-music/"], ["学习合成器", "/en/classroom/support/learning-synths/"], ["认证培训", "/en/certified-training/"]]],
  ["ABLETON", [["关于我们", "/en/about/"], ["工作机会", "/en/jobs/"], ["新闻资料", "/en/press/"], ["社区", "/en/community/"]]],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand"><strong>Ableton</strong><span>创作音乐，是人之所以为人的一部分。<small>MAKING MUSIC IS PART OF BEING HUMAN.</small></span></div>
      {groups.map(([title, links]) => (
        <div className="footer-group" key={title}><span>{title}</span>{links.map(([label, path]) => <a href={`https://www.ableton.com${path}`} target="_blank" rel="noreferrer" key={label}>{label}</a>)}</div>
      ))}
      <div className="footer-meta"><span>EN / CN</span><span>© 2026 ABLETON</span><a href="https://www.ableton.com/en/legal/" target="_blank" rel="noreferrer">LEGAL ↗</a></div>
    </footer>
  );
}
