"""Build the AI Engineer CV in Markdown, HTML, DOCX and PDF."""

from __future__ import annotations

import html
import os
from itertools import groupby
from pathlib import Path
from shutil import copyfile
from tempfile import TemporaryDirectory
from typing import NamedTuple

import reportlab
from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Mm, Pt, RGBColor
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate


CV_DIR = Path(__file__).resolve().parent
ROOT = CV_DIR.parent
PDF_DIR = ROOT / "assets" / "cv"
NAME = "Bùi Gia Uy"


class Link(NamedTuple):
    label: str
    url: str


class Entry(NamedTuple):
    title: str | Link
    detail: str
    bullets: tuple[str, ...]


class Line(NamedTuple):
    kind: str
    parts: tuple[str | Link, ...]


EMAIL = Link("giauy0987@gmail.com", "mailto:giauy0987@gmail.com")
PHONE = Link("+84 947 879 049", "tel:+84947879049")
GITHUB = Link("github.com/BuiGiaUy", "https://github.com/BuiGiaUy")
LINKEDIN = Link("linkedin.com/in/uy-gia", "https://www.linkedin.com/in/uy-gia/")
PORTFOLIO = Link("Portfolio repository", "https://github.com/BuiGiaUy/portfolio-")
CREDENTIAL = Link("1MZD8JNIZC", "https://verify.w3schools.com/1MZD8JNIZC")

BASENAME = "Bui-Gia-Uy-CV"
HEADLINE = "AI Engineer | LLM & RAG Systems"
SUMMARY = (
    "AI Engineer focused on RAG and backend platforms, with production experience since 2024. "
    "Backend Core & Testing on HR GENIE, a 4-person AI20K capstone: NestJS core, RBAC and "
    "pgvector retrieval."
)

PROJECTS = (
    Entry(
        "HR GENIE | HR policy assistant",
        "AI20K capstone · 4-person team · Aug 2026 – Present",
        (
            "Backend Core & Testing: initialized the NestJS core, Dockerized PostgreSQL + pgvector "
            "and the first RAG agent in a 3-service Next.js, NestJS and FastAPI/LangGraph stack.",
            "Built JWT/RBAC, admin/analytics, append-only audit logs, ticket/conversation modules and "
            "CI; co-owned integration testing (1,036 Python + 417 NestJS tests).",
            "Integrated the FastAPI/LangGraph agent behind the NestJS API with an internal service "
            "token and typed request contracts; project's 65-case intent eval at 64/65 (98.46%).",
        ),
    ),
    Entry(
        Link("Colosseum | Agent gateway", "https://github.com/BuiGiaUy/Track2-Day26-2A202601867-BuiGiaUy"),
        "VinUniversity, Track 2 lab · 2026",
        (
            "Implemented a Python gateway that checked permissions and budgets before forwarding agent tool calls.",
            "Added checks for source citations and sensitive data, with a recorded reason when the agent abstained.",
        ),
    ),
)

HOA_LAN = Entry(
    "Hoa Lan Cattleya E-Commerce Co., Ltd",
    "Junior Full-Stack Developer · Mar 2026 – Jul 2026 · Ho Chi Minh City",
    (
        "Developed NestJS APIs with Prisma and PostgreSQL for production e-commerce applications.",
        "Built and maintained Next.js and React interfaces, and resolved issues across the UI, API and database.",
    ),
)
PROPWAY = Entry(
    "Propway Vietnam",
    "Junior Full-Stack Developer (Web and Flutter) · Jun 2024 – Sep 2025 · Ho Chi Minh City",
    (
        "Connected an internal Flutter app to REST APIs, including services written in Go.",
        "Investigated undocumented API behavior and contributed registration and onboarding screens in Vue.js.",
    ),
)
EXPERIENCE = (HOA_LAN, PROPWAY)
SKILLS = (
    "AI / LLM — RAG, hybrid retrieval, reranking, guardrails, Python, FastAPI, LangGraph, LangChain, pgvector",
    "Application development and delivery — TypeScript, NestJS, Next.js, PostgreSQL, Docker, GitHub Actions",
)
EDUCATION = (
    ("AI20K, AI Engineering & Product Build (Cohort 3) · Vingroup × VinUniversity · Aug 2026 – Present",),
    ("Professional Certificate in PHP Full-Stack Web Development · TechMaster Vietnam · 2023–2024",),
    ("Information Technology, undergraduate coursework · Industrial University of Ho Chi Minh City · 2021–2023",),
    ("Certified React Developer · W3Schools · Sep 2022 · Credential ", CREDENTIAL),
)
LANGUAGES = "Vietnamese (native) · English (technical reading and writing)"


