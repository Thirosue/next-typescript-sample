import { Many } from 'lodash'
import React from 'react'

export interface DialogOptions {
  html?: boolean
  alert?: boolean
  icon?: Many<'info' | 'warn' | 'alert'>
  title: string
  description: React.ReactNode
  confirmationText?: string
  cancellationText?: string
}
