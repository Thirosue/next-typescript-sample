import React from 'react'

export interface DialogOptions {
  html?: boolean
  alert?: boolean
  icon?: 'info' | 'warn' | 'alert'
  title: string
  description: React.ReactNode
  confirmationText?: string
  cancellationText?: string
}
