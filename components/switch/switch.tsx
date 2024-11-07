import { ReactElement, ReactNode } from 'react'

interface CaseProps<T> {
  value?: T
  default?: boolean
  children: ReactNode
}

interface SwitchProps<T> {
  test: T
  children: ReactElement<CaseProps<T>>[]
}

export const Switch = <T,>({ test, children }: SwitchProps<T>) => {
  const defaultResult = children.find((child) => child.props.default) || null
  const result = children.find((child) => child.props.value === test)

  return result || defaultResult
}

export const Case = <T,>({ children }: CaseProps<T>) => <>{children}</>
