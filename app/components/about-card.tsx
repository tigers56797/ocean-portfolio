"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const springEase = [0.34, 1.56, 0.64, 1] as const;

type TextPart = { text: string; highlight?: boolean };
type Paragraph = TextPart[];

type AboutCardProps = {
  paragraphs: Paragraph[];
  signature: string;
  role: string;
};

// 把所有段落拍平成「token」陣列，每個 token 知道自己屬於哪段、是否 highlight
type Token = { char: string; highlight: boolean; paraIndex: number; partIndex: number };

function buildTokens(paragraphs: Paragraph[]): Token[] {
  const tokens: Token[] = [];
  paragraphs.forEach((para, pi) => {
    para.forEach((part, ki) => {
      for (const char of part.text) {
        tokens.push({ char, highlight: !!part.highlight, paraIndex: pi, partIndex: ki });
      }
    });
    // 段落之間視為換行（不加可見字元，僅標記段落邊界）
  });
  return tokens;
}

// 打字速度：一般字 35ms，標點稍慢 80ms
function charDelay(char: string) {
  return /[，。、！？,.\s]/.test(char) ? 80 : 35;
}

function TypewriterCard({ paragraphs, signature, role }: AboutCardProps) {
  const tokens = buildTokens(paragraphs);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSignature, setShowSignature] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const started = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    let i = 0;
    function typeNext() {
      if (i >= tokens.length) {
        // 全部打完後，簽名淡入
        timerRef.current = setTimeout(() => setShowSignature(true), 300);
        return;
      }
      setVisibleCount(i + 1);
      i++;
      timerRef.current = setTimeout(typeNext, charDelay(tokens[i - 1]?.char ?? ""));
    }
    // 稍微延遲讓卡片先進場
    timerRef.current = setTimeout(typeNext, 400);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  // 把已顯示的 tokens 重組回段落結構來渲染
  const visibleTokens = tokens.slice(0, visibleCount);

  // 按段落 index 分組
  const paraMap: Map<number, Token[]> = new Map();
  for (const t of visibleTokens) {
    if (!paraMap.has(t.paraIndex)) paraMap.set(t.paraIndex, []);
    paraMap.get(t.paraIndex)!.push(t);
  }

  // 游標閃爍：只在打字中顯示
  const isTyping = visibleCount < tokens.length;

  return (
    <motion.div
      ref={ref}
      className="space-y-8 rounded-[2rem] border border-[#ebe3d7] bg-[#fffdf8]/70 p-10 shadow-[0_24px_80px_-48px_rgba(42,38,34,0.35)] backdrop-blur-sm md:p-12"
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease }}
      whileHover={{
        y: -4,
        boxShadow: "0 32px 96px -40px rgba(42,38,34,0.45)",
        transition: { duration: 0.35, ease },
      }}
    >
      <div className="space-y-6 text-lg leading-[1.75] text-[#4a433c]">
        {paragraphs.map((_, pi) => {
          const toks = paraMap.get(pi);
          if (!toks || toks.length === 0) return null;

          // 把同一 partIndex 的連續 tokens 合併，保留 highlight 資訊
          const chunks: { text: string; highlight: boolean }[] = [];
          for (const t of toks) {
            const last = chunks[chunks.length - 1];
            if (last && last.highlight === t.highlight) {
              last.text += t.char;
            } else {
              chunks.push({ text: t.char, highlight: t.highlight });
            }
          }

          // 最後一段的最後位置加游標
          const isLastPara = pi === Math.max(...[...paraMap.keys()]);

          return (
            <p key={pi}>
              {chunks.map((chunk, ci) =>
                chunk.highlight ? (
                  <span key={ci} className="about-quote-highlight">{chunk.text}</span>
                ) : (
                  <span key={ci}>{chunk.text}</span>
                )
              )}
              {/* 打字游標 */}
              {isTyping && isLastPara && (
                <motion.span
                  className="ml-[1px] inline-block h-[1.1em] w-[2px] align-middle bg-[#8b7355] rounded-sm"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                />
              )}
            </p>
          );
        })}
      </div>

      {/* Signature — 打字完成後淡入 */}
      <motion.p
        className="font-serif text-xl italic text-[#3d3835]"
        initial={{ opacity: 0, x: -10 }}
        animate={showSignature ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.6, ease: springEase }}
      >
        {signature}
        <br />
        <motion.span
          className="not-italic font-semibold tracking-tight"
          initial={{ opacity: 0, x: -10 }}
          animate={showSignature ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.6, delay: 0.15, ease: springEase }}
        >
          {role}
        </motion.span>
      </motion.p>
    </motion.div>
  );
}

export function AboutCard({ paragraphs, signature, role }: AboutCardProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="space-y-8 rounded-[2rem] border border-[#ebe3d7] bg-[#fffdf8]/70 p-10 shadow-[0_24px_80px_-48px_rgba(42,38,34,0.35)] backdrop-blur-sm md:p-12">
        <div className="space-y-6 text-lg leading-[1.75] text-[#4a433c]">
          {paragraphs.map((paragraph, pi) => (
            <p key={pi}>
              {paragraph.map((part, ki) =>
                part.highlight ? (
                  <span key={ki} className="about-quote-highlight">{part.text}</span>
                ) : (
                  <span key={ki}>{part.text}</span>
                )
              )}
            </p>
          ))}
        </div>
        <p className="font-serif text-xl italic text-[#3d3835]">
          {signature}<br />
          <span className="not-italic font-semibold tracking-tight">{role}</span>
        </p>
      </div>
    );
  }

  return <TypewriterCard paragraphs={paragraphs} signature={signature} role={role} />;
}
