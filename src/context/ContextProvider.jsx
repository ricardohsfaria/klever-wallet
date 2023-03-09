import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import TokensProvider from './TokensProvider'

export default function ContextProvider ({ children }) {
  const [token, setToken] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  const GLOBAL_CONTEXT = useMemo(() => ({
    token,
    setToken,
    selectedIndex,
    setSelectedIndex
  }),
  [token,
    setToken,
    selectedIndex,
    setSelectedIndex
  ])

  return (
        <TokensProvider.Provider value={ GLOBAL_CONTEXT }>
          {children}
        </TokensProvider.Provider>
  )
}

ContextProvider.propTypes = {
  children: PropTypes.node
}.isRequired
