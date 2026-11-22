"""Rebuild the Open Source cards and counts in index.html from GitHub (upstream PRs by sayaksatpathi).
Merged first, then open non-draft PRs; closed-unmerged and own-repo PRs are left out. Run by .github/workflows/refresh.yml.
Usage: python scripts/refresh_oss.py [index.html]"""
import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request

USER = "sayaksatpathi"


def search(q):
    req = urllib.request.Request(f"https://api.github.com/search/issues?per_page=100&q={urllib.parse.quote(q)}",
                                 headers={"Accept": "application/vnd.github+json",
                                          **({"Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}"} if os.environ.get("GITHUB_TOKEN") else {})})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)["items"]  # the query's -user: already leaves out his own repos


def card(i, merged):
    repo = "/".join(i["repository_url"].split("/")[-2:])
    hover, badge = (("hover:border-purple-500", '<span class="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-semibold inline-flex items-center gap-1"><i data-lucide="git-merge" class="w-3 h-3"></i> Merged</span>')
                    if merged else
                    ("hover:border-gray-500", '<span class="bg-gray-600/40 text-gray-300 px-2 py-1 rounded text-xs font-semibold inline-flex items-center gap-1"><i data-lucide="git-pull-request" class="w-3 h-3"></i> In review</span>'))
    return f"""                                <a href="{html.escape(i['html_url'])}" target="_blank" rel="noopener noreferrer" class="reveal block bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 {hover} rounded-2xl p-5 transition-all duration-500">
                                    <div class="flex items-center justify-between gap-3 mb-3">
                                        <span class="text-sm font-bold text-white truncate">{html.escape(repo)}</span>
                                        {badge}
                                    </div>
                                    <p class="text-sm text-gray-400 leading-relaxed">{html.escape(i['title'])} <span class="text-gray-500">#{i['number']}</span></p>
                                </a>
"""


def render(page, merged, review):
    cards = "\n".join([card(i, True) for i in merged] + [card(i, False) for i in review])
    page, n1 = re.subn(r"<!-- oss:cards -->.*?<!-- /oss:cards -->",  # whole block replaced: same input, same output
                       lambda m: "<!-- oss:cards -->\n" + cards.rstrip("\n") + "\n<!-- /oss:cards -->", page, flags=re.S)
    page, n2 = re.subn(r"<!-- oss:count -->.*?<!-- /oss:count -->",
                       f"<!-- oss:count -->( {len(merged)} MERGED &middot; {len(review)} IN REVIEW )<!-- /oss:count -->", page)
    page, n3 = re.subn(r"<!-- oss:line -->.*?<!-- /oss:line -->",
                       f"<!-- oss:line -->{len(merged)} pull requests merged upstream and {len(review)} in review<!-- /oss:line -->", page)
    assert n1 == n2 == n3 == 1, "markers missing in index.html"
    return page


def main(path="index.html"):
    merged = sorted(search(f"author:{USER} is:pr is:merged -user:{USER}"), key=lambda i: i["closed_at"], reverse=True)
    review = sorted(search(f"author:{USER} is:pr is:open draft:false -user:{USER}"), key=lambda i: i["created_at"], reverse=True)
    if not merged:
        sys.exit("GitHub returned no merged PRs: refusing to blank the section")
    page = open(path, encoding="utf-8", newline="").read()
    new = render(page, merged, review)
    if new != page:
        open(path, "w", encoding="utf-8", newline="").write(new)
    print(f"{len(merged)} merged, {len(review)} in review, {'changed' if new != page else 'unchanged'}")


if __name__ == "__main__":
    main(*sys.argv[1:])
