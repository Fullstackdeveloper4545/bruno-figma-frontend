import { createContext, useContext, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

const TabsContext = createContext(null)

function Tabs({ className, value, defaultValue, onValueChange, children, ...props }) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const setValue = (next) => {
    if (value === undefined) setInternalValue(next)
    if (onValueChange) onValueChange(next)
  }

  const contextValue = useMemo(() => ({ value: currentValue, setValue }), [currentValue])

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, ...props }) {
  return <div className={cn('inline-flex h-10 items-center rounded-md bg-muted p-1', className)} {...props} />
}

function TabsTrigger({ className, value, ...props }) {
  const context = useContext(TabsContext)
  const active = context?.value === value

  return (
    <button
      type="button"
      onClick={() => context?.setValue(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, value, ...props }) {
  const context = useContext(TabsContext)
  if (context?.value !== value) return null
  return <div className={cn('mt-2', className)} {...props} />
}

export { Tabs, TabsContent, TabsList, TabsTrigger }

