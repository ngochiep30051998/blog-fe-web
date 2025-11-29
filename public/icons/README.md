# Icons

This directory should contain any custom icons used in the blog.

## Current Icon Usage

The blog currently uses SVG icons inline in components. If you need to replace them with custom icons from Figma:

1. Export icons from Figma as SVG files
2. Place them in this directory
3. Update component imports to use the icon files

## Icon Formats

- **SVG** (preferred) - Scalable and lightweight
- **PNG** - For complex icons with gradients or effects
- **Size**: Typically 24x24px or 16x16px for UI icons

## Usage Example

```tsx
import Image from "next/image";
import iconPath from "@/public/icons/icon-name.svg";

<Image src={iconPath} alt="Icon" width={24} height={24} />
```

