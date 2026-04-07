import { defineConfig, Template } from 'tinacms';

// ---------------------------------------------------------------------------
// Shared Fields
// ---------------------------------------------------------------------------

const styleField = {
  type: 'object' as const,
  name: 'style',
  label: 'Styles & Formatting',
  fields: [
    {
      type: 'string' as const,
      name: 'theme',
      label: 'Color Theme',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Ocean', value: 'ocean' },
        { label: 'Pool', value: 'pool' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
    {
      type: 'string' as const,
      name: 'backgroundColor',
      label: 'Custom Background Color (Overrides Theme)',
      ui: {
        component: 'color',
      },
    },
    {
      type: 'string' as const,
      name: 'headingColor',
      label: 'Custom Heading Color',
      ui: {
        component: 'color',
      },
    },
    {
      type: 'string' as const,
      name: 'textAlign',
      label: 'Text Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      type: 'string' as const,
      name: 'fontSize',
      label: 'Font Size',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      type: 'string' as const,
      name: 'sectionSpacing',
      label: 'Section Spacing',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Spacious', value: 'spacious' },
      ],
    },
  ],
};

const visibleField = {
  type: 'boolean' as const,
  name: 'visible',
  label: 'Visible',
  description: 'Show or hide this section',
};

// ---------------------------------------------------------------------------
// Block Templates
// ---------------------------------------------------------------------------

const heroBlock: Template = {
  name: 'hero',
  label: 'Hero Section',
  ui: {
    defaultItem: {
      heading: 'JL Swimming',
      subheading: 'From first strokes to elite performance',
      ctaText: 'Enrol Now',
      ctaLink: '#contact',
      visible: true,
      layout: 'centered',
    },
  },
  fields: [
    visibleField,
    {
      type: 'string' as const,
      name: 'layout',
      label: 'Layout',
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Left Aligned', value: 'left-aligned' },
        { label: 'Split', value: 'split' },
      ],
    },
    styleField,
    {
      type: 'string' as const,
      name: 'heading',
      label: 'Heading',
      required: true,
    },
    {
      type: 'rich-text' as const,
      name: 'subheading',
      label: 'Sub-heading',
    },
    {
      type: 'image' as const,
      name: 'backgroundImage',
      label: 'Background Image',
    },
    {
      type: 'string' as const,
      name: 'ctaText',
      label: 'CTA Button Text',
    },
    {
      type: 'string' as const,
      name: 'ctaLink',
      label: 'CTA Button Link',
    },
  ],
};

const aboutBlock: Template = {
  name: 'about',
  label: 'About Section',
  ui: {
    defaultItem: {
      visible: true,
      layout: 'image-right',
    }
  },
  fields: [
    visibleField,
    {
      type: 'string' as const,
      name: 'layout',
      label: 'Layout',
      options: [
        { label: 'Image Right', value: 'image-right' },
        { label: 'Image Left', value: 'image-left' },
        { label: 'Stacked', value: 'stacked' },
      ],
    },
    styleField,
    {
      type: 'string' as const,
      name: 'heading',
      label: 'Heading',
      required: true,
    },
    {
      type: 'rich-text' as const,
      name: 'body',
      label: 'Body Content',
    },
    {
      type: 'image' as const,
      name: 'image',
      label: 'About Image',
    },
  ],
};

const achievementItem = {
  name: 'item',
  label: 'Achievement Item',
  fields: [
    {
      type: 'image' as const,
      name: 'image',
      label: 'Image',
    },
    {
      type: 'string' as const,
      name: 'title',
      label: 'Title',
      required: true,
    },
    {
      type: 'string' as const,
      name: 'date',
      label: 'Date',
    },
    {
      type: 'rich-text' as const,
      name: 'description',
      label: 'Description',
    },
  ],
};

const achievementsBlock: Template = {
  name: 'achievements',
  label: 'Achievements Section',
  ui: {
    defaultItem: {
      visible: true,
      layout: 'grid-2col',
    }
  },
  fields: [
    visibleField,
    {
      type: 'string' as const,
      name: 'layout',
      label: 'Layout',
      options: [
        { label: '2 Column Grid', value: 'grid-2col' },
        { label: '3 Column Grid', value: 'grid-3col' },
        { label: 'List', value: 'list' },
      ],
    },
    styleField,
    {
      type: 'string' as const,
      name: 'heading',
      label: 'Heading',
      required: true,
    },
    {
      type: 'rich-text' as const,
      name: 'subheading',
      label: 'Sub-heading',
    },
    {
      type: 'object' as const,
      name: 'items',
      label: 'Achievement Items',
      list: true,
      ui: {
        itemProps: (item: Record<string, string>) => ({
          label: item?.title || 'New Achievement',
        }),
      },
      fields: achievementItem.fields as any,
    },
  ],
};