def entry_lines(heading: str, entries: tuple[Entry, ...]) -> list[Line]:
    result = [Line("section", (heading,))]
    for entry in entries:
        result.append(Line("entry", (entry.title,)))
        result.append(Line("meta", (entry.detail,)))
        result.extend(Line("bullet", (text,)) for text in entry.bullets)
    return result


def cv_lines(headline, summary, projects, experience, skills, projects_first) -> list[Line]:
    lines = [
        Line("name", (NAME,)),
        Line("headline", (headline,)),
        Line("contact", ("Ho Chi Minh City, Vietnam · ", PHONE, " · ", EMAIL)),
        Line("contact", (GITHUB, " · ", LINKEDIN, " · ", PORTFOLIO)),
        Line("profile", (summary,)),
    ]
    work = entry_lines("Professional Experience", experience)
    project_lines = entry_lines("Selected Projects", projects)
    lines.extend(project_lines + work if projects_first else work + project_lines)
    lines.append(Line("section", ("Technical Skills",)))
    lines.extend(Line("detail", (skill,)) for skill in skills)
    lines.append(Line("section", ("Education and Certifications",)))
    lines.extend(Line("detail", parts) for parts in EDUCATION)
    lines.append(Line("section", ("Languages",)))
    lines.append(Line("detail", (LANGUAGES,)))
    return lines


def markdown_text(parts: tuple[str | Link, ...]) -> str:
    return "".join(f"[{part.label}]({part.url})" if isinstance(part, Link) else part for part in parts)


def build_markdown(lines: list[Line]) -> str:
    blocks = []
    prefixes = {"name": "# ", "section": "## ", "entry": "### "}
    for bullets, group in groupby(lines, key=lambda line: line.kind == "bullet"):
        if bullets:
            blocks.append("\n".join("- " + markdown_text(line.parts) for line in group))
        else:
            blocks.extend(prefixes.get(line.kind, "") + markdown_text(line.parts) for line in group)
    return "\n\n".join(blocks) + "\n"


class TextStyle(NamedTuple):
    size: float
    leading: float
    before: float = 0
    after: float = 0
    bold: bool = False


STYLES = {
    "name": TextStyle(26, 31, after=1, bold=True),
    "headline": TextStyle(14, 18, after=4, bold=True),
    "contact": TextStyle(9.5, 12.5),
    "profile": TextStyle(10.5, 14, before=7),
    "section": TextStyle(13, 16, before=9, after=2, bold=True),
    "entry": TextStyle(11, 14, before=3, bold=True),
    "meta": TextStyle(9.5, 12.5, after=2),
    "bullet": TextStyle(10.5, 13.5, after=2),
    "detail": TextStyle(10, 13, after=1.5),
}
HEADINGS = {"name": 0, "section": 1, "entry": 2}
SIDE_MARGIN_MM = 17
VERTICAL_MARGIN_MM = 15


def markup(parts: tuple[str | Link, ...], *, pdf: bool = False) -> str:
    pieces = []
    for part in parts:
        if isinstance(part, Link):
            label = html.escape(part.label)
            url = html.escape(part.url, quote=True)
            pieces.append(f'<link href="{url}"><u>{label}</u></link>' if pdf else f'<a href="{url}">{label}</a>')
        else:
            pieces.append(html.escape(part))
    return "".join(pieces)


