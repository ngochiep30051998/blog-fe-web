# Hướng dẫn Export từ Figma

## Bước 1: Export Images từ Figma

1. Mở file Figma: https://www.figma.com/design/66bhgltsN6PUqskyf2sfF2/blog-website-design---mobile-app-design--Community-?node-id=3-1579

2. Xác định các images cần export:
   - Blog post images (hero images, thumbnail images)
   - Icons (nếu có custom icons)
   - Logo và branding assets

3. Export images:
   - Chọn layer/frame chứa image
   - Click vào Export panel (bên phải)
   - Chọn format: JPG (cho photos) hoặc PNG (cho graphics)
   - Chọn size: 2x hoặc 3x cho retina displays
   - Click Export và lưu vào `public/images/`

## Bước 2: Export Icons

1. Tìm các icons trong design (menu icons, social icons, etc.)
2. Export từng icon:
   - Format: SVG (preferred) hoặc PNG
   - Size: 24x24px hoặc 16x16px
   - Lưu vào `public/icons/`

## Bước 3: Cập nhật Code

Sau khi export, cập nhật các file sau nếu cần:

- `app/blog/page.tsx` - Cập nhật image paths trong blogPosts array
- `app/blog/[slug]/page.tsx` - Cập nhật image paths trong getPost function
- `components/ui/Header.tsx` - Cập nhật logo nếu có
- `components/ui/Footer.tsx` - Cập nhật social icons nếu có

## Bước 4: Kiểm tra Design Match

Sau khi export images, kiểm tra:

1. **Fonts**: 
   - Kiểm tra font family trong Figma
   - Cập nhật `app/layout.tsx` nếu cần font khác
   - Cập nhật `app/globals.css` cho font sizes

2. **Colors**:
   - Lấy color values từ Figma
   - Cập nhật trong Tailwind config hoặc CSS variables

3. **Spacing & Layout**:
   - So sánh spacing giữa design và code
   - Điều chỉnh padding, margin, gap trong components

4. **Typography**:
   - Kiểm tra font sizes, weights, line heights
   - Cập nhật trong components nếu cần

## Lưu ý

- Tất cả images sẽ được tự động optimize bởi Next.js Image component
- Đảm bảo images có kích thước phù hợp (không quá lớn)
- Sử dụng `next/image` component cho tất cả images để có performance tốt nhất