const locationItem = {
  fields: [
    {
      type: 'string' as const,
      name: 'name',
      label: 'Location Name',
      required: true,
    },
    {
      type: 'string' as const,
      name: 'address',
      label: 'Address',
    },
    {
      type: 'string' as const,
      name: 'phone',
      label: 'Phone',
    },
    {
      type: 'string' as const,
      name: 'mapEmbedUrl',
      label: 'Google Map Embed URL',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'image' as const,
      name: 'image',
      label: 'Location Image',
    },
  ],
};

const locationsBlock: Template = {
  name: 'locations',
  label: 'Locations Section',
  ui: {
    defaultItem: {
      visible: true,
      columns: '3',
    }
  },
  fields: [
    visibleField,
    {
      type: 'string' as const,
      name: 'columns',
      label: 'Columns',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    styleField,
    {
      type: 'string' as const,
      name: 'heading',
      label: 'Heading',
      required: true,
    },
    {
      type: 'rich-text' as const,
      name: 'subheading',
      label: 'Sub-heading',
    },
    {
      type: 'object' as const,
      name: 'locations',
      label: 'Locations',
      list: true,
      ui: {
        itemProps: (item: Record<string, string>) => ({
          label: item?.name || 'New Location',
        }),
      },
      fields: locationItem.fields as any,
    },
  ],
};

const contactBlock: Template = {
  name: 'contact',
  label: 'Contact Section',
  ui: {
    defaultItem: {
      visible: true,
      layout: 'side-by-side',
    }
  },
  fields: [
    visibleField,
    {
      type: 'string' as const,
      name: 'layout',
      label: 'Layout',
      options: [
        { label: 'Side by Side', value: 'side-by-side' },
        { label: 'Stacked', value: 'stacked' },
      ],
    },
    styleField,
    {
      type: 'string' as const,
      name: 'heading',
      label: 'Heading',
      required: true,
    },
    {
      type: 'rich-text' as const,
      name: 'subheading',
      label: 'Sub-heading',
    },
    {
      type: 'string' as const,
      name: 'phone',
      label: 'Phone Number',
    },
    {
      type: 'string' as const,
      name: 'email',
      label: 'Email Address',
    },
    {
      type: 'string' as const,
      name: 'instagramUrl',
      label: 'Instagram URL',
    },
    {
      type: 'string' as const,
      name: 'mapEmbedUrl',
      label: 'Google Map Embed URL',
      ui: {
        component: 'textarea',
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// TinaCMS Configuration
// ---------------------------------------------------------------------------

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    'main',

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'global',
        label: 'Global Settings',
        path: 'content/global',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'siteName',
            label: 'Site Name',
            required: true,
          },
          {
            type: 'image',
            name: 'logo',
            label: 'Site Logo',
          },
          {
            type: 'object',
            name: 'navLinks',
            label: 'Navigation Links',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label || 'New Link',
              }),
            },
            fields: [
              {
                type: 'string',
                name: 'label',
                label: 'Label',
                required: true,
              },
              {
                type: 'string',
                name: 'href',
                label: 'Link (URL or #hash)',
                required: true,
              },
            ],
          },
          {
            type: 'string',
            name: 'footerText',
            label: 'Footer Text',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'object',
            name: 'socialLinks',
            label: 'Social Media Links',
            fields: [
              { type: 'string', name: 'instagram', label: 'Instagram' },
              { type: 'string', name: 'facebook', label: 'Facebook' },
              { type: 'string', name: 'tiktok', label: 'TikTok' },
            ],
          },
        ],
      },
      {
        name: 'page',
        label: 'Pages',
        path: 'content/pages',
        format: 'json',
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === 'home') {
              return '/';
            }
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          // ---- SEO Fields ----
          {
            type: 'string',
            name: 'title',
            label: 'Page Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'metaTitle',
            label: 'Meta Title (SEO)',
            description: 'Custom title for search engines. Defaults to Page Title if empty.',
          },
          {
            type: 'string',
            name: 'metaDescription',
            label: 'Meta Description (SEO)',
            description: 'Short description shown in search engine results.',
            ui: {
              component: 'textarea',
            },
          },

          // ---- Blocks ----
          {
            type: 'object',
            list: true,
            name: 'blocks',
            label: 'Page Sections',
            templates: [
              heroBlock,
              aboutBlock,
              achievementsBlock,
              locationsBlock,
              contactBlock,
            ],
          },
        ],
      },
    ],
  },
});
