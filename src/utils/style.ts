export interface BlockStyle {
  theme?: string;
  backgroundColor?: string;
  headingColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: 'small' | 'medium' | 'large';
  sectionSpacing?: 'compact' | 'normal' | 'spacious';
}

export function getBlockStyleVars(style?: BlockStyle): string {
  if (!style) return '';
  const vars: string[] = [];
  
  if (style.backgroundColor) {
    vars.push(`background-color: ${style.backgroundColor}`);
  }
  
  return vars.join('; ');
}

export function getBlockStyleObject(style?: BlockStyle): Record<string, string> {
  if (!style) return {};
  const obj: Record<string, string> = {};
  if (style.backgroundColor) {
    obj.backgroundColor = style.backgroundColor;
  }
  return obj;
}

export function getBlockClasses(style?: BlockStyle, defaultTheme: string = ''): string {
  if (!style) return defaultTheme ? `${defaultTheme} py-16 sm:py-20 lg:py-28` : 'py-16 sm:py-20 lg:py-28';
  const classes: string[] = [];
  
  // Theme Backgrounds
  let themeClasses = defaultTheme;
  if (style.theme && style.theme !== 'default') {
    switch (style.theme) {
      case 'ocean':
        themeClasses = 'bg-water-900 text-white';
        break;
      case 'pool':
        themeClasses = 'bg-pool-500 text-white';
        break;
      case 'dark':
        themeClasses = 'bg-water-950 text-white';
        break;
      case 'light':
        themeClasses = 'bg-water-50 text-gray-800';
        break;
    }
  }
  if (themeClasses) classes.push(themeClasses);
  
  // Text Align
  if (style.textAlign) {
    classes.push(`text-${style.textAlign}`);
  }
  
  // Font Size
  if (style.fontSize === 'small') classes.push('text-sm');
  if (style.fontSize === 'large') classes.push('text-lg');
  
  // Spacing
  if (style.sectionSpacing === 'compact') {
    classes.push('py-12 sm:py-16');
  } else if (style.sectionSpacing === 'spacious') {
    classes.push('py-24 sm:py-32 lg:py-40');
  } else {
    // Normal spacing should match old section-padding
    classes.push('py-16 sm:py-20 lg:py-28');
  }
  
  return classes.join(' ');
}
