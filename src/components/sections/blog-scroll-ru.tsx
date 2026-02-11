'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { blogPostsRu } from '@/data/blog-ru'

const formatDate = (s: string): string => {
  const parts = s.split('-')
  if (parts.length !== 3) return s
  const [y, m, d] = parts
  return `${d}.${m}.${y}`
}

export function BlogScrollSectionRu() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)
  const hasMovedRef = useRef(false)

  if (!blogPostsRu?.length) return null

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    hasMovedRef.current = false
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollStart(scrollRef.current.scrollLeft)
  }

  const onMouseLeave = () => setIsDragging(false)
  const onMouseUp = () => setIsDragging(false)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX
    if (Math.abs(walk) > 5) hasMovedRef.current = true
    scrollRef.current.scrollLeft = scrollStart - walk
  }

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasMovedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Блог</h2>
          <Link href="/ru/blog" className="text-red-600 hover:text-red-700 font-medium mt-2 inline-block">
            Смотреть все
          </Link>
        </div>
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onClickCapture={onClickCapture}
          className="overflow-x-auto -mx-4 px-4 cursor-grab active:cursor-grabbing select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-6 min-w-full">
            {blogPostsRu.map((p) => (
              <Link
                key={p.slug}
                href={`/ru/blog/${p.slug}`}
                className="group w-80 flex-shrink-0 bg-white rounded-xl border border-neutral-200/70 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="h-44 overflow-hidden bg-neutral-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={320}
                    height={176}
                    loading="lazy"
                    sizes="(max-width: 640px) 85vw, 320px"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-neutral-500 mb-2">{formatDate(p.date)}</div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-neutral-600 line-clamp-3">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
