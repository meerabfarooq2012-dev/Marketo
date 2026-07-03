'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  ShoppingCart,
  ClipboardPaste,
  ListPlus,
  Upload,
  Plus,
  Trash2,
  Wand2,
  Loader2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'

type Source = 'paste' | 'qa' | 'file' | 'manual'

interface BasketItem {
  id: string
  source: Source
  sourceLabel: string | null
  rawContent: string
  status: 'pending' | 'processed' | 'error'
  itemCount: number
  errorMsg: string | null
  producedItems: number
  createdAt: string
}

interface BasketTabProps {
  onChanged: () => void
}

const SOURCE_META: Record<Source, { label: string; urdu: string; icon: typeof ShoppingCart; color: string }> = {
  paste: { label: 'Paste Text', urdu: 'Text chipkaayein', icon: ClipboardPaste, color: 'amber' },
  qa: { label: 'Q&A Pairs', urdu: 'Sawaal-jawab', icon: ListPlus, color: 'emerald' },
  file: { label: 'Upload File', urdu: 'File daalein', icon: Upload, color: 'sky' },
  manual: { label: 'Manual Add', urdu: 'Khud likhein', icon: Plus, color: 'rose' },
}

const FORMAT_EXAMPLES = `Yeh format auto-detect hote hain:

1. Q&A PAIRS (har sawaal/jawab alag line):
Q: What is photosynthesis?
A: Plants ka process jis mein wo sunlight se food banate hain.

Q: Gravity kya hai?
A: Ek force jo objects ko earth ki taraf kheenchta hai.

2. DEFINITIONS (term: definition):
Photosynthesis: plants ka food-banane ka process.
Gravity: force jo objects ko pull karta hai.

3. PIPE SEPARATED (ek line = ek pair):
what is photosynthesis | plants ka food-banane ka process

4. PARAGRAPHS (blank line se alag):
Photosynthesis ek process hai jis mein plants...

Gravity ek force hai jo...

5. JSON ARRAY:
[{"question":"what is x","answer":"x is..."}]

6. CSV (header row required):
question,answer,topic,keywords`

