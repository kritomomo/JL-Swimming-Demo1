import { tinaField, useTina } from 'tinacms/dist/react';
import React from 'react';
import { type BlockStyle, getBlockStyleObject, getBlockClasses } from '../../utils/style';

interface BlockRendererProps {
  query: string;
  variables: Record<string, any>;
  data: any;
}

const BlockHero: React.FC<{ block: any }> = ({ block }) => {
  if (block.visible === false) return <div className="opacity-50 pointer-events-none">[Hidden Hero Section]</div>;
  const bgStyle = block.backgroundImage ? { backgroundImage: `url(${block.backgroundImage})` } : {};
  const styleVars = getBlockStyleObject(block.style);
  const styleClasses = getBlockClasses(block.style, 'theme-ocean');
  let alignmentClass = 'text-center mx-auto';
  if (block.layout === 'left-aligned') alignmentClass = 'text-left ml-0';
  if (block.layout === 'split') alignmentClass = 'text-left lg:w-1/2';

  return (
    <section id="hero" className={`relative min-h-[100vh] flex items-center justify-center overflow-hidden wave-divider ${styleClasses}`} style={{ ...bgStyle, ...styleVars }} data-tina-field={tinaField(block, 'style')}>
      <div className={`relative z-10 section-container w-full`}>
        <div className={`max-w-4xl ${alignmentClass}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4" data-tina-field={tinaField(block, 'heading')} style={block.style?.headingColor ? { color: block.style.headingColor } : {}}>
            {block.heading}
          </h1>
          {block.subheading && (
            <p className="text-xl text-white/70" data-tina-field={tinaField(block, 'subheading')}>
              {block.subheading}
            </p>
          )}
          {block.ctaText && (
            <a href={block.ctaLink || '#'} className="mt-8 inline-block px-8 py-3 bg-white/20 rounded-xl text-white border border-white/30" data-tina-field={tinaField(block, 'ctaText')}>
              {block.ctaText} →
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

const BlockAbout: React.FC<{ block: any }> = ({ block }) => {
  if (block.visible === false) return <div className="opacity-50 pointer-events-none">[Hidden About Section]</div>;
  const styleVars = getBlockStyleObject(block.style);
  const styleClasses = getBlockClasses(block.style, 'bg-white theme-default');
  const layoutColClass = block.layout === 'stacked' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2';
  const textOrderClass = block.layout === 'image-left' ? 'order-2' : 'order-1';
  const imageOrderClass = block.layout === 'image-left' ? 'order-1' : 'order-2';

  return (
    <section id="about" className={`py-20 px-4 mx-auto ${styleClasses}`} style={styleVars} data-tina-field={tinaField(block, 'style')}>
      <div className={`grid ${layoutColClass} gap-12 items-center max-w-6xl mx-auto`}>
        <div className={textOrderClass}>
          <h2 className="text-4xl font-bold mb-6" data-tina-field={tinaField(block, 'heading')} style={block.style?.headingColor ? { color: block.style.headingColor } : {}}>
            {block.heading}
          </h2>
          <div data-tina-field={tinaField(block, 'body')}>
            {block.body?.split('\n').filter(Boolean).map((p: string, i: number) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        </div>
        {block.image && (
          <div className={imageOrderClass} data-tina-field={tinaField(block, 'image')}>
            <img src={block.image} alt="About" className="rounded-2xl shadow-xl w-full object-cover" />
          </div>
        )}
      </div>
    </section>
  );
};

const BlockAchievements: React.FC<{ block: any }> = ({ block }) => {
  if (block.visible === false) return <div className="opacity-50 pointer-events-none">[Hidden Achievements Section]</div>;
  const styleVars = getBlockStyleObject(block.style);
  const styleClasses = getBlockClasses(block.style, 'bg-water-950 theme-dark text-white');
  let gridClass = 'grid-cols-1 md:grid-cols-2';
  if (block.layout === 'grid-3col') gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  if (block.layout === 'list') gridClass = 'grid-cols-1 max-w-4xl mx-auto';

  return (
    <section id="achievements" className={`py-20 ${styleClasses}`} style={styleVars} data-tina-field={tinaField(block, 'style')}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4" data-tina-field={tinaField(block, 'heading')} style={block.style?.headingColor ? { color: block.style.headingColor } : {}}>
          {block.heading}
        </h2>
        {block.subheading && (
          <p className="text-center opacity-70 mb-10" data-tina-field={tinaField(block, 'subheading')}>
            {block.subheading}
          </p>
        )}
        <div className={`grid ${gridClass} gap-6`}>
          {block.items?.map((item: any, i: number) => (
            <div key={i} className={`p-6 bg-white/5 border border-white/10 rounded-xl flex ${block.layout === 'list' ? 'flex-col sm:flex-row' : 'flex-col'}`}>
              {item.image && (
                <img src={item.image} alt={item.title} className={`${block.layout === 'list' ? 'sm:w-64' : 'w-full'} h-48 object-cover rounded-lg mb-4`} data-tina-field={tinaField(item, 'image')} />
              )}
              <div className="flex-1 p-2">
                <p className="text-xs text-cyan-400 uppercase tracking-wider">{item.date}</p>
                <h3 className="text-lg font-semibold mt-1" data-tina-field={tinaField(item, 'title')}>{item.title}</h3>
                <p className="text-sm opacity-60 mt-2" data-tina-field={tinaField(item, 'description')}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlockLocations: React.FC<{ block: any }> = ({ block }) => {
  if (block.visible === false) return <div className="opacity-50 pointer-events-none">[Hidden Locations Section]</div>;
  const styleVars = getBlockStyleObject(block.style);
  const styleClasses = getBlockClasses(block.style, 'bg-white theme-default');
  let gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  if (block.columns === '2') gridClass = 'grid-cols-1 sm:grid-cols-2';
  if (block.columns === '4') gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section id="locations" className={`py-20 px-4 ${styleClasses}`} style={styleVars} data-tina-field={tinaField(block, 'style')}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4" data-tina-field={tinaField(block, 'heading')} style={block.style?.headingColor ? { color: block.style.headingColor } : {}}>
          {block.heading}
        </h2>
        {block.subheading && (
          <p className="text-center opacity-70 mb-10" data-tina-field={tinaField(block, 'subheading')}>
            {block.subheading}
          </p>
        )}
        <div className={`grid ${gridClass} gap-6`}>
          {block.locations?.map((loc: any, i: number) => (
            <div key={i} className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-left">
              {loc.image && (
                <img src={loc.image} alt={loc.name} className="w-full h-40 object-cover rounded-lg mb-4" data-tina-field={tinaField(loc, 'image')} />
              )}
              <h3 className="text-lg font-semibold" data-tina-field={tinaField(loc, 'name')}>{loc.name}</h3>
              {loc.address && <p className="text-sm mt-2" data-tina-field={tinaField(loc, 'address')}>{loc.address}</p>}
              {loc.phone && <p className="text-sm mt-1" data-tina-field={tinaField(loc, 'phone')}>📞 {loc.phone}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlockContact: React.FC<{ block: any }> = ({ block }) => {
  if (block.visible === false) return <div className="opacity-50 pointer-events-none">[Hidden Contact Section]</div>;
  const styleVars = getBlockStyleObject(block.style);
  const styleClasses = getBlockClasses(block.style, 'bg-white theme-default');
  const layoutColClass = block.layout === 'stacked' ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto';

  return (
    <section id="contact" className={`py-20 px-4 ${styleClasses}`} style={styleVars} data-tina-field={tinaField(block, 'style')}>
      <h2 className="text-4xl font-bold text-center mb-4" data-tina-field={tinaField(block, 'heading')} style={block.style?.headingColor ? { color: block.style.headingColor } : {}}>
        {block.heading}
      </h2>
      {block.subheading && (
        <p className="text-center opacity-70 mb-10" data-tina-field={tinaField(block, 'subheading')}>
          {block.subheading}
        </p>
      )}
      <div className={`grid ${layoutColClass} gap-12`}>
        <div className="space-y-4 text-center">
          {block.phone && <p className="text-lg" data-tina-field={tinaField(block, 'phone')}>📞 {block.phone}</p>}
          {block.email && <p className="text-lg" data-tina-field={tinaField(block, 'email')}>✉️ {block.email}</p>}
        </div>
      </div>
    </section>
  );
};

const blockMap: Record<string, React.FC<{ block: any }>> = {
  PageBlocksHero: BlockHero,
  PageBlocksAbout: BlockAbout,
  PageBlocksAchievements: BlockAchievements,
  PageBlocksLocations: BlockLocations,
  PageBlocksContact: BlockContact,
};

export default function PageContent(props: BlockRendererProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data?.page;
  if (!page) return null;

  return (
    <div>
      {page.blocks?.map((block: any, index: number) => {
        const Component = blockMap[block.__typename];
        if (!Component) return null;
        return <Component key={index} block={block} />;
      })}
    </div>
  );
}
