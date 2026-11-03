"""Bangun lib/data/officials.generated.ts dari daftar pejabat di Wikipedia bahasa Indonesia.

Cakupan:
  - Gubernur 38 provinsi
  - Bupati & wali kota di seluruh kabupaten/kota otonom
  - Anggota DPR RI periode 2024-2029 (anggota PAW terbaru per kursi)

Jalankan:  python tools/build_officials_data.py
Data mentah disimpan ke folder sementara; hanya file TS hasil yang ditulis ke repo.
"""

import json
import re
import sys
import tempfile
import time
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "lib" / "data" / "officials.generated.ts"
API = "https://id.wikipedia.org/w/api.php"
UA = "politrack-literasi-unej/1.0 (data pejabat publik)"

DPR_PAGE = "Daftar anggota Dewan Perwakilan Rakyat Republik Indonesia 2024–2029"
GOV_PAGE = "Daftar gubernur dan wakil gubernur di Indonesia"
REGIONAL_PAGE = "Daftar kepala daerah dan wakil kepala daerah petahana di {}"

# Nama provinsi mengikuti properti PROVINSI di public/geo/indonesia-provinces.geojson
PROVINCES = [
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan",
    "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau", "DKI Jakarta",
    "Jawa Barat", "Jawa Tengah", "Daerah Istimewa Yogyakarta", "Jawa Timur", "Banten",
    "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat",
    "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
    "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara",
    "Gorontalo", "Sulawesi Barat", "Maluku", "Maluku Utara", "Papua", "Papua Barat",
    "Papua Selatan", "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya",
]
PROVINCE_ALIASES = {"Daerah Khusus Ibukota Jakarta": "DKI Jakarta", "Daerah Khusus Jakarta": "DKI Jakarta"}

# Template warna partai di Wikipedia -> singkatan partai yang dipakai aplikasi
PARTY_TEMPLATES = {
    "Partai Gerakan Indonesia Raya": "Gerindra",
    "Partai Demokrasi Indonesia Perjuangan": "PDI-P",
    "Partai Golongan Karya": "Golkar",
    "Golkar": "Golkar",
    "Partai NasDem": "NasDem",
    "Partai Nasional Demokrat": "NasDem",
    "Partai Demokrat": "Demokrat",
    "Partai Amanat Nasional": "PAN",
    "Partai Kebangkitan Bangsa": "PKB",
    "Partai Keadilan Sejahtera (2020)": "PKS",
    "Partai Keadilan Sejahtera 2020": "PKS",
    "Partai Keadilan Sejahtera": "PKS",
    "Partai Persatuan Pembangunan": "PPP",
    "Partai Solidaritas Indonesia": "PSI",
    "Partai Persatuan Indonesia": "Perindo",
    "Partai Hati Nurani Rakyat": "Hanura",
    "Partai Bulan Bintang": "PBB",
    "Partai Aceh": "Partai Aceh",
    "Partai Nanggroe Aceh": "PNA",
    "Partai SIRA": "SIRA",
    "Partai Adil Sejahtera Aceh": "PAS Aceh",
    "Partai Darul Aceh": "PDA",
    "Partai Buruh (2021)": "Buruh",
    "Partai Kebangkitan Nusantara": "PKN",
    "Independen": "Independen",
    "Independent": "Independen",
    "Nonpartai": "Independen",
}

MONTHS = {m: i for i, m in enumerate(
    ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus",
     "september", "oktober", "november", "desember"], 1)}


# ---------------------------------------------------------------- fetching

def api_get(params):
    query = urllib.parse.urlencode({**params, "format": "json"})
    req = urllib.request.Request(f"{API}?{query}", headers={"User-Agent": UA})
    for attempt in range(6):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception:
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(f"Gagal mengambil {params}")


def fetch_wikitext(page, cache):
    path = cache / (re.sub(r"\W+", "_", page) + ".json")
    if path.exists():
        data = json.loads(path.read_text(encoding="utf-8"))
    else:
        data = api_get({"action": "parse", "page": page, "prop": "wikitext", "redirects": "1"})
        path.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
        time.sleep(2)
    if "parse" not in data:
        return None
    return data["parse"]["wikitext"]["*"]


def existing_articles(titles):
    """Kembalikan {judul asli: judul artikel akhir} untuk judul yang artikelnya ada."""
    found, titles = {}, sorted(set(t for t in titles if t))
    for i in range(0, len(titles), 50):
        batch = titles[i:i + 50]
        data = api_get({"action": "query", "titles": "|".join(batch), "redirects": "1"})
        q = data.get("query", {})
        mapping = {t: t for t in batch}
        for n in q.get("normalized", []):
            for k, v in mapping.items():
                if v == n["from"]:
                    mapping[k] = n["to"]
        for r in q.get("redirects", []):
            for k, v in mapping.items():
                if v == r["from"]:
                    mapping[k] = r["to"]
        ok = {p["title"] for p in q.get("pages", {}).values() if "missing" not in p and "invalid" not in p}
        for k, v in mapping.items():
            if v in ok:
                found[k] = v
        time.sleep(0.5)
    return found


