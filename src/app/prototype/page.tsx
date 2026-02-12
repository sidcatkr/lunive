"use client";

import TableOfContents from "./components/TableOfContents";
import ArticleHeader from "./components/ArticleHeader";
import ArticleNav from "./components/ArticleNav";
import ImageBlock from "./components/ImageBlock";
import ImageGrid from "./components/ImageGrid";
import Footnote from "./components/Footnote";

const tocItems = [
  { id: "visual-harmony", title: "Visual Harmony" },
  { id: "typography-matters", title: "Typography Matters" },
  { id: "space-and-rhythm", title: "Space & Rhythm" },
  { id: "color-theory", title: "Color Theory" },
  { id: "conclusion", title: "Conclusion" },
];

export default function PrototypePage() {
  return (
    <>
      <TableOfContents items={tocItems} />
      
      <main className="max-w-[680px] mx-auto px-6 py-16 md:py-24">
        <ArticleHeader
          title="The Art of Visual Design"
          date="February 2026"
          backLink={{ href: "/", label: "Essays" }}
        />
        
        <article className="prose-essay">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            The interplay between form and function remains at the heart of exceptional design work.
          </p>
          
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum. Every element 
            serves a purpose, contributing to a cohesive visual narrative.
          </p>

          <ImageBlock
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
            alt="Abstract geometric shapes with soft gradients"
            caption="Visual composition relies on balance between positive and negative space."
            priority
          />

          <p>
            Nulla facilisi morbi tempus iaculis urna id volutpat lacus<Footnote number={1} />. 
            Pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient 
            montes. Nam libero justo laoreet sit amet cursus sit amet dictum<Footnote number={2} />.
          </p>

          <h3 id="visual-harmony">Visual Harmony</h3>
          
          <p>
            Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Mattis 
            vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Dictumst 
            quisque sagittis purus sit amet volutpat consequat mauris nunc. In ornare quam 
            viverra orci sagittis eu volutpat odio facilisis.
          </p>

          <p>
            Harmony in design emerges when every component works together seamlessly. 
            The relationship between elements creates a visual rhythm that guides the eye 
            through the composition<Footnote number={3} />. This principle applies universally, 
            from print layouts to digital interfaces.
          </p>

          <ImageGrid
            images={[
              { 
                src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80", 
                alt: "Minimal architectural photography",
                number: 1
              },
              { 
                src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&q=80", 
                alt: "Abstract color composition",
                number: 2
              },
              { 
                src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&q=80", 
                alt: "Geometric gradient design",
                number: 3
              },
            ]}
          />

          <p>
            Turpis egestas sed tempus urna et pharetra pharetra massa. Congue mauris 
            rhoncus aenean vel elit scelerisque. Praesent semper feugiat nibh sed pulvinar 
            proin gravida hendrerit lectus. Each decision in the design process should 
            reinforce the overall vision.
          </p>

          <h3 id="typography-matters">Typography Matters</h3>
          
          <p>
            Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Posuere morbi leo 
            urna molestie at elementum eu facilisis sed. Typography serves as the voice 
            of design—it communicates not just through words, but through the very shape 
            and rhythm of letterforms.
          </p>

          <ImageBlock
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
            alt="Typography specimen showing various typefaces"
            caption="The choice of typeface fundamentally shapes how content is perceived."
          />

          <p>
            Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. 
            Amet luctus venenatis lectus magna fringilla urna porttitor. Morbi tincidunt 
            augue interdum velit euismod in pellentesque massa placerat<Footnote number={4} />. 
            Good typography goes unnoticed—it simply works.
          </p>

          <p>
            Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Sed 
            felis eget velit aliquet sagittis id consectetur purus ut. Platea dictumst 
            quisque sagittis purus sit amet volutpat consequat. When type is set well, 
            readers absorb content effortlessly.
          </p>

          <h3 id="space-and-rhythm">Space & Rhythm</h3>
          
          <p>
            Amet cursus sit amet dictum sit amet justo donec enim. Id porta nibh venenatis 
            cras sed felis eget. Nec tincidunt praesent semper feugiat nibh. White space 
            is not empty space—it is a powerful design element that gives content room to breathe.
          </p>

          <p>
            Gravida in fermentum et sollicitudin ac orci phasellus. Urna et pharetra pharetra 
            massa massa ultricies mi quis hendrerit<Footnote number={5} />. Rhythm emerges 
            from the careful orchestration of elements across the page.
          </p>

          <ImageBlock
            src="https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80"
            alt="Minimalist interior with thoughtful spacing"
            caption="Space creates hierarchy and allows the eye to rest."
          />

          <p>
            Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. 
            Sit amet risus nullam eget felis eget nunc lobortis mattis. Commodo nulla facilisi 
            nullam vehicula ipsum a arcu cursus.
          </p>

          <h3 id="color-theory">Color Theory</h3>
          
          <p>
            At tellus at urna condimentum mattis pellentesque id nibh tortor. Dui sapien 
            eget mi proin sed libero enim sed. Color evokes emotion before the conscious 
            mind has time to interpret content. It is perhaps the most immediate tool 
            in a designer&apos;s arsenal.
          </p>

          <ImageGrid
            images={[
              { 
                src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&q=80", 
                alt: "Warm color palette study"
              },
              { 
                src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80", 
                alt: "Cool color palette study"
              },
              { 
                src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80", 
                alt: "Complementary color study"
              },
            ]}
          />

          <p>
            Molestie at elementum eu facilisis sed odio morbi quis commodo. Egestas maecenas 
            pharetra convallis posuere morbi leo urna. Vitae semper quis lectus nulla at 
            volutpat diam ut venenatis.
          </p>

          <p>
            Understanding color relationships—complementary, analogous, triadic—provides 
            a foundation for creating palettes that resonate. But rules are meant to be 
            understood before they are bent or broken in service of creative vision.
          </p>

          <h3 id="conclusion">Conclusion</h3>
          
          <p>
            Tortor aliquam nulla facilisi cras fermentum odio eu. Facilisi etiam dignissim 
            diam quis enim lobortis scelerisque fermentum. Design is not merely decoration—it 
            is the thoughtful arrangement of elements to communicate ideas, evoke emotions, 
            and solve problems.
          </p>

          <p>
            Arcu cursus euismod quis viverra nibh cras. Sed turpis tincidunt id aliquet risus 
            feugiat in ante metus. In fermentum posuere urna nec tincidunt praesent semper. 
            The journey of learning design is continuous, with each project offering new 
            lessons and perspectives.
          </p>

          <p className="text-[var(--essay-muted)] text-sm mt-12 pt-8 border-t border-[var(--essay-border)]">
            This essay explores fundamental principles through the lens of visual composition. 
            No artificial intelligence was used to generate the original concepts discussed here.
          </p>
        </article>

        <ArticleNav
          previous={{ href: "/prototype", label: "Previous", title: "Introduction" }}
          next={{ href: "/prototype", label: "Next", title: "Advanced Techniques" }}
        />
      </main>
      
      <style jsx global>{`
        .prose-essay {
          font-family: var(--font-newsreader), Georgia, serif;
          font-size: 1.125rem;
          line-height: 1.8;
        }
        
        .prose-essay p {
          margin-bottom: 1.5rem;
          color: var(--essay-text);
        }
        
        .prose-essay h3 {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          color: var(--essay-text);
          scroll-margin-top: 2rem;
        }
        
        .prose-essay a {
          color: var(--essay-accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .prose-essay a:hover {
          text-decoration-color: transparent;
        }
        
        .prose-essay blockquote {
          border-left: 3px solid var(--essay-border);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--essay-muted);
        }
        
        .prose-essay code {
          font-size: 0.875em;
          background: rgba(0, 0, 0, 0.05);
          padding: 0.2em 0.4em;
          border-radius: 4px;
        }
        
        .prose-essay ul, .prose-essay ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .prose-essay li {
          margin-bottom: 0.5rem;
        }
        
        @media (max-width: 1024px) {
          .prose-essay {
            font-size: 1.0625rem;
          }
        }
      `}</style>
    </>
  );
}