export function BasketTab({ onChanged }: BasketTabProps) {
  const [basket, setBasket] = useState<BasketItem[]>([])
  const [loadingList, setLoadingList] = useState(true)
  const [activeSource, setActiveSource] = useState<Source>('paste')
  const [processing, setProcessing] = useState(false)

  // paste form
  const [pasteText, setPasteText] = useState('')
  const [pasteLabel, setPasteLabel] = useState('')

  // qa form
  const [qaRows, setQaRows] = useState<Array<{ q: string; a: string }>>([
    { q: '', a: '' },
    { q: '', a: '' },
    { q: '', a: '' },
  ])

  // manual form
  const [manualQ, setManualQ] = useState('')
  const [manualA, setManualA] = useState('')
  const [manualTopic, setManualTopic] = useState('general')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')

  const loadBasket = useCallback(async () => {
    try {
      const res = await fetch('/api/triza/basket')
      const data = await res.json()
      setBasket(data.basket || [])
    } catch {
      toast.error('Basket load nahi hua')
    } finally {
      setLoadingList(false)
    }
  }, [])

  // initial load
  useEffect(() => {
    loadBasket()
  }, [loadBasket])

  const pending = basket.filter((b) => b.status === 'pending')
  const totalPendingItems = pending.reduce((s, b) => s + b.itemCount, 0)

  async function addToBasket(source: Source, rawContent: string, label?: string, meta?: Record<string, unknown>) {
    if (!rawContent.trim()) {
      toast.error('Khaali content nahi chalega')
      return
    }
    try {
      const res = await fetch('/api/triza/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, rawContent, sourceLabel: label || undefined, meta }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'failed')
      toast.success(`Tokri mein dhal diya! ~${data.itemCount} items banenge (format: ${data.previewFormat})`)
      // reset relevant form
      if (source === 'paste') {
        setPasteText('')
        setPasteLabel('')
      } else if (source === 'qa') {
        setQaRows([
          { q: '', a: '' },
          { q: '', a: '' },
          { q: '', a: '' },
        ])
      } else if (source === 'manual') {
        setManualQ('')
        setManualA('')
      } else if (source === 'file') {
        setFileName('')
      }
      await loadBasket()
      onChanged()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Add nahi hua')
    }
  }

  function submitPaste() {
    addToBasket('paste', pasteText, pasteLabel || undefined)
  }

  function submitQa() {
    const valid = qaRows.filter((r) => r.q.trim() && r.a.trim())
    if (valid.length === 0) {
      toast.error('Kam az kam ek Q&A pair bharhein')
      return
    }
    const raw = valid
      .map((r) => `Q: ${r.q.trim()}\nA: ${r.a.trim()}`)
      .join('\n\n')
    addToBasket('qa', raw, `${valid.length} Q&A pairs`, { format: 'qa', count: valid.length })
  }

  function submitManual() {
    if (!manualQ.trim() || !manualA.trim()) {
      toast.error('Question aur answer dono chahiye')
      return
    }
    const raw = `Q: ${manualQ.trim()}\nA: ${manualA.trim()}`
    addToBasket('manual', raw, manualTopic ? `Manual: ${manualTopic}` : 'Manual', {
      format: 'manual',
      topic: manualTopic,
    })
  }

  async function onFileSelected(file: File) {
    setFileName(file.name)
    const text = await file.text()
    addToBasket('file', text, file.name, { format: 'file', filename: file.name, size: file.size })
  }

  async function processBasket() {
    if (pending.length === 0) {
      toast.info('Tokri khaali hai — pehle kuch daalein')
      return
    }
    setProcessing(true)
    try {
      const res = await fetch('/api/triza/basket/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'failed')
      const msg =
        data.addedItems > 0
          ? `Ho gaya! ${data.processedChunks} chunks process hue, ${data.addedItems} naye items seekh liye.`
          : 'Process hua lekin koi item nahi bana — format check karein.'
      toast.success(msg)
      await loadBasket()
      onChanged()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Process nahi hua')
    } finally {
      setProcessing(false)
    }
  }

  async function deleteBasketItem(id: string) {
    try {
      await fetch(`/api/triza/basket/${id}?keepItems=0`, { method: 'DELETE' })
      toast.success('Tokri se hata diya')
      await loadBasket()
      onChanged()
    } catch {
      toast.error('Delete nahi hua')
    }
  }

  async function clearPending() {
    if (pending.length === 0) return
    try {
      const res = await fetch('/api/triza/basket?clear=all', { method: 'DELETE' })
      const data = await res.json()
      toast.success(`${data.cleared} pending chunks hata diye`)
      await loadBasket()
      onChanged()
    } catch {
      toast.error('Clear nahi hua')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
      {/* LEFT: input panel (3 cols) */}
      <div className="lg:col-span-3 space-y-4">
        <Card className="border-emerald-200/60 dark:border-emerald-900/40">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
              Tokri mein dalo
              <span className="text-xs font-normal text-muted-foreground">
                (alag jagah se collect karo)
              </span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Bache ki tarah — alag-alag jagah se knowledge uthao aur ek hi tokri mein dalo.
              Phir &quot;Process&quot; se sab seekh jayega.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Source selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(SOURCE_META) as Source[]).map((s) => {
                const meta = SOURCE_META[s]
                const Icon = meta.icon
                const active = activeSource === s
                return (
                  <button
                    key={s}
                    onClick={() => setActiveSource(s)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                      active
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-sm'
                        : 'border-border bg-background hover:border-emerald-300 hover:bg-emerald-50/40'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-muted-foreground'}`}
                    />
                    <span
                      className={`text-xs font-medium ${active ? 'text-emerald-700 dark:text-emerald-400' : 'text-foreground'}`}
                    >
                      {meta.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{meta.urdu}</span>
                  </button>
                )
              })}
            </div>

            {/* PASTE source */}
            {activeSource === 'paste' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="paste-label" className="text-xs">
                    Label (optional)
                  </Label>
                  <Input
                    id="paste-label"
                    value={pasteLabel}
                    onChange={(e) => setPasteLabel(e.target.value)}
                    placeholder="e.g. Science notes, FAQ page, ..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="paste-text" className="text-xs">
                    Raw text — format auto-detect ho jayega
                  </Label>
                  <Textarea
                    id="paste-text"
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                    placeholder={'Paste anything here...\n\nQ: What is gravity?\nA: A force that pulls objects...\n\nOR paragraphs\nOR "term: definition"\nOR JSON / CSV'}
                    className="mt-1 min-h-[220px] font-mono text-xs sm:text-sm"
                  />
                </div>
                <Button onClick={submitPaste} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <ClipboardPaste className="w-4 h-4 mr-2" />
                  Tokri mein dalo
                </Button>
              </div>
            )}

            {/* Q&A source */}
            {activeSource === 'qa' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Q&A pairs (ek saath kai saare)</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQaRows([...qaRows, { q: '', a: '' }])}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Aur rows
                  </Button>
                </div>
                <ScrollArea className="max-h-[340px] rounded-lg border border-border p-1">
                  <div className="space-y-2 p-2">
                    {qaRows.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr_auto] gap-2 items-start">
                        <Input
                          value={row.q}
                          onChange={(e) => {
                            const next = [...qaRows]
                            next[idx] = { ...next[idx], q: e.target.value }
                            setQaRows(next)
                          }}
                          placeholder={`Q${idx + 1}: sawaal`}
                          className="text-xs sm:text-sm"
                        />
                        <Textarea
                          value={row.a}
                          onChange={(e) => {
                            const next = [...qaRows]
                            next[idx] = { ...next[idx], a: e.target.value }
                            setQaRows(next)
                          }}
                          placeholder="Jawab..."
                          className="text-xs sm:text-sm min-h-[44px]"
                          rows={2}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setQaRows(qaRows.filter((_, i) => i !== idx))}
                          className="text-muted-foreground hover:text-destructive"
                          disabled={qaRows.length <= 1}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Button onClick={submitQa} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <ListPlus className="w-4 h-4 mr-2" />
                  {qaRows.filter((r) => r.q.trim() && r.a.trim()).length} pairs tokri mein dalo
                </Button>
              </div>
            )}

            {/* FILE source */}
            {activeSource === 'file' && (
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.json,.csv,.md"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) onFileSelected(f)
                    e.target.value = ''
                  }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-emerald-300 dark:border-emerald-800 rounded-xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50/40 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                  <p className="text-sm font-medium">File upload karein</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    .txt, .json, .csv, .md — content auto-detect hoga
                  </p>
                  {fileName && (
                    <Badge className="mt-2 bg-emerald-100 text-emerald-800">
                      <FileText className="w-3 h-3 mr-1" />
                      {fileName}
                    </Badge>
                  )}
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  File ka content seedha tokri mein chala jayega (status: pending).
                </p>
              </div>
            )}

            {/* MANUAL source */}
            {activeSource === 'manual' && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="m-q" className="text-xs">
                    Trigger / Sawaal (| se alag alag likh sakte hain)
                  </Label>
                  <Input
                    id="m-q"
                    value={manualQ}
                    onChange={(e) => setManualQ(e.target.value)}
                    placeholder="what is gravity | gravity kya hai | why do things fall"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="m-a" className="text-xs">
                    Jawab (TRIZA yeh seekhega)
                  </Label>
                  <Textarea
                    id="m-a"
                    value={manualA}
                    onChange={(e) => setManualA(e.target.value)}
                    placeholder="Gravity ek force hai jo..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                <div>
                  <Label htmlFor="m-t" className="text-xs">
                    Topic
                  </Label>
                  <Input
                    id="m-t"
                    value={manualTopic}
                    onChange={(e) => setManualTopic(e.target.value)}
                    placeholder="science, history, general..."
                    className="mt-1"
                  />
                </div>
                <Button onClick={submitManual} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tokri mein dalo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Format help */}
        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer hover:text-foreground">
            Kaise format likhein? (examples)
          </summary>
          <pre className="mt-2 p-3 rounded-lg bg-muted/50 whitespace-pre-wrap text-[11px] leading-relaxed">
            {FORMAT_EXAMPLES}
          </pre>
        </details>
      </div>

      {/* RIGHT: basket list + actions (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Package className="w-5 h-5 text-amber-600" />
                Tokri
                {pending.length > 0 && (
                  <Badge className="bg-amber-500 text-white">{pending.length}</Badge>
                )}
              </CardTitle>
              {pending.length > 0 && (
                <Button size="sm" variant="ghost" onClick={clearPending} className="text-xs text-muted-foreground">
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <CardDescription className="text-xs">
              {pending.length > 0
                ? `${totalPendingItems} items banne ke liye taiyaar hain. Process dabayein.`
                : 'Khaali — left se content dalein.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={processBasket}
              disabled={pending.length === 0 || processing}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Process ho raha hai...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Process Basket ({pending.length})
                </>
              )}
            </Button>

            <ScrollArea className="max-h-[460px] -mx-2 px-2">
              {loadingList ? (
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </div>
              ) : basket.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  Tokri abhi khaali hai
                </div>
              ) : (
                <div className="space-y-2">
                  {basket.map((item) => {
                    const meta = SOURCE_META[item.source]
                    const Icon = meta.icon
                    return (
                      <div
                        key={item.id}
                        className={`rounded-lg border p-3 text-xs space-y-2 ${
                          item.status === 'pending'
                            ? 'border-amber-300/60 bg-amber-50/50 dark:bg-amber-950/20'
                            : item.status === 'processed'
                              ? 'border-emerald-300/60 bg-emerald-50/50 dark:bg-emerald-950/20'
                              : 'border-red-300/60 bg-red-50/50 dark:bg-red-950/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <Icon className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                            <span className="font-medium truncate">
                              {item.sourceLabel || meta.label}
                            </span>
                          </div>
                          {item.status === 'pending' && (
                            <button
                              onClick={() => deleteBasketItem(item.id)}
                              className="text-muted-foreground hover:text-destructive shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-muted-foreground line-clamp-2 font-mono text-[11px]">
                          {item.rawContent.slice(0, 140)}
                          {item.rawContent.length > 140 ? '...' : ''}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.status === 'pending' ? (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                              ~{item.itemCount} items
                            </Badge>
                          ) : item.status === 'processed' ? (
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {item.producedItems} seekhe
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Error
                            </Badge>
                          )}
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(item.createdAt).toLocaleString('en-PK', {
                              hour: '2-digit',
                              minute: '2-digit',
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                        {item.errorMsg && (
                          <p className="text-[10px] text-red-600 dark:text-red-400 line-clamp-2">
                            {item.errorMsg}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
