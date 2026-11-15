import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as plugin from '../lib/index.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SKILLS = path.join(ROOT, 'skills')
const EXPECTED = ['ask-coach', 'study-coach', 'study-doctor', 'study-podcast', 'study-recap']
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function listFiles(base, out = [], prefix = '') {
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    const rel = path.join(prefix, entry.name)
    if (entry.isDirectory()) listFiles(path.join(base, entry.name), out, rel)
    else out.push(rel)
  }
  return out
}

function walkMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walkMarkdown(p, out)
    else if (entry.name.endsWith('.md')) out.push(p)
  }
  return out
}

test('exports the cordis bundle shape', () => {
  assert.equal(plugin.name, 'ai-study-kit')
  assert.deepEqual(plugin.inject, ['skills'])
  assert.equal(typeof plugin.apply, 'function')
})

test('package.json declares a dsh.bundle patch and entry that exist', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
  assert.equal(pkg.name, 'dsh-ai-study-kit')
  assert.equal(pkg.type, 'module')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(fs.existsSync(path.join(ROOT, pkg.dsh.bundle.patch)), 'cordis.patch.yml missing')
  assert.equal(pkg.main, 'lib/index.js')
  assert.ok(fs.existsSync(path.join(ROOT, pkg.main)), 'lib/index.js missing')
  assert.ok(pkg.engines.dsh, 'engines.dsh missing')
})

test('cordis.patch.yml inserts this package under matching id/name', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
  const patch = fs.readFileSync(path.join(ROOT, 'cordis.patch.yml'), 'utf8')
  assert.match(patch, /insert:/)
  assert.match(patch, new RegExp('id: ' + pkg.name))
  assert.match(patch, new RegExp("name: '" + pkg.name + "'"))
})

test('skillDefinitions returns the five skills with correct policies', () => {
  const defs = plugin.skillDefinitions()
  assert.equal(defs.length, 5)
  assert.deepEqual(defs.map((d) => d.name), EXPECTED)
  for (const def of defs) {
    assert.match(def.name, SKILL_NAME)
    assert.ok(typeof def.description === 'string' && def.description.length > 0, `${def.name} description`)
    assert.ok(typeof def.content === 'string' && def.content.length > 0, `${def.name} content`)
    assert.ok(!def.content.startsWith('---'), `${def.name} frontmatter should be stripped`)
    assert.deepEqual(def.invocation, { modelInvocable: false, userInvocable: true })
    assert.equal(def.source, 'runtime')
    assert.equal(def.metadata.plugin, 'dsh-ai-study-kit')
    assert.equal(def.resourceBase.kind, 'directory')
    assert.equal(def.resourceBase.path, path.join(SKILLS, def.metadata.skillDir))
    assert.ok(fs.statSync(def.resourceBase.path).isDirectory(), `${def.name} resourceBase must be a directory`)
  }
})

test('each skill directory name matches its frontmatter name', () => {
  for (const entry of fs.readdirSync(SKILLS, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const { data } = plugin.parseFrontmatter(fs.readFileSync(path.join(SKILLS, entry.name, 'SKILL.md'), 'utf8'))
    assert.equal(data.name, entry.name)
    assert.match(data.name, SKILL_NAME)
  }
})

test('frontmatter parsing keeps descriptions with Chinese punctuation', () => {
  const { data, body } = plugin.parseFrontmatter(
    fs.readFileSync(path.join(SKILLS, 'study-doctor', 'SKILL.md'), 'utf8'),
  )
  assert.equal(data.name, 'study-doctor')
  assert.ok(data.description.startsWith('/study-doctor 一站式体检'), data.description)
  assert.equal(data['disable-model-invocation'], 'true')
  assert.ok(body.startsWith('# '), 'body should start at the markdown heading')
})

test('apply registers all five skills through ctx.effect and tears down', () => {
  const registered = []
  const disposed = []
  let cleanup
  const ctx = {
    effect(fn) {
      cleanup = fn()
      return cleanup
    },
    skills: {
      register(skill) {
        registered.push(skill)
        return () => disposed.push(skill.name)
      },
    },
    logger: { info() {}, warn() {} },
  }
  plugin.apply(ctx)
  assert.deepEqual(registered.map((s) => s.name), EXPECTED)
  assert.equal(typeof cleanup, 'function')
  cleanup()
  assert.deepEqual(disposed.slice().sort(), EXPECTED.slice().sort())
})

test('every relative markdown link in skills/ and references/ resolves', () => {
  const files = [...walkMarkdown(SKILLS), ...walkMarkdown(path.join(ROOT, 'references'))]
  const broken = []
  const linkRe = /\]\(([^)]+)\)/g
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    let match
    while ((match = linkRe.exec(text))) {
      const target = match[1].trim()
      if (!target || target.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.includes('<')) continue
      const clean = target.split('#')[0]
      if (!clean) continue
      const abs = path.resolve(path.dirname(file), clean)
      if (!fs.existsSync(abs)) broken.push(`${path.relative(ROOT, file)} -> ${clean}`)
    }
  }
  assert.deepEqual(broken, [], 'unresolved relative links: ' + broken.join('; '))
})

