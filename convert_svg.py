import re

with open('client/src/components/SvgSprite.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract from <svg xmlns= to </svg>
m = re.search(r'(<svg xmlns=.*?</svg>)', content, re.DOTALL)
if m:
    svg_part = m.group(1)
    escaped_svg = svg_part.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')
    new_code = (
        "import React from 'react';\n\n"
        "const svgMarkup = `" + escaped_svg + "`;\n\n"
        "export const SvgSprite: React.FC = () => {\n"
        "  return (\n"
        "    <div\n"
        "      style={{ display: 'none' }}\n"
        "      dangerouslySetInnerHTML={{ __html: svgMarkup }}\n"
        "    />\n"
        "  );\n"
        "};\n"
    )
    with open('client/src/components/SvgSprite.tsx', 'w', encoding='utf-8') as f_out:
        f_out.write(new_code)
    print("SUCCESS: SvgSprite converted to dangerouslySetInnerHTML")
else:
    print("ERROR: Could not find <svg ...</svg>")

