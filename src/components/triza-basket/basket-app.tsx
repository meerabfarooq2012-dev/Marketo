'use client'

import { useState, useEffect, useCallback } from 'react'
import { Sparkles, ShoppingCart, BookOpen, MessageCircle, Brain, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { BasketTab } from './basket-tab'
import { KnowledgeTab } from './knowledge-tab'
import { ChatTab } from './chat-tab'
import { HarvestTab } from './harvest-tab'

type TabKey = 'harvest' | 'basket' | 'knowledge' | 'chat'

interface Stats {
  basket: { pending: number; processed: number; error: number; total: number }
  knowledge: { totalItems: number; totalUses: number; topics: Array<{ topic: string; count: number }> }
  index: { totalItems: number; vocabSize: number; version: number }
}

export function BasketApp() {
  const [tab, setTab] = useState<TabKey>('harvest')
  const [stats, setStats] = useState<Stats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch('/api/triza/stats')
      if (!res.ok) throw new Error('stats failed')
      const data = await res.json()
      setStats(data)
    } catch {
      // non-fatal — UI still works without stats
    } finally {
      setLoadingStats(false)
    }
  }, [])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  // Refresh stats whenever the user switches tabs (covers basket→knowledge flow)
  useEffect(() => {
    loadStats()
  }, [tab, loadStats])

  async function seedDemo() {
    try {
      const res = await fetch('/api/triza/demo', { method: 'POST' })
      const data = await res.json()
      if (data.added > 0) {
        toast.success(`Demo knowledge load ho gaya — ${data.added} naye items seekh liye!`)
      } else {
        toast.info('Demo pehle se loaded hai — Chat tab par try karein.')
      }
      loadStats()
    } catch {
      toast.error('Demo load nahi hua')
    }
  }

  const tabs: Array<{
    key: TabKey
    label: string
    urdu: string
    icon: typeof ShoppingCart
    desc: string
  }> = [
    {
      key: 'harvest',
      label: 'Harvest',
      urdu: 'Internet se',
      icon: Globe,
      desc: 'Internet se kisi bhi topic par knowledge collect karo — TRIZA ka agent khud search aur read karega',
    },
    {
      key: 'basket',
      label: 'Basket',
      urdu: 'Tokri',
      icon: ShoppingCart,
      desc: 'Alag-alag jagah se knowledge collect karo — ek tokri mein',
    },
    {
      key: 'knowledge',
      label: 'Knowledge',
      urdu: 'Seekha hua',
      icon: BookOpen,
      desc: 'TRIZA ne jo seekha hai — dekho, edit karo, feedback do',
    },
    {
      key: 'chat',
      label: 'Chat',
      urdu: 'Baat-cheet',
      icon: MessageCircle,
      desc: 'TRIZA se apne andaaz mein baat karo — bina kisi model ke',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50/40 via-background to-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 ring-2 ring-background" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground">
                  TRIZA <span className="text-emerald-600">Knowledge Basket</span>
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Self-built AI · No model · No API · Apna tareeqa
                </p>
              </div>
            </div>

            {/* Stats pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 hover:bg-amber-100"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Tokri: {loadingStats ? '…' : stats?.basket.pending ?? 0}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 hover:bg-emerald-100"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Seekha: {loadingStats ? '…' : stats?.knowledge.totalItems ?? 0}
              </Badge>
              <Badge variant="outline" className="hidden sm:inline-flex">
                <Zap className="w-3 h-3 mr-1" />
                Vocab: {loadingStats ? '…' : stats?.index.vocabSize ?? 0}
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={seedDemo}
                className="text-xs"
                title="Kuch demo knowledge load karein taake turant chat try kar sakein"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Demo load
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-border/60 bg-background/60 backdrop-blur-sm sticky top-[68px] sm:top-[76px] z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {tabs.map((t) => {
              const Icon = t.icon
              const active = tab === t.key
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    active
                      ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70 hidden sm:inline">
                    {t.urdu}
                  </span>
                  {t.key === 'basket' && stats?.basket.pending ? (
                    <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                      {stats.basket.pending}
                    </span>
                  ) : null}
                  {t.key === 'knowledge' && stats?.knowledge.totalItems ? (
                    <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                      {stats.knowledge.totalItems}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Active tab description */}
      <div className="container mx-auto px-4 pt-4">
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          {tabs.find((t) => t.key === tab)?.desc}
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-4 sm:py-6">
        {tab === 'harvest' && <HarvestTab onChanged={loadStats} onGoToChat={() => setTab('chat')} />}
        {tab === 'basket' && <BasketTab onChanged={loadStats} />}
        {tab === 'knowledge' && <KnowledgeTab onChanged={loadStats} />}
        {tab === 'chat' && <ChatTab stats={stats} />}
      </main>

      {/* Sticky footer */}
      <footer className="mt-auto border-t border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">TRIZA</span>{' '}
              — 100% self-built. Internet se seekhta hai, apne dimaagh se jawab deta hai.
            </p>
            <p>Harvest: web-search + page-reader · Chat: TF-IDF + cosine + synonyms (no model)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
