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
  if (!style) return defaultTheme;
  const classes: string[] = [];
  
  // Theme
  const theme = style.theme && style.theme !== 'default' ? `theme-${style.theme}` : defaultTheme;
  if (theme) classes.push(theme);
  
  // Text Align
  if (style.textAlign) {
    classes.push(`text-${style.textAlign}`);
  }
  
  // Font Size
  if (style.fontSize === 'small') classes.push('text-sm');
  if (style.fontSize === 'large') classes.push('text-lg');
  
  // Spacing
  if (style.sectionSpacing === 'compact') classes.push('py-10');
  else if (style.sectionSpacing === 'spacious') classes.push('py-32');
  
  return classes.join(' ');
}
