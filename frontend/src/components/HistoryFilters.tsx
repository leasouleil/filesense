import { ChevronDown } from 'lucide-react'

import type { HistoryFilter } from '../types/history'

interface HistoryFiltersProps {
  activeFilter: HistoryFilter
  categories: string[]
  onFilterChange: (filter: HistoryFilter) => void
}

function isFilterActive(
  activeFilter: HistoryFilter,
  type: HistoryFilter['type'],
) {
  return activeFilter.type === type
}

function HistoryFilters({
  activeFilter,
  categories,
  onFilterChange,
}: HistoryFiltersProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onFilterChange({ type: 'all' })}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          isFilterActive(activeFilter, 'all')
            ? 'border-fs-accent bg-fs-accent/10 text-fs-accent'
            : 'border-fs-border bg-fs-surface text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
        }`}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onFilterChange({ type: 'today' })}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          isFilterActive(activeFilter, 'today')
            ? 'border-fs-accent bg-fs-accent/10 text-fs-accent'
            : 'border-fs-border bg-fs-surface text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
        }`}
      >
        Organized Today
      </button>

      <button
        type="button"
        onClick={() => onFilterChange({ type: 'week' })}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          isFilterActive(activeFilter, 'week')
            ? 'border-fs-accent bg-fs-accent/10 text-fs-accent'
            : 'border-fs-border bg-fs-surface text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
        }`}
      >
        Past Week
      </button>

      <button
        type="button"
        onClick={() => onFilterChange({ type: 'month' })}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          isFilterActive(activeFilter, 'month')
            ? 'border-fs-accent bg-fs-accent/10 text-fs-accent'
            : 'border-fs-border bg-fs-surface text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
        }`}
      >
        Past Month
      </button>

      <div className="relative">
        <select
          value={
            activeFilter.type === 'category'
              ? activeFilter.value
              : ''
          }
          onChange={(event) => {
            const value = event.target.value

            if (!value) {
              onFilterChange({ type: 'all' })
              return
            }

            onFilterChange({
              type: 'category',
              value,
            })
          }}
          className={`appearance-none rounded-full border bg-fs-surface py-1.5 pl-3 pr-8 text-xs font-medium outline-none transition ${
            activeFilter.type === 'category'
              ? 'border-fs-accent bg-fs-accent/10 text-fs-accent'
              : 'border-fs-border text-fs-text-secondary hover:bg-fs-background hover:text-fs-text-primary'
          }`}
        >
          <option value="">Category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          strokeWidth={1.8}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-fs-text-muted"
        />
      </div>
    </div>
  )
}

export default HistoryFilters