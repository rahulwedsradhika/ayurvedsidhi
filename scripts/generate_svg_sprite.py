with open('dashboard_raw.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

end_idx = html.find('</svg>') + 6
svg_block = html[:end_idx]

# Clean up for JSX (xlink:href -> xlinkHref, style string -> style object or hidden)
svg_block = svg_block.replace('style="display: none;"', 'style={{ display: "none" }}')
svg_block = svg_block.replace('xlink:href', 'xlinkHref')
svg_block = svg_block.replace('xmlns:xlink', 'xmlnsXlink')
svg_block = svg_block.replace('xml:space', 'xmlSpace')
svg_block = svg_block.replace('fill-rule', 'fillRule')
svg_block = svg_block.replace('clip-rule', 'clipRule')
svg_block = svg_block.replace('stop-color', 'stopColor')

# Replace style="fill:#..." with fill="#..."
import re
svg_block = re.sub(r'style="fill:([^;]+);"', r'fill="\1"', svg_block)

jsx_code = f"""import React from 'react';

export const SvgSprite: React.FC = () => (
  {svg_block}
);
"""

with open('client/src/components/SvgSprite.tsx', 'w', encoding='utf-8') as out:
    out.write(jsx_code)

print("Created client/src/components/SvgSprite.tsx successfully!")

