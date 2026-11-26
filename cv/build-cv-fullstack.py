"""Build the Full-Stack Web Developer CV with the same contacts, credentials and renderers as the AI CV."""

from importlib import import_module

cv = import_module("build-cv")

BASENAME = "Bui-Gia-Uy-CV-FullStack"
HEADLINE = "Full-Stack Web Developer | TypeScript, NestJS & Next.js"
SUMMARY = (
    "Full-Stack Web Developer with production experience since 2024. At Hoa Lan Cattleya, shipped "
    "e-commerce features across Next.js, TypeScript APIs and PostgreSQL; previously built internal "
    "mobile tools at Propway Vietnam. Backend Core & Testing on HR GENIE, a 4-person AI20K capstone "
    "with permission-aware retrieval and cited answers."
)

EXPERIENCE = (
    cv.HOA_LAN._replace(bullets=(
        "Built and maintained e-commerce features in Next.js and React, with NestJS REST APIs "
        "and Prisma queries against PostgreSQL.",
        "Traced and fixed production defects across the user interface, API and database.",
    )),
    cv.PROPWAY._replace(bullets=(
        "Built features for an internal Flutter app and integrated REST services written in Go, "
        "investigating undocumented API responses.",
        "Contributed registration and onboarding screens to the Vue.js web application.",
    )),
)

PROJECTS = (
    cv.Entry(
        cv.Link("Portfolio Backend | Project and view-tracking API", "https://github.com/BuiGiaUy/portfolio-backend"),
        "Personal project · Dec 2025",
        (
            "Built a NestJS API for managing projects and tracking views with Prisma and PostgreSQL. "
            "Added Redis-backed rate limits per IP address.",
            "Implemented optimistic and pessimistic locking for view counts. Wrote a Jest end-to-end test "
            "that sends 50 concurrent requests per strategy and checks that both counters reach 50.",
        ),
    ),
    cv.Entry(
        cv.Link("Wine E-Commerce | Storefront and order management", "https://github.com/BuiGiaUy/wine_website"),
        "TechMaster Vietnam project · 2024",
        (
            "Built a Laravel and MySQL storefront with a shopping cart, checkout and admin tools "
            "for managing products and orders.",
            "Signed VNPAY sandbox checkout requests with HMAC-SHA512 and used Pusher to deliver comments in real time.",
        ),
    ),
)
SKILLS = (
    "Backend and data — TypeScript, Node.js, NestJS, Prisma, PostgreSQL, Redis, PHP, Laravel",
    "Frontend and delivery — React, Next.js, Vue.js, Flutter, Jest, Docker, GitHub Actions",
    "AI integration — RAG, LangGraph, guardrails, evaluation",
)

if __name__ == "__main__":
    cv.main(BASENAME, HEADLINE, SUMMARY, PROJECTS, EXPERIENCE, SKILLS, projects_first=False)