test('kit snapshot version exists and matches the changelog', () => {
  const kv = JSON.parse(fs.readFileSync(path.join(ROOT, 'kit/kit-version.json'), 'utf8'))
  assert.equal(kv.version, '0.28.0')
  const changelog = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8')
  assert.ok(changelog.includes(`## [${kv.version}]`), 'CHANGELOG should contain the kit version heading')
})

test('icon.png is a real PNG and locale metadata is complete', () => {
  const png = fs.readFileSync(path.join(ROOT, 'icon.png'))
  assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  for (const lang of ['en', 'zh']) {
    const j = JSON.parse(fs.readFileSync(path.join(ROOT, `locale/${lang}.json`), 'utf8'))
    assert.ok(j.meta.title && j.meta.description, `${lang} meta incomplete`)
  }
})

test(
  'copied skills/kit/references match upstream (paths + bytes, aside from documented link fix and privacy scrub)',
  { skip: !process.env.AI_STUDY_KIT_SRC ? 'set AI_STUDY_KIT_SRC to run the upstream integrity check' : false },
  () => {
    const src = process.env.AI_STUDY_KIT_SRC
    assert.ok(fs.existsSync(src), `AI_STUDY_KIT_SRC not found: ${src}`)
    const patched = new Set([
      path.join('skills', 'ask-coach', 'references', 'flows', 'F10.md'),
      path.join('skills', 'ask-coach', 'references', 'flows.md'),
      path.join('kit', 'apps', 'quiz-app', 'scripts', 'lib', 'theme-path.mjs'),
      path.join('kit', 'apps', 'quiz-app', 'scripts', 'lib', 'theme-path.test.mjs'),
    ])
    for (const sub of ['skills', 'kit', 'references']) {
      const srcFiles = listFiles(path.join(src, sub)).sort()
      const dstFiles = listFiles(path.join(ROOT, sub)).sort()
      assert.deepEqual(dstFiles, srcFiles, `${sub}: file set differs from upstream`)
      for (const rel of srcFiles) {
        if (patched.has(path.join(sub, rel))) continue
        const a = fs.readFileSync(path.join(src, sub, rel))
        const b = fs.readFileSync(path.join(ROOT, sub, rel))
        assert.ok(a.equals(b), `${sub}/${rel} differs from upstream`)
      }
    }
    const fixed = fs.readFileSync(path.join(ROOT, 'skills', 'ask-coach', 'references', 'flows', 'F10.md'), 'utf8')
    assert.ok(fixed.includes('](../../../../references/voice.md)'), 'documented link fix missing')
    assert.ok(!fixed.includes('](../voice.md)'), 'broken link still present')

    // privacy scrub: the original server username must be gone from all patched files
    for (const rel of patched) {
      const text = fs.readFileSync(path.join(ROOT, rel), 'utf8')
      assert.ok(!text.includes('/home/u/'), `personal server username still present in ${rel}`)
    }
    assert.ok(
      fs
        .readFileSync(path.join(ROOT, 'skills', 'ask-coach', 'references', 'flows.md'), 'utf8')
        .includes('/home/example-user/packs/<theme>'),
      'server path placeholder missing in flows.md',
    )
  },
)