# ---------------------------------------------------------------- wikitext helpers

def split_top(s, sep):
    """Pisahkan s pada sep, abaikan yang berada di dalam [[ ]] / {{ }}."""
    out, dl, dt, cur, i = [], 0, 0, "", 0
    while i < len(s):
        two = s[i:i + 2]
        if two == "[[": dl += 1; cur += two; i += 2; continue
        if two == "]]": dl = max(0, dl - 1); cur += two; i += 2; continue
        if two == "{{": dt += 1; cur += two; i += 2; continue
        if two == "}}": dt = max(0, dt - 1); cur += two; i += 2; continue
        if dl == 0 and dt == 0 and s.startswith(sep, i):
            out.append(cur); cur = ""; i += len(sep); continue
        cur += s[i]; i += 1
    out.append(cur)
    return out


def parse_cell(raw):
    parts = split_top(raw, "|")
    head = parts[0].strip()
    if len(parts) >= 2 and "=" in head and not head.startswith(("[[", "{{", "<", "'")):
        return {"attrs": parts[0], "text": "|".join(parts[1:]).strip()}
    if len(parts) >= 2 and head == "":
        return {"attrs": "", "text": "|".join(parts[1:]).strip()}
    return {"attrs": "", "text": raw.strip()}


def tables(wikitext):
    i = 0
    while True:
        s = wikitext.find("\n{|", i)
        if s < 0:
            return
        depth, j = 0, s + 1
        while j < len(wikitext):
            if wikitext.startswith("{|", j): depth += 1; j += 2; continue
            if wikitext.startswith("|}", j):
                depth -= 1; j += 2
                if depth == 0: break
                continue
            j += 1
        yield s, wikitext[s + 1:j]
        i = j


def data_rows(table):
    body = table.split("\n", 1)[1]
    for row in re.split(r"\n\|-[^\n]*", "\n" + body):
        cells, header = [], False
        for line in row.split("\n"):
            if line.startswith("|}"):
                break
            if line.startswith("!"):
                header = header or not cells
                cells.extend(split_top(line[1:], "!!"))
            elif line.startswith("|") and not line.startswith("|+"):
                cells.extend(split_top(line[1:], "||"))
            elif cells:
                cells[-1] += "\n" + line
        if cells and not header:
            yield [parse_cell(c) for c in cells]