def build_html(lines: list[Line], headline: str) -> str:
    blocks = []
    for bullets, group in groupby(lines, key=lambda line: line.kind == "bullet"):
        if bullets:
            items = (f'  <li class="bullet">{markup(line.parts)}</li>' for line in group)
            blocks.append("<ul>\n" + "\n".join(items) + "\n</ul>")
        else:
            for line in group:
                tag = f"h{HEADINGS[line.kind] + 1}" if line.kind in HEADINGS else "p"
                blocks.append(f'<{tag} class="{line.kind}">{markup(line.parts)}</{tag}>')
    type_rules = "\n".join(
        f".{key} {{ font-size: {s.size}pt; line-height: {s.leading}pt; "
        f"margin: {s.before}pt 0 {s.after}pt; font-weight: {700 if s.bold else 400}; }}"
        for key, s in STYLES.items()
    )
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(NAME)} | {html.escape(headline)}</title>
<style>
* {{ box-sizing: border-box; }}
body {{ margin: 0; color: #111; background: #f1f1f1; font-family: Arial, Helvetica, sans-serif; }}
main {{ max-width: 210mm; margin: 6mm auto; padding: {VERTICAL_MARGIN_MM}mm {SIDE_MARGIN_MM}mm; background: white; }}
a {{ color: inherit; text-decoration: underline; text-underline-offset: .1em; overflow-wrap: anywhere; }}
ul {{ margin: 0; padding-left: 14pt; }}
{type_rules}
@media screen and (max-width: 600px) {{
  main {{ margin: 0; padding: 20px; }}
  .profile, .detail, .bullet {{ font-size: 11pt; line-height: 1.4; }}
}}
@page {{ size: A4; margin: {VERTICAL_MARGIN_MM}mm {SIDE_MARGIN_MM}mm; }}
@media print {{
  body {{ background: white; }}
  main {{ max-width: none; margin: 0; padding: 0; }}
  h1, h2, h3, .meta {{ break-after: avoid; }}
  li {{ break-inside: avoid; }}
}}
</style>
</head>
<body>
<main>
{chr(10).join(blocks)}
</main>
</body>
</html>
"""


WORD_STYLES = {
    "name": "Title", "section": "Heading 1", "entry": "Heading 2", "bullet": "List Bullet",
}


def build_docx(path: Path, lines: list[Line], headline: str) -> None:
    doc = Document()
    doc.core_properties.title = f"{NAME} | {headline}"
    doc.core_properties.author = NAME
    doc.core_properties.subject = headline
    doc.core_properties.comments = ""
    section = doc.sections[0]
    section.page_width, section.page_height = Mm(210), Mm(297)
    section.left_margin = section.right_margin = Mm(SIDE_MARGIN_MM)
    section.top_margin = section.bottom_margin = Mm(VERTICAL_MARGIN_MM)

    styles = {}
    for key, spec in STYLES.items():
        style_name = WORD_STYLES.get(key, f"CV {key.title()}")
        if style_name in doc.styles:
            style = doc.styles[style_name]
        else:
            style = doc.styles.add_style(style_name, WD_STYLE_TYPE.PARAGRAPH)
        style.font.name = "Arial"
        style.font.size = Pt(spec.size)
        style.font.bold = spec.bold
        style.font.color.rgb = RGBColor.from_string("111111")
        # Built-in heading styles otherwise prefer the Word theme font and title border.
        fonts = style.element.rPr.rFonts
        for attr in tuple(fonts.attrib):
            if attr.lower().endswith("theme"):
                del fonts.attrib[attr]
        for border in style.element.xpath("w:pPr/w:pBdr"):
            border.getparent().remove(border)
        fmt = style.paragraph_format
        fmt.line_spacing = Pt(spec.leading)
        fmt.space_before, fmt.space_after = Pt(spec.before), Pt(spec.after)
        fmt.keep_with_next = key in (*HEADINGS, "meta")
        if key == "bullet":
            fmt.left_indent, fmt.first_line_indent = Pt(14), Pt(-14)
        styles[key] = style

    for line in lines:
        paragraph = doc.add_paragraph(style=styles[line.kind])
        for part in line.parts:
            if isinstance(part, Link):
                run = paragraph.add_run(part.label)
                run.underline = True
                link = OxmlElement("w:hyperlink")
                link.set(qn("r:id"), paragraph.part.relate_to(part.url, RT.HYPERLINK, is_external=True))
                link.append(run._r)
                paragraph._p.append(link)
            else:
                paragraph.add_run(part)
    doc.save(path)


def register_pdf_fonts() -> None:
    # Prefer Arial or its metric-compatible equivalent. ReportLab ships the last
    # pair with its wheel, so machines without system fonts can still embed Unicode.
    candidates = []
    if windows_dir := os.environ.get("WINDIR"):
        candidates.append((Path(windows_dir) / "Fonts", "arial.ttf", "arialbd.ttf"))
    candidates.extend((
        (Path("/System/Library/Fonts/Supplemental"), "Arial.ttf", "Arial Bold.ttf"),
        (Path("/usr/share/fonts/truetype/liberation2"), "LiberationSans-Regular.ttf", "LiberationSans-Bold.ttf"),
        (Path(reportlab.__file__).parent / "fonts", "Vera.ttf", "VeraBd.ttf"),
    ))
    for folder, regular, bold in candidates:
        if (folder / regular).is_file() and (folder / bold).is_file():
            pdfmetrics.registerFont(TTFont("CVSans", str(folder / regular)))
            pdfmetrics.registerFont(TTFont("CVSansBold", str(folder / bold)))
            return
    raise RuntimeError("The ReportLab installation is missing its bundled Vera fonts.")


class PDFHeading(Paragraph):
    def __init__(self, text, style, key, level):
        super().__init__(text, style)
        self.key, self.level = key, level

    def draw(self):
        self.canv.bookmarkHorizontal(self.key, 0, self.height)
        self.canv.addOutlineEntry(self.getPlainText(), self.key, level=self.level)
        super().draw()


def build_pdf(path: Path, lines: list[Line], headline: str) -> None:
    register_pdf_fonts()
    styles = {
        key: ParagraphStyle(
            key, fontName="CVSansBold" if spec.bold else "CVSans", fontSize=spec.size, leading=spec.leading,
            spaceBefore=spec.before, spaceAfter=spec.after, textColor=colors.HexColor("#111111"),
            leftIndent=14 if key == "bullet" else 0, bulletFontName="CVSans", bulletFontSize=spec.size,
            keepWithNext=key in (*HEADINGS, "meta"),
        )
        for key, spec in STYLES.items()
    }
    story = []
    for i, line in enumerate(lines):
        rich = markup(line.parts, pdf=True)
        if line.kind in HEADINGS:
            story.append(PDFHeading(rich, styles[line.kind], f"heading-{i}", HEADINGS[line.kind]))
        else:
            story.append(Paragraph(rich, styles[line.kind], bulletText="•" if line.kind == "bullet" else None))
    pdf = SimpleDocTemplate(
        str(path), pagesize=A4, title=f"{NAME} | {headline}", author=NAME, subject=headline,
        leftMargin=SIDE_MARGIN_MM * mm, rightMargin=SIDE_MARGIN_MM * mm,
        topMargin=VERTICAL_MARGIN_MM * mm, bottomMargin=VERTICAL_MARGIN_MM * mm,
    )
    pdf.build(story)
    if pdf.page != 1:
        raise ValueError(f"{path.name} spans {pdf.page} pages. Shorten the CV before publishing.")


def publish(stage: Path, outputs: list[Path]) -> None:
    replaced = []
    try:
        for path in outputs:
            if path.exists():
                copyfile(path, stage / (path.name + ".previous"))
            (stage / path.name).replace(path)
            replaced.append(path)
    except OSError:
        # An open DOCX can block replacement on Windows after earlier formats were updated.
        for path in reversed(replaced):
            previous = stage / (path.name + ".previous")
            if previous.exists():
                previous.replace(path)
            else:
                path.unlink()
        raise


def main(basename=BASENAME, headline=HEADLINE, summary=SUMMARY, projects=PROJECTS,
         experience=EXPERIENCE, skills=SKILLS, *, projects_first=True) -> None:
    lines = cv_lines(headline, summary, projects, experience, skills, projects_first)
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    outputs = [CV_DIR / f"{basename}.{ext}" for ext in ("md", "html", "docx")]
    outputs.append(PDF_DIR / f"{basename}.pdf")
    # Finish all renderers and the page check before replacing published files.
    with TemporaryDirectory(prefix=".build-", dir=CV_DIR) as staging:
        stage = Path(staging)
        (stage / outputs[0].name).write_text(build_markdown(lines), encoding="utf-8")
        (stage / outputs[1].name).write_text(build_html(lines, headline), encoding="utf-8")
        build_docx(stage / outputs[2].name, lines, headline)
        build_pdf(stage / outputs[3].name, lines, headline)
        publish(stage, outputs)
    for path in outputs:
        print(f"Built {path.relative_to(ROOT)} ({path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