def clean(text):
    t = re.sub(r"<ref[^>]*/>", "", text or "")
    t = re.sub(r"<ref[^>]*>.*?</ref>", "", t, flags=re.S)
    t = re.sub(r"\{\{refn.*?\}\}\}?", "", t, flags=re.S)
    t = re.sub(r"<small>.*?</small>", " ", t, flags=re.S)
    t = re.sub(r"\[\[(?:Berkas|File|Gambar):[^\]]*\]\]", "", t)
    t = re.sub(r"\[\[[^\]|]*\|([^\]]*)\]\]", r"\1", t)
    t = re.sub(r"\[\[([^\]]*)\]\]", r"\1", t)
    t = re.sub(r"\{\{[^{}]*\}\}", "", t)
    t = re.sub(r"<br\s*/?>", " ", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = t.replace("'''", "").replace("''", "").replace("&nbsp;", " ")
    t = re.sub(r"[​-‏⁠﻿]", "", t)
    return re.sub(r"\s+", " ", t).strip()


def link_target(text):
    m = re.search(r"\[\[(?!Berkas:|File:|Gambar:)([^\]|#]+)", text or "")
    return m.group(1).strip() if m else None


def image_of(text):
    m = re.search(r"\[\[(?:Berkas|File|Gambar):([^\]|]+)", text or "")
    return m.group(1).strip().replace("_", " ") if m else None


def is_image_only(text):
    return re.fullmatch(r"(\s*\[\[(?:Berkas|File|Gambar):[^\]]*\]\]\s*)+", text or "") is not None


def party_template(cell):
    m = re.search(r"\{\{\s*([^{}/]+?)\s*/meta/color\s*\}\}", cell["attrs"] + cell["text"])
    return m.group(1).strip() if m else None


def party_short(template):
    if template is None:
        return "Independen"
    lookup = {k.lower(): v for k, v in PARTY_TEMPLATES.items()}
    if template.lower() not in lookup:
        raise ValueError(f"Template partai belum dipetakan: {template}")
    return lookup[template.lower()]


def to_date(text):
    m = re.search(r"(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})", text)
    if m and m.group(2).lower() in MONTHS:
        return f"{m.group(3)}-{MONTHS[m.group(2).lower()]:02d}-{int(m.group(1)):02d}"
    return None


def province_name(name):
    name = PROVINCE_ALIASES.get(name, name)
    if name not in PROVINCES:
        raise ValueError(f"Provinsi tidak dikenal: {name}")
    return name


# ---------------------------------------------------------------- parsers

ACTING_RE = r"\((Pelaksana Tugas|Penjabat|Pelaksana Harian|Plt\.?|Pj\.?)[^)]*\)"


def parse_head_table(table):
    """Tabel kepala daerah: wilayah | foto | warna | kepala | foto | warna | wakil | mulai | selesai | ref."""
    for cells in data_rows(table):
        rec = {"region": None, "regionWiki": None, "name": None, "wiki": None, "photo": None,
               "party": None, "acting": None, "deputy": None, "deputyParty": None,
               "start": None, "end": None}
        colors = 0
        for c in cells:
            txt, ct = c["text"], clean(c["text"])
            if rec["region"] is None:
                region_txt = re.sub(r"<hr\s*/?>.*|\n?----.*", "", txt, flags=re.S)
                rec["region"] = clean(region_txt)
                rec["regionWiki"] = link_target(region_txt)
                continue
            if ("background" in c["attrs"] or "bgcolor" in c["attrs"]) and not ct:
                colors += 1
                key = "party" if colors == 1 else "deputyParty"
                rec[key] = party_short(party_template(c))
                continue
            if is_image_only(txt) or txt.strip() == "":
                if colors == 0 and rec["photo"] is None:
                    rec["photo"] = image_of(txt)
                continue
            d = to_date(ct)
            if d and colors >= 1 and not link_target(txt):
                if rec["start"] is None: rec["start"] = d
                elif rec["end"] is None: rec["end"] = d
                continue
            if txt.lstrip().startswith(("<ref", "{{")):
                continue
            acting = re.search(ACTING_RE, clean(re.sub(r"</?small>", "", txt)))
            name = re.sub(r"\s*" + ACTING_RE, "", ct).strip()
            if colors == 1 and rec["name"] is None:
                rec["name"], rec["wiki"] = name, link_target(txt)
                rec["acting"] = acting.group(1) if acting else None
            elif colors == 2 and rec["deputy"] is None and name.lower() not in ("lowong", "-", "—"):
                rec["deputy"] = name
        if rec["name"]:
            yield rec


def parse_dpr(wikitext):
    start = wikitext.find("== Daftar anggota menurut daerah pemilihan ==")
    heads = [(m.start(), clean(m.group(1))) for m in re.finditer(r"\n===\s*(.+?)\s*===", wikitext)]
    members, vacant = [], []
    for off, table in tables(wikitext):
        if off < start:
            continue
        heading = [h for o, h in heads if o < off][-1]
        if PROVINCE_ALIASES.get(heading, heading) not in PROVINCES:
            continue  # tabel navigasi/ringkasan, bukan daftar anggota
        province = province_name(heading)
        dapil, prev = None, None
        for cells in data_rows(table):
            rec = {"no": None, "name": None, "wiki": None, "photo": None, "commission": None,
                   "party": None, "votes": None, "note": []}
            for c in cells:
                txt, ct = c["text"], clean(c["text"])
                if party_template(c) and not ct:
                    rec["party"] = party_short(party_template(c)); continue
                if "(daerah pemilihan)" in txt:
                    dapil = ct; continue
                if rec["no"] is None and rec["name"] is None and re.fullmatch(r"(<center>)?\s*\d{1,3}\s*(</center>)?", txt.strip()):
                    rec["no"] = int(re.sub(r"\D", "", txt)); continue
                if is_image_only(txt):
                    rec["photo"] = image_of(txt); continue
                if re.match(r"\[\[Komisi [IVXL]+", txt.strip()) or re.fullmatch(r"Komisi [IVXL]+", ct):
                    rec["commission"] = ct; continue
                target = link_target(txt)
                if target and target.startswith("Partai ") and rec["name"] is not None:
                    continue
                if rec["name"] is not None and re.fullmatch(r"[\d.]+", ct):
                    rec["votes"] = int(ct.replace(".", "")); continue
                if rec["name"] is None and ct and rec["commission"] is None:
                    rec["name"], rec["wiki"] = ct, target; continue
                if ct:
                    rec["note"].append(ct)
            if rec["name"] is None:
                continue
            rec["note"] = " ".join(rec["note"])[:160] or None
            rec["dapil"], rec["province"] = dapil, province
            if rec["no"] is None and prev is not None:
                # Baris lanjutan = anggota pengganti antarwaktu (PAW) pada kursi yang sama
                for k in ("no", "commission", "party"):
                    rec[k] = rec[k] if rec[k] is not None else prev[k]
                rec["replacing"] = prev["replacing"] + [prev["name"]]
                members[-1] = rec
            else:
                rec["replacing"] = []
                members.append(rec)
            prev = rec
    seated = []
    for m in members:
        if "belum dilantik" in m["name"].lower():
            vacant.append(m)
        else:
            seated.append(m)
    return seated, vacant


# ---------------------------------------------------------------- output

def slugify(text):
    text = text.lower().replace("'", "")
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def assign_slugs(records):
    """Slug dari nama; nama kembar diberi akhiran wilayah/dapil agar unik."""
    counts = {}
    for r in records:
        counts[slugify(r["name"])] = counts.get(slugify(r["name"]), 0) + 1
    for r in records:
        base = slugify(r["name"])
        r["slug"] = base if counts[base] == 1 else f"{base}-{slugify(r.get('region') or r['dapil'])}"


def main():
    cache = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(tempfile.mkdtemp(prefix="politrack-wiki-"))
    cache.mkdir(parents=True, exist_ok=True)
    today = date.today().isoformat()

    heads = []
    gov_text = fetch_wikitext(GOV_PAGE, cache)
    for off, table in tables(gov_text):
        for rec in parse_head_table(table):
            rec["kind"] = "gubernur"
            rec["province"] = province_name(rec["region"])
            rec["region"] = rec["province"]
            heads.append(rec)

    for prov in PROVINCES:
        page_prov = "Daerah Khusus Jakarta" if prov == "DKI Jakarta" else prov
        text = fetch_wikitext(REGIONAL_PAGE.format(page_prov), cache)
        if text is None:  # DKI Jakarta tidak memiliki kabupaten/kota otonom
            continue
        for off, table in tables(text):
            for rec in parse_head_table(table):
                if rec["region"].startswith("Kabupaten "):
                    rec["kind"] = "bupati"
                elif rec["region"].startswith("Kota "):
                    rec["kind"] = "wali_kota"
                else:
                    continue
                rec["province"] = prov
                heads.append(rec)

    dpr, vacant = parse_dpr(fetch_wikitext(DPR_PAGE, cache))

    articles = existing_articles([r["wiki"] for r in heads + dpr])
    for r in heads + dpr:
        r["wiki"] = articles.get(r["wiki"])

    assign_slugs(heads + dpr)

    kinds = {k: sum(1 for r in heads if r["kind"] == k) for k in ("gubernur", "bupati", "wali_kota")}
    print(kinds, "DPR:", len(dpr), "kursi kosong:", [(v["dapil"], v["replacing"]) for v in vacant])

    head_keys = ["kind", "slug", "name", "region", "province", "party", "acting", "deputy",
                 "deputyParty", "start", "end", "wiki", "photo"]
    dpr_keys = ["no", "slug", "name", "province", "dapil", "party", "commission", "votes",
                "note", "replacing", "wiki", "photo"]

    def emit(rec, keys):
        obj = {k: rec[k] for k in keys if rec.get(k) not in (None, [], "")}
        return "  " + json.dumps(obj, ensure_ascii=False) + ","

    lines = [
        "// File ini dibuat otomatis oleh tools/build_officials_data.py — jangan diedit manual.",
        "// Sumber: Wikipedia bahasa Indonesia (daftar kepala daerah petahana & anggota DPR RI 2024–2029).",
        'import type { DprMemberRecord, RegionalHeadRecord } from "./officials";',
        "",
        f'export const OFFICIALS_ACCESSED_AT = "{today}";',
        f"export const DPR_LIST_PAGE = {json.dumps(DPR_PAGE, ensure_ascii=False)};",
        "",
        "export const vacantDprSeats: { dapil: string; party: string; previous: string[] }[] = [",
        *[emit({"dapil": v["dapil"], "party": v["party"], "previous": v["replacing"]}, ["dapil", "party", "previous"]) for v in vacant],
        "];",
        "",
        "export const regionalHeadRecords: RegionalHeadRecord[] = [",
        *[emit(r, head_keys) for r in heads],
        "];",
        "",
        "export const dprMemberRecords: DprMemberRecord[] = [",
        *[emit(r, dpr_keys) for r in sorted(dpr, key=lambda m: m["no"])],
        "];",
        "",
    ]
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print("Ditulis:", OUT.relative_to(ROOT))


if __name__ == "__main__":
    main()
